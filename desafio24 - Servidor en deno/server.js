
import { ProductRouter, CartRouter, AuthRouter, InfoRouter, RandomRouter, HomeRouter } from './src/routes/index.js'
import { config } from './src/config/index.js'
import cluster from 'cluster'
import { INFO } from './src/utils/index.js'
import logger from './src/loggers/loggers.js'
import { koaBody } from 'koa-body'
import koa from 'koa'


const app = new koa()

app.use(koaBody())


app.use(koaBody())
// app.use('/', HomeRouter)
// app.use('/api/auth', AuthRouter)
app.use(ProductRouter.routes())
app.use(CartRouter.routes())
// app.use('/api/randoms', RandomRouter)
// app.use('/api/info', InfoRouter)


import parseArgs from 'minimist'

const args = parseArgs(process.argv.slice(2))
const CLUSTER = args.CLUSTER

app.listen(config.SERVER.PORT, () => {
    logger.info(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 22 - Reformar para usar otro framework`)
    console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 22 - Reformar para usar otro framework`)
}).on('error', error => {
    logger.error(`Error del servidor: ${error}`)
})


if (CLUSTER) {
    if (cluster.isPrimary) {
        logger.info(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`)

        for (let i = 0; i < INFO.numeroCPUs; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            logger.info(`Worker ${worker.process.pid} finalizado.`);
            cluster.fork();
        });

    } else {
        logger.info(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    logger.info(`http://localhost:${config.SERVER.PORT}/`)
    logger.info(`No es un cluster`);
}
