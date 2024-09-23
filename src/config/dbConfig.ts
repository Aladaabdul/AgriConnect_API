import mongoose from "mongoose";

const MONGO_DB_CONNECT_URL: string = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/Agro_connect'

export function connectTomongo() {
    mongoose.connect(MONGO_DB_CONNECT_URL)

    mongoose.connection.on('connected', () => {
        console.log('Connected successfully');
    })
    mongoose.connection.on('error', (err) => {
        console.log(err)
        console.log("An error occured")
    })
}

module.exports = { connectTomongo }