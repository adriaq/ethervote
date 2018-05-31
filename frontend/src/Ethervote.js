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
const loading = require('./img/loading.gif');

/*
fetch('/is_deployed')
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
        });

 */


class Ethervote extends Component {
    constructor(props) {
        super(props);
        var web3;
        if(typeof web3 !== 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider)
        }else{
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
        //this.ethervote_address = '';
        //this.organitzation_name= '';
        this.ethervote = null;
        this.state = {
            user_type : null,
            ethervote_address: '',
            organitzation_name: '',
            deployed: null,
        };
    }
    async componentDidMount() {
        fetch('/is_deployed')
        .then(res => res.json())
        .then(async (deployed_status) => {
            if(deployed_status.deployed === false) {
                await this.setState({ deployed: false });

            } else {
                await this.setState({ deployed: deployed_status.deployed });
                this.setState({ ethervote_address: deployed_status.ethervote_address });
                this.setState({ deployed: deployed_status.organitzation_name });
            }
        }
        );

    /*
      fetch('/is_deployed', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "organitzation_name": this.state.organitzation_name,
              "ethervote_address": tmp_ethervote.address,
              "deployed": 1
          })
      })*/
    }
    getEthervote = (ethervote_firstlogin) => {
      Ethervote.ethervote = ethervote_firstlogin;
      this.setState({ deployed: true });
      console.log("CALLBACK FUNCIONA")
      console.log(Ethervote.ethervote);
      this.forceUpdate()
    };


    render() {
        if(this.state.deployed === null) return (<div><img className="loading" src={loading} alt="loading"/></div>);
        if (this.state.deployed) {
            return <User web3={this.web3} ethervote={this.ethervote}/>
        } else {
            return <Firstlogin web3={this.web3} getEthervote={this.getEthervote}/>
        }
    }
}

export default Ethervote;
