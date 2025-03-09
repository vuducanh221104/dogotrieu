require('dotenv').config();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../Models/User');
const jwt = require('jsonwebtoken');

const doLoginWithGoogle = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_APP_ID,
                clientSecret: process.env.GOOGLE_APP_SECRET,
                callbackURL: '/api/v1/auth/google/redirect',
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    if (!profile || !profile.emails || !profile.emails[0]) {
                        return done(new Error('Invalid Google profile data'), null);
                    }

                    // Tìm user dựa trên Google ID hoặc email
                    let user = await User.findOne({
                        $or: [{ id_auth_provider: profile.id }, { email: profile.emails[0].value }],
                    });

                    if (!user) {
                        // Tạo user mới nếu chưa tồn tại
                        user = new User({
                            user_name: `google_${profile.id}`,
                            email: profile.emails[0].value,
                            full_name: profile.displayName,
                            avatar: profile.photos ? profile.photos[0].value : '',
                            type: 'GOOGLE',
                            id_auth_provider: profile.id,
                            is_verified: true,
                            status: 1,
                        });
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            },
        ),
    );

    passport.serializeUser((user, done) => {
        console.log('Serializing user:', user._id);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log('Deserializing user:', id);
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.error('Deserialize Error:', error);
            done(error, null);
        }
    });
};

module.exports = doLoginWithGoogle;
