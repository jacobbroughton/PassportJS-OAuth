const router = require('express').Router();
const passport = require("passport")

// Auth login
router.get("/login", (req, res) => {
    res.render("login")
});

router.get("/logout", (req, res) => {
    // handle with passport
    res.send("logging out")
})

// auth with google
// passport object has our google strat 
// directs user to consent screen
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for google to redirect to
// directs user to redirect with new unique code, with new callback
router.get("/google/redirect", passport.authenticate("google"),  (req, res) => {
    res.send("You reached the callback URI");
})

module.exports = router;