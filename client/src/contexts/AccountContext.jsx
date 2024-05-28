import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    role : localStorage.getItem("role"),
    loggedIn: null,
    token: localStorage.getItem("token"),
    
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}login`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .catch(err => {
        setUser({ loggedIn: false, username: null, role: null });
        return;
      })
      .then(r => {
        if ( r.status >= 400) {
          setUser({ loggedIn: false, username: null, role: null });
          return;
        }
        
        return r.json();
      })
      .then(data => {
        if (!data) {
          setUser({ loggedIn: false, username: null, role: null });
          return;
        }
        console.log(data);
        setUser({ ...data });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
