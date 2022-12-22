import { Router } from "express"
// import { randomNumbers } from "../../utils/index.js"
import { fork } from 'child_process'

const router = Router()

router.get('/', (req, res) => {
    const { cant } = req.query
    const subProcess = fork('randomNumbers.js')

    subProcess.send(cant)

    subProcess.on('message', (cant) => {
        console.log(cant);
        res.render('randoms.hbs', { cant })
    })

})


export { router as RandomRouter }