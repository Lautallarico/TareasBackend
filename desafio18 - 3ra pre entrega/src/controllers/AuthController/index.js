import { UserDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../../utils/index.js";
import { CartController } from "../CartsController/index.js";

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
        // const newCart = CartController.saveCart()
        const newUser = await UserDao.save({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password), adress, age, celPhone})

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

        return cb(null, newUser)

    } catch (error) {
        console.log(`error from AuthRouter-Post`);
        res.send({ success: false })
    }
}

const login = async (req, email, password, done) => {
    try {
        if (!email || !password) return done(null, false)
        const user = await UserDao.getOne({ email: email })

        if (!user) {
            console.log(`Password or user not valid user`);
            return done(null, false)
        }

        if (BCRYPT_VALIDATION.isValidPassword(password, user) != true) {
            console.log(`Password or user not valid pass`);
            return done(null, false)
        }

        const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
        };

        console.log(userResponse);
        done(null, userResponse)

    } catch (error) {
        res.send({ sucess: false, message: ERRORS_UTILS.USERS.NO_USER_OR_PASSWORD })
        console.log(`error from middlewares/passportAuth - LocalStrategy`)
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

        done(null, userResponse)

    } catch (error) {
        res.send({ sucess: false, message: ERRORS_UTILS.USERS.NO_USER_OR_PASSWORD })
        console.log(`error from middlewares/passportAuth - GithubStrategy`)
        done(error)
    }

}


export const AuthControllers = { signUp, login, githubLogin }