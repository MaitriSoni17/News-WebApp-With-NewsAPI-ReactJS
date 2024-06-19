import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[today.getDay()];
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: date,
            dayName: dayName
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(() =>
            this.updateClock(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    updateClock() {
        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[today.getDay()];
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: date,
            dayName: dayName
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">News App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/general">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology">Technology</Link>
                            </li>
                        </ul>
                        <div className="navbar-text d-flex date">
                            <Link className="nav-link me-3 date text-secondary-emphasis fw-medium">{this.state.time}</Link>
                            <Link className="nav-link me-3 date text-secondary-emphasis fw-medium">{this.state.date}</Link>
                            <Link className="nav-link me-3 date text-secondary-emphasis fw-medium">{this.state.dayName}</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
