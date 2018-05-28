import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
import { Redirect } from 'react-router'
import Web3 from 'web3';
import ethervote_source from './contracts/ethervote.json'
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
    this.state = {
        ethervote_address: '',
        organitzation_name: '',
        deployed: false,
    };
    this.is_deployed =  this.is_deployed.bind(this);
    this.deploy_ethervote =  this.deploy_ethervote.bind(this);

  }
  deploy_ethervote() {
      var ethervote = this.web3.eth.contract(ethervote_source.abi);

      ethervote.new(
        ["organitzacio 1", 3600]
       ,{
         from: this.web3.eth.accounts[0],
         data: ethervote_source.bytecode,
         gas: 4700000
     }, function (e, ethervote){
          console.log(e, ethervote);
          if (typeof ethervote.address !== 'undefined') {
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
    is_deployed() {
        console.log("is_deployed?");

    }
    render() { return(
        <button className="btn btn-primary register-btn" onClick={this.deploy_ethervote}> Submit</button>
    )}/*
        render() {
        this.state.deployed = this.is_deployed();
        if (this.state.deployed === true) {
            return <Redirect to='/User' />
        } else {
            return <Redirect to='/Firstlogin' />
        }
    }*/
}

export default Ethervote;
