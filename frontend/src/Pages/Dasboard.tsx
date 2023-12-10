
import { useEffect } from "react";
import axios from "axios"


const Dasboard = () => {
  console.log("hello useeffect")
  useEffect(() => {
    
    const fetchData = async () => {
      try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/rolechecker"
      );
      // Handle the response data here or set it in state
      console.log(response);
    } catch (error) {
      // Handle errors, maybe set an error state
      console.error("Error fetching data:", error);
    }
  };

  fetchData(); // Call the async function
}, []);

  return (
      <>
  <div>Welcome to the user Dasboard </div>;
  <button>Logout</button>
  </>
      )
}

export default Dasboard