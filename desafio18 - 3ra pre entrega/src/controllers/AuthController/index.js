import { UserDao } from "../../dao/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../../utils/index.js";

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

        const newUser = await UserDao.save({ name, lastname, email, password: BCRYPT_VALIDATION.hashPassword(password), adress, age, celPhone })

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

const githubLogin = (req, res) => {
    res.send({ success: true, message: 'Bienvenido desde github' })
}


export const AuthControllers = { signUp, githubLogin }