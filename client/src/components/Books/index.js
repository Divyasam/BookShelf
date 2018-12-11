import React, { Component } from 'react';
import { getBookWithReviewer, clearBookWithReviewer, passTwitterData } from '../../actions';
import { connect } from 'react-redux';
const cp = require('child_process');

class BookView extends Component {

    state = {
        formdata:{
            twitterUserName: ''
        }
    }


    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    componentWillMount(){
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearBookWithReviewer())
    }

    sentimentAnalysis = (e) => {
        e.preventDefault();
        const UserName = this.state.formdata.twitterUserName;
        this.props.dispatch(passTwitterData({
            ...this.state.formdata,
            twitterUserName:UserName
        }))
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
            <div>
                {this.renderBook(books)}
            </div>
            <form onSubmit={this.sentimentAnalysis}>
              <div className="form_element">
                <input
                            type="text"
                            placeholder="Twitter UserName"
                            value={this.state.formdata.twitterUserName}
                            onChange={(event)=>this.handleInput(event,'twitterUserName')}
                />
                <button type="submit">Submit</button>
              </div>
            </form>
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