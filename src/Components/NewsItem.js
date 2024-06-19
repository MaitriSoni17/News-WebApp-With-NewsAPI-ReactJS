import React, { Component } from 'react';
import NoImg from './no-img.jpg'

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, date, author, source } = this.props;
    return (
      <>
        <div className="card mt-5">
          <img src={!imgUrl ? NoImg : imgUrl} className="card-img-top h-50" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span className="badge text-bg-secondary rounded-pill p-2 mt-1">{source}</span></h5>
            <p className="card-text">{description}</p>
            <p><small className="text-body-secondary">{new Date(date).toGMTString()}</small></p>
            <p><small className="text-body-secondary">{!author? "Unknown" :author}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
