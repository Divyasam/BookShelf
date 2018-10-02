import React, { Component } from 'react';
import { getBookWithReviewer, clearBookWithReviewer } from '../../actions';
import { connect } from 'react-redux';

class BookView extends Component {

    componentWillMount(){
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearBookWithReviewer())
    }

    renderBook = (books) => (
        books.book ? 
            <div className="br_container">
                <div className="br_header">
                    <div className="br_reviewer">
                        <span>Name:</span> {books.book.firstName} {books.book.lastName}
                    </div>
                    <div className="br_reviewer">
                        <span>Email Address:</span> {books.book.emailAddress}
                    </div>
                    <div className="br_reviewer">
                        <span>Phone number:</span> {books.book.phoneNumber}
                    </div>
                    <div className="br_reviewer">
                        <span>Date of Birth:</span> {books.book.dateOfBirth}
                    </div>
                    <div className="br_reviewer">
                        <span>Gender:</span> {books.book.gender}
                    </div>
                    <div className="br_reviewer">
                        <span>Nationality:</span> {books.book.nationality}
                    </div>
                    <div className="br_reviewer">
                        <span>Place of Birth:</span> {books.book.placeOfBirth}
                    </div>
                </div>               
            </div>
        :null
    )

    render() {
        let books = this.props.books;
        console.log(books);
        return (
            <div>
                {this.renderBook(books)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(BookView)