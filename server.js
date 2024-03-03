require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("./db/config");
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");

const clientid = "502892102344-9tr5lu3ks2bdnodg78beegfjq1941i42.apps.googleusercontent.com"; // Your Google Client ID
const clientsecret = "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"; // Your Google Client Secret

const facebookClientId = "1145308763127342"; // Your Facebook Client ID
const facebookClientSecret = "ef436b64a50145d57ff4ecb99f97091c"; // Your Facebook Client Secret

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",
    credentials: true,
  })
);

app.use(express.json());

// setup session
app.use(
  session({
    secret: "1234567890hcswsxcvbnmkSASRTYJnbvcds",
    resave: false,
    saveUninitialized: true,
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial auth google login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// auth google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/success", async (req, res) => {
  // console.log("request",req.user)

  if (req.user) {
    res.status(200).json({
      message: "user Login",
      user: req.user,
    });
  } else {
    res.status(400).json({
      message: "Not authorized",
    });
  }
});

// Facebook login

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ facebookId: profile.id });

        if (!user) {
          user = new userdb({
            facebookId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User Login",
      user: req.user,
    });
  } else {
    res.status(400).json({
      message: "Not authorized",
    });
  }
});

// logout api
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
});

// static files access
app.use(express.static(path.join(__dirname, "./client/build")));

// call all files
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server Running at Port No ${PORT}`);
});
