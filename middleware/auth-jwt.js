const { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()

const authJwt = () => {

    let secret = process.env.SECRET_KEY

    return jwt({
        secret,
        algorithms: ['HS256']
    })
    .unless({ path: [
        {url: /(.*)/}
        // "/users/login",
        // "/users/register",
        // {
        //     url: /^\/images\/.*/,
        // },
        // {
        //     url: '/products',methods: ['GET','POST'],
        // }
    ]})
}

module.exports = authJwt