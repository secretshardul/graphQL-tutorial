const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql
const _ = require('lodash')

//dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];
var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    /*declare anonymous function instead of object for 'fields'.
    this is for hoisting. So AuthorType can be referenced before it is declared.
    */
    fields: () => ({
        //GraphQL data types must be imported, can't use String, Int etc
        id: { type: GraphQLID },
        /*GraphQLID is treated as a javascript string. It doesn't match int types
        While querying GraphQLID we can use both book(id: "1") and book(id: 1)
        */
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
                //compare id in authors[] with authorId in books[]
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id }) //return list with matching ID
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                //get data from DB or other sources
                //args contains id and other fields from top
                return _.find(books, { id: args.id }) //return book with matching ID
            }
        },
        books: { //list of all books
            type: new GraphQLList(BookType),
            //no args parameter
            resolve(parent, args) {
                return books
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args){
                return _.find(authors, { id: args.id })
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
