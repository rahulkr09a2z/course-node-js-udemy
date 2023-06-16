const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1]==='true';
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10");
  User.findById("6410244959077914884d074a")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.user = user;
      req.session.save((err)=>{
        console.log(err);
        res.redirect('/')
      })
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("auth postLogout err", err);
  });
  res.redirect("/");
};
