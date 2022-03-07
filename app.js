require('dotenv').config();

const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT ||4000
const {connect} = require('./config/mongodb')

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);

connect()
    .then(async()=>[
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
          })
    ])
    .catch((err)=>{
        console.log(err)
})