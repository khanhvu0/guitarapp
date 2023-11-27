import React from "react";

const Title = ({ text }) => {
  return (
    <div className="p-3 mt-8 ml-3 lg:ml-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold text-left">{text}</h1>
        <img className="w-8 h-8 ml-2" src="https://static-00.iconduck.com/assets.00/guitar-emoji-2048x2040-y3id6cnf.png" alt="Guitar emoji"/>
      </div>
        <p className="text-lg font-semibold text-left"> - by Khanh Vu</p>
        <div className="border-b-4 rounded border-black w-1/2 mt-5" />
    </div>
  );
};

export default Title;