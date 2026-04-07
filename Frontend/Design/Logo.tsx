import React from "react";

const Logo = ({ className = "", textClass = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
        <svg
          className="w-5 h-5 text-indigo-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      </div>

      <span className={`text-xl font-bold text-white ${textClass}`}>
        Parseon
      </span>
    </div>
  );
};

export default Logo;