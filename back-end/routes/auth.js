// import {GoogleLogin} from 'react-google-login';

// const clientID = process.env.CLIENT_ID

// function login(){
//   const onSuccess = (res) => {
//     console.log("Login Success", res.profileObj);
//   }

//   const onFailure = (res) => {
//     console.log("Login Failed", res);
//   }
//   return(
//     <div id="signInButton">
//       <GoogleLogin
//         clientId={clientID}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         isSignedIn={true}
//         />
//     </div>
//   )
// }

// auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db')


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;

  try {
    // Cek apakah user sudah ada
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      // Insert user baru
      await pool.query(
        'INSERT INTO users (email, name) VALUES ($1, $2)',
        [email, name]
      );
    }

    // Ambil kembali user
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // serialize pakai user ID
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  done(null, result.rows[0]);
});
