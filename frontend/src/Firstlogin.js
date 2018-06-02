import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Row} from 'reactstrap';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Firstlogin.css';
import Admin from "./Admin";

const ethervote_source = require('./contracts/ethervote.json')
const ethervoteimg = require('./img/logo_prueba.png');


class Firstlogin extends Component {
    constructor(props) {
        super(props);
        this.ethervote = null;
        this.web3 = this.props.web3;
        this.state = {
            organitzation_name: null,
            existing_ethervote_address: null
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.connect_to_ethervote = this.connect_to_ethervote.bind(this);
        this.deploy_ethervote =  this.deploy_ethervote.bind(this);
    }


    handleNameChange(event) {
        event.preventDefault();
        this.setState({organitzation_name: event.target.value});
    }


    handleAddressChange(event) {
        event.preventDefault();
        this.setState({existing_ethervote_address: event.target.value});
    }


    connect_to_ethervote() {
        this.ethervote = this.web3.eth.contract(ethervote_source.abi);
        //this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.state.existing_ethervote_address);
        this.ethervote.at('0x01');
        console.log(this.ethervote.address);
        //console.log(this.ethervote.address);

        ReactDOM.render(<Admin web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
    }


    async deploy_ethervote() {
        console.log(this.web3);
        let tmp_ethervote       = this.web3.eth.contract(ethervote_source.abi);
        let myEthervoteInstance = tmp_ethervote.new(
            [this.state.organitzation_name, 3600]
            ,{
                from: this.web3.eth.accounts[0],
                data: ethervote_source.bytecode,
                gas: 4700000
            }, (e, tmp_ethervote) => {
                if (typeof (tmp_ethervote.address) !== 'undefined') {
                    this.props.getEthervote(tmp_ethervote);
                    console.log('Contract mined! address: ' + tmp_ethervote.address + ' transactionHash: ' + tmp_ethervote.transactionHash);
                }
            }
        );

        this.ethervote = myEthervoteInstance;

        //Ara fariem el fetch per guardar l'adreça i el bool deployed a true;
        await fetch('/connect_ethervote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "organitzation_name": this.state.organitzation_name,
                "ethervote_address": tmp_ethervote.address,
                "deployed": true
            })
        });

        //ReactDOM.render(<Admin web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
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
                                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleNameChange} placeholder="Enter organization's name" />
                                </div>
                                <Button className="btn btn-primary connect-btn" onClick={this.deploy_ethervote}> Submit </Button>
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
                                    <Button className="btn btn-primary connect-btn" color="primary" onClick={this.connect_to_ethervote}>
                                        Connect
                                    </Button>
                            </form>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Firstlogin;
