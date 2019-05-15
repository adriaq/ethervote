import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Ethervote.css';
import Web3 from 'web3';
import ethervote_source from './contracts/ethervote.json'
import User from './User';
import User2 from './User2';
import Firstlogin from './Firstlogin';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { Redirect } from 'react-router'
import Admin from './Admin';

const ethervoteimg = require('./img/logo.png');
const loading = require('./img/loading.gif');

class Ethervote extends Component {
    constructor(props) {
        super(props);
        window.web3 = new Web3(window.ethereum);
        var web3 = window.web3;
        try {
            // Request account access if needed
             window.ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            console.log(error);
          }
        if(typeof web3 !== 'undefined'){
          console.log("Using web3 detected from external source like Metamask")
          this.web3 = new Web3(web3.currentProvider)
        }else{
          this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }


        this.ethervote = null;
        this.state = {
            user_address: null,
            user_type : null,
            owner: false,
            ethervote_address: null,
            organitzation_name: null,
            deployed: null,
        };
    }
     componentDidMount() {
       var that = this;
       this.web3.eth.getAccounts((error, accounts) => {
           if (error) {
               console.log(error)
           } else {
             var user_account = accounts[0];

             fetch('/get_ethervote')
               .then(res => res.json())
                  .then ((data) => {
                    console.log("Comp. Didmount deployed? ");
                    console.log(data.deployed);
                    this.setState({ deployed: data.deployed });
                    this.setState({ ethervote_address: data.ethervote_address });
                    this.setState({ organitzation_name: data.organitzation_name });

                    const ethervoteInstance = new that.web3.eth.Contract(ethervote_source.abi, data.ethervote_address);
                    //ethervoteInstance.methods.getPrivilege(user_account).call().then(console.log);

                  }
                );
             this.setState({ user_address: user_account });
           }
       });


     }


    render() {
      console.log("render:");
      console.log(this.state.deployed);

        if(this.state.deployed === null) return (<div><img className="loading" src={loading} alt="loading"/></div>);
        if (this.state.deployed == true) {
            if(this.state.user_type === "owner") {return <Admin web3={this.web3} ethervote={this.ethervote}/>;}
            else if(this.state.user_type === 2) {return <User2 web3={this.web3} ethervote={this.ethervote}/>;}
            else if(this.state.user_type === 1) {return <User web3={this.web3} ethervote={this.ethervote}/>;}
            else {return (<div><h1>usuari invalid</h1></div>);}
        } else {
            return <Firstlogin web3={this.web3}/>;
        }
    }
}

export default Ethervote;
