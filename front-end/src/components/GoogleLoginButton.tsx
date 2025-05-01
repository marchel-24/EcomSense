"use client";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from "react-icons/fc";

const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

const GoogleLoginButton = ({ isSignUp }: { isSignUp: boolean }) => {
    const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('profileObj' in res) {
          const profile = res.profileObj;
      
          // Kirim ke backend
          await fetch("http://localhost:5000/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          });
      
          console.log("Login Success", profile);
        }
      };
      
      
//   const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
//     // if ("profileObj" in res) {
//     //   console.log("Login Success", res.profileObj);
//     // }
    
//   };


  const onFailure = (res: any) => {
    console.log("Login Failed", res);
  };

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText={isSignUp ? "Sign up with Google" : "Sign in with Google"}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="mt-4 flex items-center justify-center w-full bg-[#F25500] text-white font-bold rounded-full py-2 transition duration-200 transform hover:bg-[#d64b00] hover:shadow-lg hover:scale-105"
        >
          <div className="bg-white flex items-center justify-center rounded-full w-7 h-7 mr-2">
            <FcGoogle className="w-5 h-5" />
          </div>
          {isSignUp ? "Sign up with Google" : "Sign in with Google"}
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;
