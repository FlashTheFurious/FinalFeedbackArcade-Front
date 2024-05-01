import React, { useState, useEffect } from 'react';

import Navbar from '../../Components/Navbar';
import GameList from '../../Components/Games/GameList';
import Footer from '../../Components/Footer';
//import BannerAds from '../../Components/handlebars/bannerAd';

import api from '../../service/api'; // Importing the axios instance for handlebars

 
let eslintHappyCounter = 0;

function makeEslintHappy(formalityVariable){
  eslintHappyCounter + formalityVariable;
}


function HomePage() {

  const [bannerHtml, setBannerHtml] = useState('');

  makeEslintHappy(bannerHtml);
  
  useEffect(() => {
    // Old attempt to Fetch the banner content from the backend
    /*
    fetch('http://3.141.177.7api/banner') // This route is just added. If something breaks look here
      .then((res) => res.text())
      .then((html) => {
        setBannerHtml(html);
      })
      .catch((err) => {
        console.error('Failed to fetch banner:', err);
      });
      */
     
     // Fetch the banner content from the backend using axios
    api.get('/banner')
    .then((res) => {
      setBannerHtml(res.data); // Assuming the server sends back raw HTML
    })
    .catch((err) => {
      console.error('Failed to fetch banner:', err);
    });
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='adImage' dangerouslySetInnerHTML={{ __html: bannerHtml }} />
      <GameList />
      <div className='adImage' dangerouslySetInnerHTML={{ __html: bannerHtml }} /> 
      <Footer />
    </>
  );
}

export default HomePage;
