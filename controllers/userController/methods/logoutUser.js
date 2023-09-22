export const logout =  (req, res,next) => {
  req.logout();
  res.redirect('/');
};