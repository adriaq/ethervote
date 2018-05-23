import React, {Component} from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
import { Redirect } from 'react-router'
import Web3 from 'web3';
var web3;
const ethervoteimg = require('./img/logo.png');
 // = new Web3(Web3.givenProvider || "http://localhost:8545");
//web3.eth.getAccounts().then(console.log);

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use the browser's ethereum provider
    var provider = web3.currentProvider
  } else {
    console.log('No web3? You should consider trying MetaMask!')
  }

})


class Ethervote extends Component {
  constructor(props) {
    super(props);
    this.wweb3 = "Soc web3";
    this.state = {
        ethervote_address: '',
        organitzation_name: '',
        deployed: false,
    };
  }



  render() {
      if (this.state.deployed === true) {
          return <Redirect to='/App' />
      } else {
          return <Redirect to='/Firstlogin' />
      }
  }
}

export default Ethervote;
