import jwt from 'jsonwebtoken';

 // Function to generate JWT token
 const generateToken = (user) => {
    // Define the payload (data to be included in the token)
    const payload = {
      userId: user.id,
      email: user.email, 
    };
  
    // Sign the JWT token with your secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    return token;
  };

  export default generateToken;