const pool = require("../../db");
const argon2 = require("argon2");
require('dotenv').config();
const { jwtSign, jwtVerify, getJwt } = require("../jwt/jwtAuth");
const { verify } = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

exports.handleLogin = async (req, res) => {
    const token = getJwt(req);

    if (!token) {
        res.json({ loggedIn: false });
        return;
    }

    try {
        const decoded = await jwtVerify(token, process.env.JWT_SECRET);
        const potentialUser = await pool.query(
            "SELECT username FROM users u WHERE u.username = $1",
            [decoded.username]
        );

        if (potentialUser.rowCount === 0) {
            // console.log("No user: " + decoded.username);
            res.json({ loggedIn: false, token: null });
        } else {
            res.json({ loggedIn: true, token });
        }
    } catch (error) {
        console.error(error);
        res.json({ loggedIn: false });
    }
};

exports.attemptLogin = async (req, res) => {
    try {
        let potentialLogin = await pool.query(
            "SELECT id, username, password, email, validation FROM users u WHERE u.username=$1 OR u.email=$1",
            [req.body.usernameOrEmail]
        );

        if (potentialLogin.rowCount > 0) {
            let isSamePass = false;

            isSamePass = await argon2.verify(
                potentialLogin.rows[0].password,
                req.body.password
            );
            if (isSamePass) {
                if (potentialLogin.rows[0].validation) {
                    const token = await jwtSign(
                        {
                            username: potentialLogin.rows[0].username,
                            id: potentialLogin.rows[0].id
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: "1d"}
                    );

                    return res.json({loggedIn: true, token});
                }
                else {
                    return res.json({ loggedIn: false, message: "Please check your mail and verify your account!" });
                }
            } else {
                return res.json({ loggedIn: false, message: "Wrong username or password!" });
            }
        } else {
            console.log("Wrong username or password! (console)");
            return res.json({ loggedIn: false, message: "Wrong username or password!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ loggedIn: false, error: "Server error" });
    }
};

exports.attemptRegister = async (req, res) => {
    try {
        const existingUser = await pool.query(
            'SELECT username FROM users WHERE username = $1 ',
            [req.body.username]
        );
        const existingEmail = await pool.query(
            'SELECT email FROM users WHERE email = $1 ',
            [req.body.email]
        );

        if (existingUser.rowCount === 0 && existingEmail.rowCount === 0) {
            const hashedPass = await argon2.hash(req.body.password, {
                memoryCost: 20480, // > 19 MiB (according to OWASP cheat sheet), (this in KB)
                timeCost: 2,
                parallelism: 1,
            });

            const uid = uuidv4();
            const newUserQuery = await pool.query(
                'INSERT INTO users (id, username, password, email, role) VALUES ($1, $2, $3, $4, $5) ',
                [uid, req.body.username, hashedPass, req.body.email, ['user']]
            );
            const notifId = Math.floor(Math.random() * 100000) + 1;
            const notificationQuery = await pool.query('INSERT INTO notifications (name, id, user_id, description) VALUES ($1, $2, $3, $4);',
                ["Welcome to Alashwas", notifId, uid, "Learning cyber security on Alashwas is fun and addictive. Earn points by answering questions."]
            );

            console.log('User registered successfully');
            require('./emailVerification')(req.body.email);
            return res.json({ gohome: true });

        } else if (existingUser.rowCount !== 0) {
            console.log('Username taken');
            return res.json({ loggedIn: false, message: 'Username taken' });
        } else {
            console.log('Email taken');
            return res.json({ loggedIn: false, message: 'Email taken' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ loggedIn: false, error: 'Internal Server Error'});
    }
};
