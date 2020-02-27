import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

    displayAuthors(){
        let data = this.props.getAuthorsQuery;
        console.log(this.props);
        if(data.loading){
            return (<option disabled={true}>Loading...</option>);
        } else {
            return data.authors.map(author => {
                return (<option key={ author.id } value={ author.id }>{author.name}</option> )
            })
        }
    }
    submitForm(event){
        event.preventDefault();
        console.log(this.state);
        this.props.addBookMutation();
    }
    render() {
        console.log(this.props);
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ event => this.setState({ name: event.target.value }) }/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ event => this.setState({ genre: event.target.value }) }/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={ event => this.setState({ authorId: event.target.value }) }>
                        <option>Select Author</option>
                        { this.displayAuthors() }
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
