# Tech stack
![](images/2020-02-21-10-29-22.png)

# Express backend
Install modules
```
npm i express graphql express-graphql lodash
```
1. ```graphql```: to define graph and get GraphQL data types
2. ```express-graphql```: To create express endpoint. By convention it's named as ```qraphqlHTTP```
```js
const graphqlHTTP = require('express-graphql')
```
3. ```lodash```: Utility library. Used to find item from array


## GraphQL schema
It performs 3 tasks
1. Define object types: Eg. ```BookType```
2. Define relation between object types
3. Define **root query**: Root query specifies how user can query data.

# Querying
Enable **graphiql** GUI for graphql
```js
app.use('/graphql', graphqlHTTP({

    graphiql: true //start graphiql GUI on localhost:4000/graphql
}))
```

1. Find book with id: 1
```graphql
{
    book(id: 1){
        name
        genre
    }
}
```
2. Find author with id: 1
```
{
    author(id: 1){
        name
        age
    }
}
```

# Relations
We can create a relationship between 2 GraphQL types by nesting them:
```js
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
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
```
Here we can query about a book's author by nesting 'AuthorType' in 'BookType'
```graphql
{
    book(id: 2){
        id
        name
        genre
        author{
            name
            age
        }
    }
}
```

# Lists
1. Used to query multiple objects instead of a single object from **root query**. Here it's not necessary to accept args()
```js
        books: { //list of all books
            type: new GraphQLList(BookType),
            //no args parameter
            resolve(parent, args) {
                return books
            }
        },
```

Querying all books
```
{
    books{
        name
        genre
        author{
            name
            age
        }
    }
}
```

2. An object type can have a field returning a list of another object type. Eg. 'author' query returning list of books by that author.

```js
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType), //GraphQLList() of BookType
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id }) //return list with matching ID
            }
        }
    })
})
```

```graphql
{
    author(id: 1){
        name
        age
        books{
            name
            genre
        }
    }
}
```

