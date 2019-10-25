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
// tells user that we need profile information
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// callback route for google to redirect to
router.get("/google/redirect", (req, res) => {
    res.send("You reached the callback URI")
})

module.exports = router;