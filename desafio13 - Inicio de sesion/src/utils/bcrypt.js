import bcrypt from 'bcryptjs'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)

//achico codigo :)

export const BCRYPT_VALIDATION = { hashPassword, isValidPassword }