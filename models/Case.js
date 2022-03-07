const {dataBase} = require('../config/mongodb')
const {ObjectId} = require('mongodb')


class Case{
    static Case(){
        const db = dataBase()
        return db.collection('Cases')
    }
    static insertCases(payload) {
        return this.Case().insertOne(payload);
    }

    static findAll(){
        return this.Case().find().toArray();
    }

}

module.exports = Case