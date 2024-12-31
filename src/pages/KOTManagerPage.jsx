import React, { useEffect, useState } from 'react'
import axios from 'axios'
import KOTCard from '../components/maincomponents/KOTCard';
function KOTManagerPage() {
    const [mockKots, setMockKots]= useState([])
    useEffect(()=>{
        fetchKot();
    },[])
    const fetchKot = async () =>{
        try {
            const response = await axios.get("http://localhost:3002/kots",{withCredentials: true});
            setMockKots(response.data);
          } catch (error) {
            console.error("Error fetching inventory:", error);
          }
    }
  return (
    <KOTCard kots={mockKots}/>
  )
}

export default KOTManagerPage