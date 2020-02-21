# Tech stack
![](images/2020-02-21-10-29-22.png)

# Express backend
Install modules
```
npm i express graphql express-graphql
```
1. ```graphql```: to define graph and get GraphQL data types
2. ```express-graphql```: To create express endpoint. By convention it's named as ```qraphqlHTTP```
```js
const graphqlHTTP = require('express-graphql')
```

## GraphQL schema
It performs 3 tasks
1. Define object types: Eg. ```BookType```
2. Define relation between object types
3. Define **root query**: Root query specifies how user can query data.
