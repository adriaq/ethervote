import React, {Component} from 'react';
import {Row} from 'reactstrap';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Firstlogin.css';
import web3 from './Ethervote'
const ethervote_source = require('./contracts/ethervote.json')
const ethervoteimg = require('./img/logo_prueba.png');

class Firstlogin extends Component {
    constructor(props) {
    super(props);
    this.state = {
        existing_ethervote_address: '',
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.connect_to_ethervote = this.connect_to_ethervote.bind(this);
    this.deploy_ethervote =  this.deploy_ethervote.bind(this);
    }

    handleNameChange(event) {
      this.setState({existing_ethervote_address: event.target.value});
    }
    handleAddressChange(event) {
      this.setState({organitzation_name: event.target.value});
    }

    connect_to_ethervote() {
      console.log(localStorage.getItem('web3'));
     // let compiled = web3.eth.compile.solidity(ethervote_source);
      //let abi = compiled.ethervote.info.abiDefinition;
      console.log()
      //aqui el conect
    }
    deploy_ethervote() {
        //aqui es fara el deploy
        let compiled = web3.eth.compile.solidity(ethervote_source);
        let abi = compiled.ethervote.info.abiDefinition;
        var ethervote = web3.eth.contract(abi);
        ethervote.new({
         from: web3.eth.accounts[0],
         data: compiled,
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
        });
    }

    render() {

        return (

            <div className="global">
                <div>
                    <div>
                        <img className="ethervote-image" src={ethervoteimg} alt="logo"/>
                        <p className="blockchain-text"> A blockchain based voting system </p>
                    </div>

                    <Row>
                        <div className="col-lg-6 esquerra">
                            <form>
                                <div className="form-group">
                                    <p className="join-text"> Join Ethervote </p>
                                    <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter organization's name" value={this.state.value} onChange={this.handleNameChange}/>
                                </div>
                                <button className="btn btn-primary register-btn" onClick={this.deploy_ethervote}> Submit</button>
                            </form>
                        </div>

                        <div className="col-lg-6 dreta">
                            <form>
                                <div className="form-group">
                                    <p className="connect-text"> Or connect to an existing one </p>
                                    <div>
                                        <input type="text" className="form-control" value={this.state.value} onChange={this.handleAddressChange} placeholder="Organization's public address"/>
                                    </div>
                                </div>
                                <Button className="btn btn-primary connect-btn" color="primary" onClick={this.connect_to_ethervote} > Connect </Button>
                            </form>
                        </div>
                    </Row>
                </div>
            </div>
        );

    }
}

export default Firstlogin;
