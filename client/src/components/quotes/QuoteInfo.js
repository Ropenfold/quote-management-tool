import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function QuoteInfo(props) {
    const [quote, setQuote] = useState({});
    console.log('props', props);

    useEffect(function() {
        async function getQuote() {
            try {
                const response = await axios.get(`/api/quotes/${props.match.params._id}`);
                setQuote(response.data);
            } catch(error) {
                console.log('error', error);
            }
        }
        getQuote();
    }, [props]);

    async function handleDelete() {
        try {
            await axios.delete(`/api/quotes/${props.match.params._id}`);
            props.history.push("/quotes");
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
        <h3>{quote.quote}</h3>
        <p>{quote.author}</p>
        <div className="btn-group">
            <Link  to={`/quotes/${quote._id}/edit`} className="btn btn-primary">Edit</Link>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <Link to="/quotes" className="btn btn-secondary">Close</Link>
        </div>
        <hr/>
        </div>
    );
};

export default QuoteInfo;