import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
import { Redirect } from 'react-router'
import Web3 from 'web3';
import ethervote_source from './contracts/ethervote.json'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import User from './User';
import User2 from './User2';
import Firstlogin from './Firstlogin';
import Admin from './Admin';

//const ethervote_source = require('./contracts/ethervote.json');
//const ethervote_abi = require('./contracts/ethervote.abi');
//const ethervote_bin = require('./contracts/ethervote.bin');

const ethervoteimg = require('./img/logo.png');




class Ethervote extends Component {
  constructor(props) {
    super(props);
    var web3;
    if(typeof web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(web3.currentProvider)
   }else{
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
   }
   //this.ethervote_address = '';
   //this.organitzation_name= '';
   this.ethervote = null;
    this.state = {
        ethervote_address: '',
        organitzation_name: '',
        deployed: false,
    };
    this.deploy_ethervote =  this.deploy_ethervote.bind(this);
    this.connect_to_ethervote =  this.connect_to_ethervote.bind(this);
  }
  connect_to_ethervote() {
      console.log(Ethervote.ethervote_address)
      let ethervote_contract = this.web3.eth.contract(ethervote_source.abi)
      Ethervote.ethervote = ethervote_contract.at(Ethervote.ethervote_address);
      console.log(this.ethervote.address);
  }

  deploy_ethervote() {
      Ethervote.ethervote = this.web3.eth.contract(ethervote_source.abi);

      Ethervote.ethervote.new(
        ["organitzacio 1", 3600]
       ,{
         from: this.web3.eth.accounts[0],
         data: ethervote_source.bytecode,
         gas: 4700000
     }, function (e, ethervote){
          //console.log(e, ethervote);
          if (typeof ethervote.address !== 'undefined') {
             Ethervote.ethervote_address = ethervote.address;
             console.log('Contract mined! address: ' + ethervote.address + ' transactionHash: ' + ethervote.transactionHash);
           }
    });

    //Ara fariem el fetch per guardar l'adreça i el bool deployed a true;

      fetch('/connect_ethervote', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "organitzation_name": this.state.organitzation_name,
              "ethervote_address": this.ethervote_address,
              "deployed": 1
          })
      })
  }
  getEthervote = (ethervote_firstlogin) => {
      Ethervote.ethervote = ethervote_firstlogin;
    }

    render() {
        if (this.state.deployed) {
            return <User web3={this.web3} ethervote={this.ethervote}/>
        } else {
            return <Firstlogin web3={this.web3} getEthervote={this.getEthervote}/>
        }
    }
}

export default Ethervote;
