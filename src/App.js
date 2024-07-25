import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import React, { Component } from 'react'
import Form from './Components/form';

export class App extends Component {
  
  apiKey = process.env.REACT_APP_NEWS_API;
 
  state = {
    progress: 0,
  }
  
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  
  render() {
    return (
      <>
        <Router>

          <Navbar/>

          <LoadingBar
            height={3}
            color='blue'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={10} apiKey={this.apiKey} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={10} apiKey={this.apiKey} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={10} apiKey={this.apiKey} category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general1" pageSize={10} apiKey={this.apiKey} category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={10} apiKey={this.apiKey} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={10} apiKey={this.apiKey} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={10} apiKey={this.apiKey} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={10} apiKey={this.apiKey} category="technology" />} />
            <Route exact path="/form" element={<Form/>} />
          </Routes>

        </Router>
        
      </>
    )
  }
}

export default App
