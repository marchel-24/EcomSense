import {GoogleLogin} from 'react-google-login';

const clientID = process.env.CLIENT_ID

function login(){
  const onSuccess = (res) => {
    console.log("Login Success", res.profileObj);
  }

  const onFailure = (res) => {
    console.log("Login Failed", res);
  }
  return(
    <div id="signInButton">
      <GoogleLogin
        clientId={clientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
  )
}