export const authTwitter =  (req, res,next) => {
  if(req.isAuthenticated()) {
    res.send('Hello ' + req.user[0].name); // Should redirect to homepage in app
  } else {
    res.redirect('/');
  }
};