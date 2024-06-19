import React, { Component } from 'react'
import Loading from './Loading.gif';

export class Loader extends Component {
  render() {
    return (
      <div className="text-center my-5 py-5">
        <img src={Loading} alt=""/>
      </div>
    )
  }
}

export default Loader
