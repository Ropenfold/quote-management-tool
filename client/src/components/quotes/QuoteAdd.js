import React, { useState } from 'react';
import { post } from 'axios';

function QuoteAdd(props) {
    const initialState = { quote: '', author: '' }
    const [quote, setQuote] = useState(initialState)

    function handleChange(event) {
        setQuote({...quote, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!quote.quote || !quote.author ) return
        async function postQuote() {
            try {
                const response = await post('/api/quotes', quote);
                props.history.push(`/quotes/${response.data._id}`);
            } catch(error) {
                console.log('error', error);
            }
        }
        postQuote();
    }

    function handleCancel() {
        props.history.push("/quotes")
    }

    return (
        <div>
        <h1>Create Article</h1>
        <hr />
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Quote</label>
        <input name="quote" type="text" value={quote.quote} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
        <label>Author</label>
        <input name="author" type="text" value={quote.author} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
            <input type="submit" value="submit" className="btn btn-primary" />
            <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
        </form>
        </div>
    )
 }

 export default QuoteAdd;