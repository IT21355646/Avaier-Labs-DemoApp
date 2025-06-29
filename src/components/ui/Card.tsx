import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
