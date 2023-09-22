function logout(req, res,next) {
    req.logout();
    res.redirect('/');
  }
  
  export default logout;