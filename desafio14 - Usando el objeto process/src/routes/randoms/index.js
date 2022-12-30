import { fork } from 'child_process'
import { Router } from "express"


const router = Router()


router.get('/', (req, res) => {
    const { cant } = req.query
    const subProcess = fork('randomNumbers.js')

    subProcess.send(cant)
    subProcess.on('message', (cant) => {

        console.log('cant en el get: ', cant);

        res.send({ sucess: true, data: cant })
        // res.render('randoms.hbs', { cant })
    })

})


export { router as RandomRouter }