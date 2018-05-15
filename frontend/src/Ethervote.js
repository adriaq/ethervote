import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css'

class Ethervote extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (

            <div className="global">
                <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"> Ethervote </a>
                        </div>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#"> About us </a></li>
                                <li><a href="/admin"> Login </a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="col-lg-6">

                    <p className="blockchain-text"> A blockchain based voting system </p>

                </div>

                <div class="col-lg-6">

                    <p className="join-text"> Join Ethervote </p>
                    <form>
                        <div class="form-group">
                            <label for="inputName"> Organization's name </label>
                            <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter Organization name"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1"> Un altre camp que es pot demanar </label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Organization name"/>
                        </div>
                        <button type="submit" class="btn btn-primary register-btn">Submit</button>
                    </form>

                </div>

            </div>
        );
    }
}

export default Ethervote;
