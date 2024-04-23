import local from 'passport-local'
import 'dotenv/config'
import passport from 'passport'
import userModel from '../models/user.model.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import jwt from 'passport-jwt'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    const cookieExtractor = (req) => {
        console.log(req.cookies)
        const token = req.cookies ? req.cookies.jwtCookie : {}
        console.log(token)
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            console.log(error)
            return done(error)
        }
    }))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            const { first_name, last_name, age, occupation, gender } = req.body;
    
            try {
                const user = await userModel.findOne({ email: email });
                if (user) {
                    return done(null, false, { status: 401, message: 'Email already used' });
                }
    
                const passwordHash = createHash(password);
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    occupation: occupation,
                    gender: gender,
                    password: passwordHash
                });
    
                return done(null, userCreated);
            } catch (error) {
                console.error(error);
                return done(error); 
            }
        }
    ));
    
    
    passport.use('login', new LocalStrategy({usernameField: 'email'},
        async(email, password, done) => {
            try {
                const user = await userModel.findOne({email: email})
                if(!user) {
                    return done(null, false, {message: 'User not found'})
                }
                if(validatePassword(password, user.password)) {
                    return done(null, user)
                }
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });

}

export default initializePassport