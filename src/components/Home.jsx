import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";

function Home() {
  const [contactInfo ,setContectInfo] =useState([])
//   const [zeroCount ,setZeroCount] =useState(true)

const fetchContxt = async()=>{
try{
    const db = getDatabase();
    const starCountRef = ref(db, 'contacts');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      data != null ? 
      setContectInfo(data):''
     
    });

}catch(e){
    console.log('Not able to fetch contact')
}

}

 useEffect(()=>{
 fetchContxt()
 },[])

  return (

    


    <>
     <div>
       {
        contactInfo.length === 0  ? (
            <h1>No contact was found</h1>
        ) : (
            <div className='flex flex-col'>
            {
                Object.entries(contactInfo).map((info)=>{
                  return  <div className="broder flex justify-evenly box-border pt-2" key={info[0]}>
                    <img src={info[1].profile_picture} alt ={info[0]} height={100} width={100}/>
                     <div className='my-10 ml-2'>
                     <h1 className='text-blue-700'>{info[1].email}</h1>
                       <h5 className='text-orange-600'>{info[1].username}</h5>
                        </div>   
                    
                    </div>
                })
            }
            </div>

        )
       }
     </div>

     <div className='absolute bottom-24 right-12'>
       <button className=' bg-slate-400 rounded-lg p-3'>
        <Link to='contacts/add'>+</Link>
       </button>
     </div>
    </>
  )
}

export default Home