// pages/app/myPage.js or pages/app/myPage.tsx

import React from 'react';

const congrats = () => {
  return (
    <div className="h-screen w-screen bg-gray-400 p-20 flex justify-center mx-auto w-1/2 text-center">
      <div className="flex flex-col">
        <h1 className="text-8xl my-10 tracking-wider">Congratulations</h1>
        <p className="text-4xl my-10">You completed the quiz!</p>
        <a href="/" className=" px-10 py-5 text-3xl text-white my-10 border rounded rounded-lg text-border-solid w-1/2 mx-auto animated-bg-1">Try again?</a>
      </div>
    </div>
  );
};

export default congrats;
