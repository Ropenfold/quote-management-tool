import React, {useState, useEffect } from 'react';
import { get, patch } from 'axios';

function QuoteEdit(props) {
    const initialState = { quote: '', author: '' }
    const [quote, setQuote] = useState(initialState)

    useEffect(function (){
        async function getQuote() {
            try {
                const response = await get(`/api/quotes/${props.match.params._id}`);
                setQuote(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        getQuote();        
    }, [props]);

function handleSubmit(event) {
    event.preventDefault();
    async function updateQuote() {
        try {
            await patch(`/api/quotes/${quote._id}`, quote);
            props.history.push(`/quotes/${quote._id}`);
        } catch(err) {
            console.log(err)
        }
    }
    updateQuote();
}

function handleChange(event) {
    setQuote({...quote, [event.target.quote]: event.target.value})
}

function handleCancel() {
    props.history.push(`/quotes/${quote._id}`);
}

return (
    <div>
        <h1>Edit {quote.quote}</h1>
        <hr/>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Quote</label>
            <input type="test" name="quote" value={quote.quote} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
            <label>Author</label>
            <input type="test" name="author" value={quote.author} onChange={handleChange} className="form-control" />
            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    </div>
    );
}

export default QuoteEdit