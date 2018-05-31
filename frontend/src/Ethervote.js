import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
//import { Redirect } from 'react-router'
import Web3 from 'web3';
import ethervote_source from './contracts/ethervote.json'
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import User from './User';
//import User2 from './User2';
import Firstlogin from './Firstlogin';
//import Admin from './Admin';

//const ethervote_source = require('./contracts/ethervote.json');
//const ethervote_abi = require('./contracts/ethervote.abi');
//const ethervote_bin = require('./contracts/ethervote.bin');

const ethervoteimg = require('./img/logo.png');


class Ethervote extends Component {
    constructor(props) {
        super(props);
        var web3;
        if(typeof web3 !== 'undefined'){
            console.log("Using web3 detected from external source like Metamask");
            this.web3 = new Web3(web3.currentProvider);
        }
        else{
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
        this.connect_to_ethervote =  this.connect_to_ethervote.bind(this);
    }

    connect_to_ethervote() {
        console.log(Ethervote.ethervote_address);
        let ethervote_contract = this.web3.eth.contract(ethervote_source.abi);
        Ethervote.ethervote = ethervote_contract.at(Ethervote.ethervote_address);
        console.log(this.ethervote.address);
    }


    getEthervote = (ethervote_firstlogin) => {
        Ethervote.ethervote = ethervote_firstlogin;
        console.log("CALLBACK FUNCIONA");
        console.log(Ethervote.ethervote);
    };

    render() {
        if (this.state.deployed) {
            return <User web3={this.web3} ethervote={this.ethervote}/>
        }
        else {
            return <Firstlogin web3={this.web3} getEthervote={this.getEthervote}/>
        }
    }
}

export default Ethervote;
