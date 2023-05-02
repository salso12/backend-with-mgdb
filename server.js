const app = require('./app')
require("./config/db")

const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log(`App running on ${port} Port ...`)
})
