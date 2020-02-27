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

export { getAuthorsQuery, getBooksQuery };