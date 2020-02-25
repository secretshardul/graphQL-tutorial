const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// console.log(process.env.MONGODB_PASSWORD)
mongoose.connect(
    `mongodb+srv://shardul:${process.env.MONGODB_PASSWORD}@netninjagraphqltutorial-ki44r.mongodb.net/test?retryWrites=true&w=majority`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }//mongoDB config to supress deprecation warnings
)

mongoose.connection.once('open', () => {console.log('connected to MongoDB')})

app.use('/graphql', graphqlHTTP({
    //ES6: {foo: foo} can be shortened as {foo}
    schema, //root query
    graphiql: true //start graphiql GUI on localhost:4000/graphql
}))

app.listen(4000, console.log('listening on port 4000'))
