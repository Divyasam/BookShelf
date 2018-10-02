import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = (item) => {
    return (
        <Link to={`/books/${item._id}`} className="book_item">
            
        </Link>
    );
};

export default BookItem;