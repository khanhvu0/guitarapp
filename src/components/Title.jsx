import React from "react";

const Title = ({ text }) => {
  return (
    <div className="p-3 mt-8">
      <h1 className="text-3xl font-semibold text-left indent-5">{text}</h1>
        <div className="border-b-4 rounded border-black w-1/2 mt-5 ml-5" />
    </div>
  );
};

export default Title;