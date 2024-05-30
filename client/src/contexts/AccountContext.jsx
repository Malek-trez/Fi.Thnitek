//import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  //const navigate = useNavigate();
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    loggedIn: null,
    token: localStorage.getItem("token"),
  });

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser({ loggedIn: false, username: null, role: null });
    //navigate("/login");
  };

  useEffect(() => {
    if (!user.token) {
      setUser({ loggedIn: false, username: null, role: null });
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}login`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .then((r) => {
        if (r.status >= 400) {
          throw new Error("Unauthorized");
        }
        return r.json();
      })
      .then((data) => {
        setUser({ ...data });
      })
      .catch((err) => {
        setUser({ loggedIn: false, username: null, role: null });
      });
  }, [user.token]);

  return (
    <AccountContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
