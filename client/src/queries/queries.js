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
    mutation {
        addBook(name: "", genre: "", authorId: ""){
            name
            genre
        }
    }
`;
export { getAuthorsQuery, getBooksQuery, addBookMutation };