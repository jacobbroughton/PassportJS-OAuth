const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
    new GoogleStrategy({
        // options for the google strat
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // Check if user exists in our DB
        User.findOne({ googleId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    // Already have the user
                    console.log("User already exists...")
                    console.log("--------------------")
                    console.log("User is: " + currentUser);
                } else {
                    // if not, create user in our db    
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    }).save().then((newUser) => {
                        console.log("new user created: " + newUser)
                    });
                }
            })

    }))