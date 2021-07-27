const mongoose =  require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongoose connected")
    }).catch((err) => {
        console.log(err.message)
    })
}

module.exports = connectDB;