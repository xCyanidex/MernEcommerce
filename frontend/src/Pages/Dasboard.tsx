
import { useEffect, useState } from "react";
import axios from "axios"
import { Progress } from "@/components/ui/progress";
import {useAuthStore} from "../store/store.js"

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const Dasboard = () => {
  
const [isLoading,setLoading]=useState(true);
const [progress,setProgress]=useState(55);

const [role,setUser]=useState("");
const user=useAuthStore((state)=>state.user)
  useEffect(() => {
const fetchData = async () => {

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/",
        { token: user }
      );
      // Handle the response data here or set it in state
       setUser(response.data.role);
    } catch (error) {
      // Handle errors, maybe set an error state
      console.error("Error fetching data:", error);
    } finally{
      setProgress(95);
       setLoading(false);
        
      
    }
};


  fetchData(); // Call the async function
}, []);

  return (
    <>
      {isLoading ? (
           <Progress value={progress} className="w-[10%]" />
      ) : (
        <>
          <div>Welcome to the {role} Dasboard </div>;<button>Logout</button>
        </>
      )}
    </>
  );
}

export default Dasboard