require('dotenv').config();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const doLoginWithGoogle = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_APP_ID,
                clientSecret: process.env.GOOGLE_APP_SECRET,
                callbackURL: process.env.GOOGLE_APP_REDIRECT_LOGIN,
            },
            function (accessToken, refreshToken, profile, cb) {
                console.log('Check :  ', profile);
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            },
        ),
    );
};

module.exports = doLoginWithGoogle;
