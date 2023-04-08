const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const app = express();
const cors = require('cors');
const multer = require('multer')
mongoose.set({ strictQuery: true });
require('dotenv').config();

app.use(express.json());

app.use(cors());
app.use(multer().any())

mongoose.connect(process.env.connectionString,
    { dbName: "fsoc" },
    { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)


app.listen(process.env.port||3000, function () {
    console.log('Express app running on port ' + process.env.port||3000)
});
