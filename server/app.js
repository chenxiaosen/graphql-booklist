const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

//cloud.mongodb
mongoose.connect('mongodb+srv://<dbuser>:<password>@cluster0.xeyqf.mongodb.net/gql-ninja?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true}
)
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})


const app = express();

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql:true
    }),
);
app.listen(4000,()=>{
    console.log(`express running at http://localhost:4000`)
})