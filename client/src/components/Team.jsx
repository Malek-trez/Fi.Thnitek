import React from 'react';
import './Team.css';
import photo from "./images/gh.jpg"
import { Col, Container, Row } from "react-bootstrap";
import {
    faFacebookF,
    faLinkedinIn,
    faTwitter,
    faBehance,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";

const Team = () => {
    const teamMembers = [
        {
            picture: "https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/320752647_1218314282093315_8717626016763896633_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uPfwSTlJ7VUQ7kNvgECu0kt&_nc_ht=scontent.ftun14-1.fna&oh=00_AYALiiMN8p1suf_R0gPYgDlTp8hfdO_K15scv0X5PaYqeA&oe=66659906",
            fullName: "Nour ElHouda Bhf",
            designation: "Graphic Designer",
            
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/nour.belhajfrej.3" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
                
            ],
        },
        {
            picture: "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/432314793_956389242766298_690207966973708177_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TSIg-qPueSsQ7kNvgExSVuJ&_nc_ht=scontent.ftun16-1.fna&oh=00_AYAVQ33rmR1LdDpxLq7TKG6Lp4y9yAb_Uf2nZKKAjAFubA&oe=665F7412",
            fullName: "Emna Hasneoui",
            designation: "Backend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/emna.hasnewi" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
                
            ],
        },
        {
            picture: "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/414455178_2384980498360773_8015249494666557517_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Ca80HqU9fD8Q7kNvgGSerKR&_nc_ht=scontent.ftun16-1.fna&oh=00_AYCxNhLG-ii8jIrBV8A2R8hIkGbMt8VbcGHvgK5dDvwSiA&oe=665F9279",
            fullName: "Ali Kallel",
            designation: "UI Design",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/alola.alola.37" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
            ],
        },
        {
            picture: "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/231490324_2998018600427497_8123194825927634247_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kRt04csHAmUQ7kNvgHCzdMd&_nc_ht=scontent.ftun16-1.fna&oh=00_AYD_gLx7GhANuAG6hT5rMgmak8XAnTpm4waQxsYjo9YXXg&oe=665F9EA8",
            fullName: "Chaima Guesmi",
            designation: "Frontend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/chaima.guessmi/" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
              
            ],
        },
        {
            picture: photo,
            fullName: "Ghofrane Aloui",
            designation: "Frontend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/profile.php?id=100070556800335" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
                
            ],
        },
        {
            picture: "https://media.licdn.com/dms/image/C5603AQGteJFYpqmJPg/profile-displayphoto-shrink_800_800/0/1654439217229?e=1722470400&v=beta&t=rSShhb0RB3i3tq-V9p0oUZHB1UAvjJElbBxa8P-v0sE",
            fullName: "Melek Gharbi",
            designation: "Backend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/profile.php?id=100007739109050" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
            ],
        },
        {
            picture: "https://media.licdn.com/dms/image/D4E03AQEH9CCkZiM40w/profile-displayphoto-shrink_800_800/0/1700678468400?e=1722470400&v=beta&t=8x41hI_LlMUZzvONOJyqch54AvEjowQYNrb0t9DLM3E",
            fullName: "Mohamed Karrab",
            designation: "Full Stack Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/mohamed.karrab.12" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
            ],
        },
        {
            picture: "https://cdn.easyfrontend.com/pictures/users/user7.jpg",
            fullName: "Mehdi Ben rejeb",
            designation: "Backend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/LUNIX7" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
            ],
        },
        {
            picture: "https://media.licdn.com/dms/image/D4E03AQEfOjld327Bbg/profile-displayphoto-shrink_800_800/0/1696891896911?e=1722470400&v=beta&t=cKOphzvhGqkwBj-kOC2L1eRyiUKlWIW6jlqi7o9hZko",
            fullName: "Nada Jarboui",
            designation: "Frontend Developer",
            socialLinks: [
                { icon: faFacebookF, href: "https://www.facebook.com/nada.jarboui.7" },
                { icon: faLinkedinIn, href: "#" },
                { icon: faTwitter, href: "#" }
            ],
        },
    ];

    const TeamMemberItem = ({ member }) => (
        <div className="ezy__team2-item mt-4">
            <img
                src={member.picture}
                alt={member.fullName}
                className="img-fluid rounded-circle"
                width={230}
            />
            <div className="ezy__team2-content px-3 py-4 px-xl-4">
                <h4 className="mb-2">{member.fullName}</h4>
                <h6>{member.designation}</h6>
                <p className="opacity-50 mb-0">{member.bio}</p>
                <div className="ezy__team2-social-links mt-4">
                    {member.socialLinks.map((link, i) => (
                        <a href={link.href} className={classNames({ "ms-3": i })} key={i}>
                            <FontAwesomeIcon icon={link.icon} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

    TeamMemberItem.propTypes = {
        member: PropTypes.object.isRequired,
    };

    return (
        <section className="ezy__team2 light">
            <Container>
                <Row className="justify-content-center mb-4 mb-md-5">
                    <Col lg={6} xl={5} className="text-center">
                        <h2 className="ezy__team2-heading mb-3">Our Experts Team</h2>
                        <p className="ezy__team2-sub-heading mb-0">
                        We’re a dynamic group of individuals who are passionate about 
                        what we do and dedicated to delivering the best results for our clients.
                        </p>
                    </Col>
                </Row>
                <Row className="text-center">
                    {teamMembers.map((member, i) => (
                        <Col md={6} lg={4} key={i}>
                            <TeamMemberItem member={member} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Team;
