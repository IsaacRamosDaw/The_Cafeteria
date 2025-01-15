exports.signin = (req, res) => {
  if(!req.body.username || !req.body.password) {
    return res.render("error", {
      message: "Username or password required"
    });
  }

  const username = req.body.username;
  const salt = req.body.password;

  
}