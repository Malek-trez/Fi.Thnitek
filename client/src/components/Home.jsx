import axios from "axios";
import { useEffect, useState } from "react";

const GetDataBases = () => {

  const [users, setAllUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/testdata")
      .then((response) => setAllUser(response.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

    return (
      <>
        <h1>All DataBases :</h1>
        <ul>
          {users?.map((user, index) => (
            <li key={index}>{user.datname}</li>
          ))}

        </ul>
        
      </>
      );
  };
  
export default GetDataBases;