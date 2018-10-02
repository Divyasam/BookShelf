import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id))
    }

    showUserPosts = (user) => (
        user.userPosts ? 
            user.userPosts.map(item => (
                <tr key={item._id}>
                    <td><Link to={
                        `/user/edit-post/${item._id}`
                    }>{item.firstName}</Link></td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.phoneNumber}</td>                    
                </tr>
            ))
        :null
    )

    render() {
        let user = this.props.user;
        return (
            <div className="user_posts">
                <h4>Applicants Details:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPosts)