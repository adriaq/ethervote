import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';

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

        <div>
          <div>
            <p className="blockchain-text"> A blockchain based voting system </p>
          </div>

          <div>
            <p className="join-text"> Join Ethervote </p>
            <form>
              <div class="form-group">
                <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter organization's name"/>
              </div>
              <button type="submit" class="btn btn-primary register-btn">Submit</button>
            </form>

          </div>
        </div>


      </div>
    );
  }
}

export default Ethervote;
