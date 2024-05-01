import Cookies from 'js-cookie';
import React from 'react';
import './style.css';

function Footer() {
  const userData = JSON.parse(Cookies.get('user'));

  return (
    <div>
      <div className="bg-dark text-white d-flex justify-center footercss w-full">
        <h3 className="footerinner py-2 mb-0 mt-2">Thank you for helping make Virtual Worlds a better place!</h3>
        <hr />
        <h4 className="footerinner py-2">{userData.user.full_name}</h4>
      </div>
    </div>
  );
}

export default Footer;
