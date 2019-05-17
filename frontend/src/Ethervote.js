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

        this.state = {
            ethervote: null,
            user_address: null,
            owner: false,
            privilege: -1,
            ethervote_address: null,
            organitzation_name: null,
            deployed: null,
        };
    }
    componentDidMount() {
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                var user_account = accounts[0];
                this.setState({ user_address: user_account });

                fetch('/get_ethervote')
                    .then(res => res.json())
                    .then ((data) => {
                        this.setState({ deployed: data.deployed });
                        this.setState({ ethervote_address: data.ethervote_address });
                        this.setState({ organitzation_name: data.organitzation_name });

                        if(data.deployed) {
                            const ethervoteInstance = new this.web3.eth.Contract(ethervote_source.abi, data.ethervote_address);
                            this.setState({ ethervote: ethervoteInstance });

                            ethervoteInstance.methods.getPrivilege(user_account).call({from: this.state.user_address}).then(privilege_result => {
                                this.setState({privilege: privilege_result.toString()});
                            });

                            ethervoteInstance.methods.owner.call({from: this.state.user_address}).then(owner_address => {
                                if(user_account == owner_address) {this.setState({ owner: true })}
                                else {this.setState({ owner: false })}

                            });
                          }


                    });
            }
        });


    }


    render() {
        if(this.state.deployed === null) return (<div><img className="loading" src={loading} alt="loading"/></div>);
        if (this.state.deployed === true) {
            if(this.state.owner) {return <User2 web3={this.web3} ethervoteAddress={this.state.ethervote_address}/>;}
            else if(this.state.privilege === 2) {return <User2 web3={this.web3} ethervoteAddress={this.state.ethervote_address}/>;}
            else if(this.state.privilege === 1) {return <User web3={this.web3} ethervoteAddress={this.state.ethervote_address}/>;}
            else {return (<div><h1>usuari invalid</h1></div>);}
        } else {
            return <Firstlogin web3={this.web3}/>;
        }
    }
}

export default Ethervote;
