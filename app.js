const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()

app.use('/graphql', graphqlHTTP({
    //ES6: {foo: foo} can be shortened as {foo}
    schema, //root query
    graphiql: true //start graphiql GUI on localhost:4000/graphql
}))

app.listen(4000, console.log('listening on port 4000'))
