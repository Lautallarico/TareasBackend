import { Router } from "express"
import { INFO } from "../../utils/index.js"

const router = Router()

router.get('/', (req, res) => {
    const data = INFO
    res.render('info.hbs', { data })
})

export { router as InfoRouter }