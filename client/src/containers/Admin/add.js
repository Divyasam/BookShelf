import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions'

class AddBook extends Component {

    state = {
        formdata:{
            firstName:'',
            lastName:'',
            dateOfBirth:'',
            gender:'',
            phoneNumber:0,
            emailAddress:'',
            address:'',
            nationality:'',
            placeOfBirth:''
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

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Cool !! <Link to={`/books/${book.bookId}`}>
                    Click the link to see the applicant detail.
                </Link>
            </div>
        :null
    )


    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state.formdata);
        
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render() {
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Passport Application</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={this.state.formdata.firstName}
                            onChange={(event)=>this.handleInput(event,'firstName')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={this.state.formdata.lastName}
                            onChange={(event)=>this.handleInput(event,'lastName')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="date"
                            placeholder="Date Of Birth"
                            value={this.state.formdata.dateOfBirth}
                            onChange={(event)=>this.handleInput(event,'dateOfBirth')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Gender"
                            value={this.state.formdata.gender}
                            onChange={(event)=>this.handleInput(event,'gender')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={this.state.formdata.phoneNumber}
                            onChange={(event)=>this.handleInput(event,'phoneNumber')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={this.state.formdata.emailAddress}
                            onChange={(event)=>this.handleInput(event,'emailAddress')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Address"
                            value={this.state.formdata.address}
                            onChange={(event)=>this.handleInput(event,'address')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Nationality"
                            value={this.state.formdata.nationality}
                            onChange={(event)=>this.handleInput(event,'nationality')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Place Of Birth"
                            value={this.state.formdata.placeOfBirth}
                            onChange={(event)=>this.handleInput(event,'placeOfBirth')}
                        />
                    </div>

                    <button type="submit">Apply</button>
                    {
                        this.props.books.newbook ? 
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(AddBook)