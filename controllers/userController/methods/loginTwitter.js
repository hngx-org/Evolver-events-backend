function authTwitter(req, res,next) {
    if(req.isAuthenticated()) {
      res.send('Hello ' + req.user[0].id); // Should redirect to homepage in app
    } else {
      res.redirect('/');
    }
  }

  export default authTwitter;