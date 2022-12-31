import { fork } from 'child_process'
import { Router } from "express"


const router = Router()


router.get('/', (req, res) => {
    const cant = req.query.cant || 5
    const subProcess = fork('randomNumbers.js')

    subProcess.send(cant)

    subProcess.on('message', (cant) => {
        res.send({ cant })
        // const obj = Object.entries(data)
        // console.log(obj);
        // res.send({obj})
        // res.render('randoms.hbs', { data: obj })
    })

})


export { router as RandomRouter }