const randomNumbers = (cant) => {

    const objectNumbers = {}

    console.log('cant dentro de la funcion randomNumbers: ', cant);

    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000 + 1)

        console.log('randomNumber: ', randomNumber);

        if (objectNumbers[randomNumber]) {
            objectNumbers[randomNumber]++
        } else {
            objectNumbers[randomNumber] = 1
        }
    }

    console.log('numbers antes del return: ', objectNumbers);
    return objectNumbers
}


process.on('message', (cant) => {
    console.log('cant dentro del process.on ', cant);
    const result = randomNumbers(cant)
    console.log('result: ', result);
    process.send(result)
})
