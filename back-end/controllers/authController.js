const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const db = require('../db');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    let userId;
    if (existingUser.rows.length === 0) {
      // Insert user baru
      const result = await db.query(
        'INSERT INTO users (name, email, profile_picture) VALUES ($1, $2, $3) RETURNING id',
        [name, email, picture]
      );
      userId = result.rows[0].id;
    } else {
      userId = existingUser.rows[0].id;
    }

    const tokenJwt = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token: tokenJwt, user: { id: userId, name, email, photo:picture } });
  } catch (error) {
    console.error('Login error', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};
