const argumentoDeEntrada = process.argv
const sistOperativo = process.platform
const versionNodeJs = process.version
const memoriaReservada = process.memoryUsage().rss
const pathEjecucion = process.title
const processID = process.pid
const carpetaDelProyecto = process.cwd()

export const INFO = {
    argumentoDeEntrada, sistOperativo, versionNodeJs, memoriaReservada, pathEjecucion, processID, carpetaDelProyecto
}