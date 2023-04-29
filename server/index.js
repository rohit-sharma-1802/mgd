const express = require('express');
const app = express();
const db = require('./db/db_connection');

app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
});