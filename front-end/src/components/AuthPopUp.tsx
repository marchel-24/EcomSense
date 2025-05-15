"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import GoogleLoginButton from "./GoogleLoginButton";

interface AuthPopUpProps {
  onClose: () => void;
}

const AuthPopUp: React.FC<AuthPopUpProps> = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center relative transition-all duration-300">
      {/* Close Button */}
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-200 transform hover:scale-110 hover:shadow-md"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-[#413E3E]">
        {isSignUp ? "Create an Account" : "Welcome Back!"}
      </h2>

      {/* Google Button */}
      {/* <button className="mt-4 flex items-center justify-center w-full bg-[#F25500] text-white font-bold rounded-full py-2 transition duration-200 transform hover:bg-[#d64b00] hover:shadow-lg hover:scale-105">
        <div className="bg-white flex items-center justify-center rounded-full w-7 h-7 mr-2">
          <FcGoogle className="w-5 h-5" />
        </div>
        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
      </button> */}
      <GoogleLoginButton isSignUp={isSignUp}/>

      {/* Toggle between Sign In / Sign Up */}
      <p className="mt-4 text-gray-500">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          className="text-[#F25500] font-bold hover:underline hover:text-[#d64b00] transition-colors duration-200"
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthPopUp;
