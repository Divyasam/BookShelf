import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions'

class EditBook extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
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


    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata))
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }
    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },1000)
    }


    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        let book = nextProps.books.book;
        this.setState({
            formdata:{
                _id:book._id,
                firstName:book.firstName,
                lastName:book.lastName,
                dateOfBirth:book.dateOfBirth,
                gender:book.gender,
                phoneNumber:book.phoneNumber,
                emailAddress:book.emailAddress,
                address:book.address,
                nationality:book.nationality,
                placeOfBirth:book.placeOfBirth            
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    render() {
        let books = this.props.books;
        return (
            <div className="rl_container article">
                {
                    books.updateBook ? 
                        <div className="edit_confirm">
                            post updated , <Link to={`/books/${books.book._id}`}>
                                Click here to see user details
                            </Link>
                        </div>
                    :null
                }
                {
                    books.postDeleted ? 
                        <div className="red_tag">
                            Post Deleted
                            {this.redirectUser()}
                        </div>
                    :null
                }

                <form onSubmit={this.submitForm}>
                    <h2>Edit Details</h2>

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


                    <button type="submit">Edit user details</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}
                        >
                            Delete user details
                        </div>
                    </div>
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

export default connect(mapStateToProps)(EditBook)