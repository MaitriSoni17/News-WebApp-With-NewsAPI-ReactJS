import React, { Component } from 'react';

export class Form extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        if (!data.date) {
            data.date = new Date().toISOString().slice(0, 10);
        }
        console.log(data);
        event.target.reset();
    };
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className='container p-5 fs-5'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' id="title" placeholder='Write Title of News' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name='description' id="description" placeholder='Write Description of News' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Image Url</label>
                        <input type="text" className="form-control" name='img' id="img" placeholder='Paste Image URL Here...' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="news" className="form-label">News Url</label>
                        <input type="text" className="form-control" id="news" name='news' placeholder='Link that from where you found that news' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" name='date' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input type="text" className="form-control" id="title" placeholder='Write Author Name' name='author' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="source" className="form-label">Source</label>
                        <input type="text" className="form-control" id="source" placeholder='Write Source Name' name='source' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        )
    }
}

export default Form
