import { Router } from "express";
import { SessionController } from "../../controllers/index.js";


const router = Router()

router.get('/login', SessionController.logInUser)

router.get('/logout', SessionController.logOutUser)

router.post('/login', (req, res) => {
    const { userName } = req.body
    req.session.user = userName
    res.redirect('/products')
})


export { router as SessionRouter }