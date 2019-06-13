const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose  = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connect database');
    
}).catch(err => {
    console.log('not connect database');
    process.exit();
})
app.get('/', (req, res) => {
    res.json({'message': "Welcome to EasyNotes application"})
});

require('./routes/note.routes')(app)
app.listen(2000, () => {
    console.log("Server listening 2000");
    
})