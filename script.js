const jwt = require('jsonwebtoken');
require('dotenv').config();

const encrypt = (payload, secret) => {
  // Generate a JWT with an expiry time of 1 hour
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token, secret) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    console.log('Token is valid:', decoded);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired.');
    } else {
      console.error('Invalid token:', error.message);
    }
    return null;
  }
};

module.exports = { encrypt, verifyToken };

// Example usage
const payload = { userId: 143, role: 'admin' };
const secret = process.env.SECRET_KEY;

const token = encrypt(payload, secret);
console.log('Generated Token:', token);

// Simulate token verification
setTimeout(() => {
  verifyToken(token, secret); // This will fail if the token has expired
}, 2000); // Adjust the delay to test expiry