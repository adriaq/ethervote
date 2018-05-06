import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
    handleChange = (event) => {
        this.props.textChange(event);
    }

    render() {
        return (
            <div >
                <header className="Login-header">
                    <h1 className="Login-title">Welcome to Ethervote</h1>
                </header>

                <div className="component-search-input">
                    <div>
                        <p> USER: </p>
                        <input
                           /* onChange={this.handleChange}*/
                        />
                    </div>

                    <div>
                        <p> PASSWORD: </p>
                        <input
                            /* onChange={this.handleChange}*/
                        />
                    </div>
                </div>
                <p className="LoginMenu"> Aqui botons</p>
            </div>
        );
    }

}

export default Login;