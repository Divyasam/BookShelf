import axios from 'axios';

//retreiving applicant details in the front page - not used
export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                            if(list){
                                return [...list,...response.data]
                            } else {
                                return response.data
                            }
                        }
                    )

    return {
        type:'GET_BOOKS',
        payload:request
    }

}

export function passTwitterData(userName){
   // let name = userName;
    const request = axios.post('/api/twitter', userName)
                    .then(response => response.data);

    return {
        type:'GET_TWITTERUSERNAME',
        payload:request    
    }
}

//on click of an applicant after applying for passport
export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{
                let response = {
                    book,
                    reviewer:data
                }

                dispatch({
                    type:'GET_BOOK_W_REVIEWER',
                    payload:response
                })
            })
        })
    }
}

//clear when component unmounts
export function clearBookWithReviewer(){
    return {
        type:'CLEAR_BOOK_W_REVIEWER',
        payload:{
            book:{},
            reviewer:{}
        }
    }
}

//user applying for passport
export function addBook(book){
    const request = axios.post('/api/book',book)
        .then(response => response.data);

    return {
        type:'ADD_BOOK',
        payload:request
    }
}

//component unmount after applying for passport 
export function clearNewBook() {
    return {
        type:'CLEAR_NEWBOOK',
        payload:{}
    }
}

//display list of applicants applied under the particular admin
export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
                    .then(response => response.data)

    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

//retreiving the user details corresponding to the passport id
export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
                    .then(response => response.data);

    return {
        type:'GET_BOOK',
        payload:request
    }
}

//editing the details of passport applicant
export function updateBook(data){
    const request = axios.post(`/api/book_update`,data)
                .then(response => response.data);

    return {
        type:'UPDATE_BOOK',
        payload:request
    }

}

//deleting the passport applicant details
export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`)
                    .then(response => response.data)

    return {
        type:'DELETE_BOOK',
        payload:request
    }
}

//component unmount after editing/deleting
export function clearBook(){
    return{
        type:'CLEAR_BOOK',
        payload:{
            book:null,
            updateBook:false,
            postDeleted:false
        }
    }
}


/*========= USER ===========*/

//admin login
export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

//authentication
export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}

export function getBlockData(firstName){
    console.log(firstName);
    const request = axios.get(`/api/block?firstName=${firstName}`)
                .then(response => response.data);
    return {
        type:'BLOCK_DATA',
        payload:request
    }
}

//retreive admin details
export function getUsers(){
    const request = axios.get(`/api/users`)
                    .then(response => response.data);
        
    return {
        type:'GET_USER',
        payload:request
    }
}

//register new admin
export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user)

    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user]:userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}