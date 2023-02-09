import { UserDao, CartDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../../utils/index.js";
import logger from '../../loggers/loggers.js'

const signUp = async (req, res, cb) => {
    try {

        const { name, lastname, email, password, adress, age, celPhone } = req.body

        if (!name || !lastname || !email || !password || !adress || !age || !celPhone) return res.send({ success: false })

        const existUser = await UserDao.getOne({ email })

        if (existUser && existUser.password) {
            return res.redirect('/api/auth/signup-error')
        }

        if (existUser && !existUser.password) {
            const updateUser = await UserDao.updateById(existUser._id, { ...existUser, password })
            return res.send({ success: true })
        }
        const userCart = await CartDao.save()
        const newUser = await UserDao.save({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password), adress, age, celPhone, cart: userCart.id })

        let subject = 'Nuevo usuario creado'
        let mailTo = 'lauta.tallarico@gmail.com'
        let html = `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre y apellido: ${name} ${lastname}</li>
                    <li> Email: ${email}</li>
                    <li> Teléfono: ${celPhone}</li>
                    <li> Edad: ${age}</li>
                    <li> Direccion: ${adress}</li>
                    </ul>
        `


        await EMAIL_UTILS.sendEmail(mailTo, subject, html)

        res.redirect('/api/auth/login')
        return cb(null, newUser)

    } catch (error) {
        res.render('/api/auth/signup-error')
        logger.error(`error from AuthRouter-Post`);
        res.send({ success: false })
    }
}

const login = async (req, email, password, done) => {
    try {
        if (!email || !password) return done(null, false)
        const user = await UserDao.getOne({ email: email })

        if (!user) {
            logger.warn(`Password or user not valid user`);
            return done(null, false)
        }

        if (BCRYPT_VALIDATION.isValidPassword(password, user) != true) {
            logger.warn(`Password or user not valid pass`);
            return done(null, false)
        }

        const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
        };

        done(null, userResponse)

    } catch (error) {
        res.render('/api/auth/login-error')
        logger.error(`error from middlewares/passportAuth - LocalStrategy`, error)
        done(error)
    }
}

const githubLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        // fs.writeFileSync('./data.json', JSON.stringify(profile, null, 3))

        const githubEmail = profile.emails?.[0].value

        if (!githubEmail) return done(null, false)

        const user = await UserDao.getOne({ email: githubEmail })

        if (user) {
            const userResponse = {
                id: user._id,
                email: user.email,
                cart: user.cart
            }

            return done(null, userResponse)
        }

        const newUser = {
            email: githubEmail,
            name: profile._json.name,
            lastname: "--",

        }

        const createUser = await UserDao.save(newUser)

        const userResponse = {
            id: createUser._id,
            email: createUser.email,
            cart: createUser.cart
        }

        res.redirect('welcome', {})
        done(null, userResponse)

    } catch (error) {
        res.render('/api/auth/login-error')
        logger.error(`error from middlewares/passportAuth - GithubStrategy`)
        console.log(`error from middlewares/passportAuth - GithubStrategy`)
        done(error)
    }

}

const logInView = async (req, res) => {
    res.render('login')
}

const logInPost = async (req, res) => {
    const { email } = req.body
    res.render('welcome', { email })
}

const sigUpView = async (req, res) => {
    res.render('signup')
}

const logOutView = async (req, res) => {
    res.render('logout')
}

const logInError = async (req, res) => {
    logger.error('Credenciales incorrectas')
    res.render('login-error.hbs')
}

const userExist = async (req, res) => {
    res.render('user-exists.hbs')
}

const welcome = async (req, res) => {
    res.render('welcome', {})
}

const githubUser = async (req, res) => {
    res.send(req.user)
}


export const AuthControllers = { signUp, login, githubLogin, logInView, logInPost, sigUpView, logOutView, logInError, userExist, welcome, githubUser }