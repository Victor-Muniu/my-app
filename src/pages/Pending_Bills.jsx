import React, { useState, useEffect } from "react";
import BillManager from "../components/maincomponents/BillManager";
import axios from "axios";
function Pending_Bills() {
  const [uncleared, setUncleared] = useState([]);
  const [uncleared2, setUncleared2] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchBills();
    fetchBarBills();
    fetchCurrentUser();

  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:3002/bills", {
        withCredentials: true,
      });
      setUncleared(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const fetchBarBills = async () =>{
    try{
      const response = await axios.get("http://localhost:3002/bar-bills", {
        withCredentials: true,
      });
      setUncleared2(response.data);
    }catch (error){
      console.error("Error fetching bills:", error);
    }
  };
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3002/current-user", {
        withCredentials: true,
      });
      
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };


  return <BillManager uncleared={uncleared} uncleared2={uncleared2} currentUser={currentUser} />;
}

export default Pending_Bills;
