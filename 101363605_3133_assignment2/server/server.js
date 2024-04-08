const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB_URL = "mongodb+srv://skulmiye:admin@cluster0.crgngtc.mongodb.net/f2024_comp3133_assigment2?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server\n");    
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

const server = new ApolloServer({ typeDefs, resolvers });

app.use(cors({
    origin: 'http://localhost:4200'
}));

// Start the server and then apply middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    const SERVER_PORT = 8084;
    app.listen(SERVER_PORT, () =>{
        console.log(`\nServer running at http://localhost:${SERVER_PORT}/\n`);
    });
});
