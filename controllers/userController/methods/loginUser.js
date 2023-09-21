exports.index = (req,res,next) => {
    res.send("<button><a href='/auth/google'>Login With Google</a></button> <button><a href='/auth/twitter'>Login With Twitter</a></button>")
  }
  exports.authGoogle = (req,res,next) => {
    if(req.isAuthenticated()) {
        res.send('Hello'); // Should redirect to homepage in app
      } else {
        res.redirect('/');
      }
    
  }
  exports.authTwitter = (req,res,next) => {
    if(req.isAuthenticated()) {
        res.send('Hello'); // Should redirect to homepage in app
      } else {
        res.redirect('/');
      }
  } 
  exports.logout = (req,res,next) => {
    req.logout();
    res.redirect('/');
  }