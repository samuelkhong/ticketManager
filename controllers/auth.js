const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }

  res.render("login", {user: req.user });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    console.log('enter valid email')
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
    
  if (validator.isEmpty(req.body.password)) {
    console.log('password empty')
    validationErrors.push({ msg: "Password cannot be blank." });
  }
  
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log(validationErrors)

    return res.redirect("/authenticate/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      console.log('no user found')
      return res.redirect("/authenticate/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('logged in')
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/todos");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  // Logout the user
  req.logout(() => {
    console.log('User has logged out.');

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error: Failed to destroy the session during logout.", err);
      }

      // Remove user information from req object
      req.user = null;

      // Redirect to the home page
      res.redirect("/");
    });
  });
};


exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("register", {user: req.user, errors:[]});
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    console.log('errors')
    // Redirect to the registration page with errors
    return res.render("register", { errors: validationErrors, user: req.user});

  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        validationErrors.push({msg: "Account with that email address or username already exists."});
        console.log('existing user')
        return res.render("register", {errors: validationErrors, user: req.user});
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/todos");
        });
      });
    }
  );
};
