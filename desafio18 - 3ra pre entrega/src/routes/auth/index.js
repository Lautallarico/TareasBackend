import { Router } from "express";
import logger from "../../loggers/loggers.js";
import passport from "passport";
import { AuthControllers } from "../../controllers/AuthController/index.js";
import { IncorrectRoute } from "../../middlewares/index.js";

const router = Router()

//LOGIN
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: "/api/auth/login-error" }), async (req, res) => {
    const { email } = req.body
    res.render('welcome', { email })
})


//SIGNUP
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', AuthControllers.signUp, async (req, res) => {
    res.redirect('/api/auth/login')
})

//LOGOUT
router.get('/logout', (req, res) => {
    res.render('logout')
})

//ERROR
router.get('/login-error', (req, res) => {
    logger.error('Credenciales incorrectas')
    res.render('login-error.hbs')
})

router.get('/signup-error', (req, res) => {
    res.render('user-exists.hbs')
})


//WELCOME
router.get('/welcome', (req, res) => {
    res.render('welcome', {})
})


//GITHUB
router.get('/github-login', passport.authenticate('github'), (req, res) => {
    res.send({ success: true, message: 'Bienvenido desde github' })
})

router.get('/github', passport.authenticate('github'), (req, res) => {
    res.send(req.user)
})

router.get('*', IncorrectRoute.errorRoutes)

export { router as AuthRouter }