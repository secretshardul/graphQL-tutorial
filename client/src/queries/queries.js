import {gql} from "apollo-boost";

const getAuthorsQuery = gql`
    {
        authors {
            name
            age
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: String!) {
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
export { getAuthorsQuery, getBooksQuery, addBookMutation };