import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
import { Redirect } from 'react-router'
import Web3 from 'web3';
var web3 = '';
localStorage.setItem('ethervote', 0);
localStorage.setItem('web3', 0);


const ethervoteimg = require('./img/logo.png');
 // = new Web3(Web3.givenProvider || "http://localhost:8545");
//web3.eth.getAccounts().then(console.log);

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use the browser's ethereum provider
    var provider = web3.currentProvider;
  } else {
    console.log('No web3? You should consider trying MetaMask!')
  }
  localStorage.setItem('web3', web3);
});


class Ethervote extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ethervote_address: '',
        organitzation_name: '',
        deployed: false,
    };
    this.is_deployed =  this.is_deployed.bind(this);

  }

  is_deployed() {
      console.log("is_deployed?");
      /*
      fetch('/is_deployed', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              organitzation_name: this.state.organitzation_name,
          })
      })
      */
      fetch('is_deployed')
          .then(function(res) {
             let b = JSON.parse(res.body);
             return b.deployed;
          });
      //Sha de fer un fetch de is_deployed al backend
  }

  render() {
      this.state.deployed = this.is_deployed();
      if (this.state.deployed === true) {
          return <Redirect myDatato='/User' />
      } else {
          return <Redirect to='/Firstlogin' />
      }
  }
}

export default Ethervote;
