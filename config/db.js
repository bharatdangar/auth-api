const mongoose = require('mongoose');
const dbHost = process.env.DBHOST;

mongoose.connect(dbHost)
.then(() => {
    console.log('mongo Connected to DB')
})
.catch((err) => {console.log('Error connecting to DB', err)});

