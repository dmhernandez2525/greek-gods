const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const models = require('./models');
const app = express();

if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
    // The configuration object we pass into connect()
    // prevents an error being thrown by the latest release of MongoDB's driver
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


    // Don't forget to import your schema from ./schema/schema
    const expressGraphQL = require("express-graphql");
    const schema = require("./schema/schema");

    // ...
    // ...

    app.use(
        "/graphql",
        expressGraphQL({
            schema,
            graphiql: true
        })
    );
// We use body-parser in order to be able to parse
// incoming requests in middleware before they are handled
app.use(bodyParser.json());

module.exports = app;