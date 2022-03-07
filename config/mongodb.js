require('dotenv').config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

function connect(){
    return client.connect()
            .then(_ =>{
                db = client.db('userDB')
            })
            .catch(err=>{
                console.log(err)
            })
}

function dataBase(){
    return db
}

module.exports = {connect, dataBase}