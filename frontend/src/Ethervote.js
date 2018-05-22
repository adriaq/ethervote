import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
const ethervoteimg = require('./img/logo.png');

class Ethervote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (

      <div className="global">
          <div>
              <div>
                  <img className="ethervote-image" src={ethervoteimg} alt="logo"/>
                  <p className="blockchain-text"> A blockchain based voting system </p>
              </div>

              <div>
                  <form>
                      <div className="form-group">
                          <p className="join-text"> Join Ethervote </p>
                          <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter organization's name"/>
                      </div>
                      <button type="submit" className="btn btn-primary register-btn">Submit</button>
                  </form>
              </div>
          </div>
      </div>
    );
  }
}

export default Ethervote;
