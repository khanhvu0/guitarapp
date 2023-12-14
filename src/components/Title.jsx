import React from "react";

const Title = ({ text }) => {
  return (
    <div className="p-3 mt-8 ml-3 lg:ml-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold text-left">{text}</h1>
        <img className="w-8 h-8 ml-2" src="https://static-00.iconduck.com/assets.00/guitar-emoji-2048x2040-y3id6cnf.png" alt="Guitar emoji"/>
      </div>

        <p className="text-xl font-semibold text-left"> - by Khanh Vu</p>
        <div className="rounded w-2/5 mt-7 bg-gradient-to-r from-blue-800 to-black p-0.5" />
    </div>
  );
};

export default Title;