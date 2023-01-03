import { Router } from "express"
// import { randomNumbers } from "../../utils/index.js"
import { fork } from 'child_process'


const router = Router()

router.get('/', (req, res) => {
    const cant = req.query.cant || 100000
    const subProcess = fork('randomNumbers.js')

    subProcess.send(cant)

    subProcess.on('message', (numbers) => {

        // res.send({ sucess: true, data: numbers })
        res.render('randoms.hbs', { data: numbers })
    })

})


export { router as RandomRouter }