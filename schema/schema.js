const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: {
        id: { type: GraphQLString }, //GraphQL data types must be imported
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                //get data from DB
                //args contains id and other fields from top
            }
        }
    }
})
/*Example query
book(id: '123'){
    name
    genre
}
*/

module.exports = new GraphQLSchema({
    query: RootQuery //RootQuery used by express-graphql middleware
})
