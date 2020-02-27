import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {

    displayAuthors(){
        let data = this.props.data;
        if(data.loading){
            return (<option disabled={true}>Loading...</option>);
        } else {
            return data.authors.map(author => {
                return (<option key={ author.id } value={ author.id }>{author.name}</option> )
            })
        }
    }
    render() {
        console.log(this.props);
        return (
            <form id="add-book">

                <div className="field">
                    <label>Book name:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select Author</option>
                        { this.displayAuthors() }
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook);
