

const logInUser = (req, res) => {
    try {
        // const { userName } = req.body
        // req.session.user = userName
        res.render('login.hbs')
    } catch (error) {
        console.log(`error from logInUser - ${error}`);
    }
}

const logOutUser = (req, res) => {
    try {
        const userName = req.session.user
        req.session.destroy()
        res.render('logout.hbs', {
            userName
        })
    } catch (error) {
        console.log(`error from logOutUser - ${error}`);
    }
}

const postLogIn = (req, res) => {
    try {
        const { userName } = req.body
        req.session.user = userName
        // res.redirect('/products')
    } catch (error) {
        console.log(`Error desde el postLogIn`);
    }
}

export const SessionController = { logInUser, logOutUser, postLogIn }