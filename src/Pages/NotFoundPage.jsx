import React from 'react';
import NotFoundImage from '../assets/images/NotFound.png';

function NotFoundPage() {
  return (
    <div className="d-flex justify-center w-full">
      <img src={NotFoundImage} alt="404 page" />
    </div>
  );
}

export default NotFoundPage;
