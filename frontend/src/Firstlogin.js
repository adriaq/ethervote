import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Firstlogin.css';
import ethervote from './Ethervote'
const ethervoteimg = require('./img/logo.png');

class Firstlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ethervote_address: '',
        organitzation_name: '',
    };
    //console.log(Ethervote.web3);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.connect_to_ethervote = this.connect_to_ethervote.bind(this);
    this.deploy_ethervote =  this.deploy_ethervote.bind(this);
  }

  handleNameChange(event) {
      this.setState({ethervote_address: event.target.value});
  }
  handleAddressChange(event) {
      this.setState({organitzation_name: event.target.value});
  }

  connect_to_ethervote() {
      //aqui el conect
  }
  deploy_ethervote() {
      //aqui es fara el deploy

      console.log(ethervote.web3);
      fetch('/connect_ethervote', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              organitzation_name: this.state.organitzation_name,
          })
      })
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
                          <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter organization's name" value={this.state.value} onChange={this.handleNameChange}/>
                      </div>
                      <button className="btn btn-primary register-btn" onClick={this.deploy_ethervote}> Submit</button>
                  </form>
              </div>

              <div className="text-center" >
              <p></p>
                    <p>Or connect to an existing one</p>
                    <div>
                    <input type="text" value={this.state.value} onChange={this.handleAddressChange}/>
                  <Button className="btn btn-info btn-sm " color="primary" onClick={this.connect_to_ethervote} > Connect </Button>
                  </div>
                  <br></br>
              </div>
          </div>
      </div>
    );
  }
}

export default Firstlogin;
