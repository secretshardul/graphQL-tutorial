import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from "../queries/queries";


class BookDetails extends Component {
    displayBookDetails() {
        console.log('Got props: ', this.props.data);
        const { book } = this.props.data;
        if(book) {
            return(
                <div>
                    <h2>{ book.name }</h2>
                    <p>{ book.genre }</p>
                    <p>{ book.author.name }</p>
                </div>
            )
        } else {
            return(<div>No book selected</div>);
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-details">
                    {this.displayBookDetails()}
                </ul>
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
