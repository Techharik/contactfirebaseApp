import React from 'react'
import './index.css'

//!firebase 


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
import { firebaseConfig } from './config/config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const storage = getStorage(app);
const database = getDatabase(app);



//! importing layouts 

import Header from './layouts/Header'
import Footer from './layouts/Footer'

//! import Routers

import { BrowserRouter as Routers, Routes,Route } from 'react-router-dom'

//! import components

import Home from './components/Home'
import AddContact from './components/Add Contact'


function App() {
 





  return (
    <>
    <Header />

<Routers>
  <Routes>
     <Route path='/' element={ <Home /> } />
     <Route path='/contacts/add' element={ <AddContact /> } />

  </Routes>
</Routers>
<Footer />

</>

  
  )
}

export default App
