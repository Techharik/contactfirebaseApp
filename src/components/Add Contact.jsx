import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { readAndCompressImage } from "browser-image-resizer";

import {imageConfig} from '../config/config'

import { v4} from 'uuid';

import { getDatabase,ref as dbref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';



function AddContact() {


 const [name,setName] =useState('')
 const [email,setEmail] =useState('')
 const [imgUrl,setImageUrl] =useState('')

 const navigate = useNavigate()

const imagePicker = async (e) =>{
     try{
 const file = e.target.files[0];

const storage = getStorage();


const metadata = {
  contentType: 'image/'+file.type
};
let resizedImage = await readAndCompressImage(file, imageConfig);


// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, resizedImage, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error)
    
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       setImageUrl(downloadURL)
    });
  }
);

     }catch{

     }
}
  


 const addInfo = async()=>{
    try{
            const db = getDatabase();
           await set(dbref(db, 'contacts/' + v4()), {
              username: name,
              email: email,
              profile_picture : imgUrl
            });

          return  navigate('/')
          
    }catch{
        console.log('Not able to add to database')
    }
 }





 const handleSubmit =()=>{
     addInfo()
 }

  return (
    <div className='flex justify-center  align-middle '>
        <div className='flex flex-col py-5'>
         <input type="file" name="file" id="file" className='pb-2' 
          multiple={false}
          onChange={e => imagePicker(e)}
         />
         {
         imgUrl ? <img src={imgUrl} alt="profile" height={100} width={100}/> :''
         }

          Name : <input type="text" name="text" id="text" 
          className='border border-3 border-slate-700 my-3 rounded-sm'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
          email : <input type="email" name="email" id="email" className='border border-3 border-slate-700 my-3 rounded-sm'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          /> 
          <input type='submit' value='submit' className='boder border-2 border-orange-500 w-[30%] m-auto cursor-pointer' onClick={handleSubmit} /> 
      </div>

    </div>
  )
}

export default AddContact