import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Row} from 'reactstrap';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Firstlogin.css';
import Admin from "./Admin";

const ethervote_source = require('./contracts/ethervote.json')
const ethervoteimg = require('./img/logo.png');


class Firstlogin extends Component {
    constructor(props) {
        super(props);
        this.ethervote = null;
        this.web3 = this.props.web3;
        this.state = {
            ethervoteAddress: null,
            user_address: null,
            organitzation_name: null,
            existing_ethervote_address: null
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.connect_to_ethervote = this.connect_to_ethervote.bind(this);
        this.onSubmitNew = this.onSubmitNew.bind(this);
    }


    handleNameChange(event) {
        event.preventDefault();
        this.setState({organitzation_name: event.target.value});
    }


    handleAddressChange(event) {
        event.preventDefault();
        this.setState({existing_ethervote_address: event.target.value});
    }


    async connect_to_ethervote() {
        let tmp_ethervote = this.web3.eth.Contract(ethervote_source.abi);
        let myEthervoteInstance = tmp_ethervote.at(this.state.existing_ethervote_address);
        console.log(myEthervoteInstance);
        let ethervote_name = await myEthervoteInstance.name();

        await fetch('/post_ethervote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "organitzation_name": ethervote_name,
                "ethervote_address": myEthervoteInstance.address,
                "deployed": true
            })
        });
        this.props.getEthervote(myEthervoteInstance);
    }


    async onSubmitNew(event) {
        event.preventDefault();
        //console.log("adreça: " + this.state.user_address);

        /* let ethervoteContract = new this.props.web3.eth.Contract(ethervote_source.abi);
         const instanceEthervote = await ethervoteContract
             .deploy({
                 data: ethervote_source.bytecode,
                 arguments: [this.state.organitzation_name, 3600]})
             .send({ from: this.state.user_address });
         // HELP HERE, NO EXECUTA RE A PARTIR DAQUI
         //console.log("HOLAAAAAAAAAAAA");
         this.setState({ethervoteAddress: instanceEthervote.options.address});
         //alert("test");*/
        let ethervoteContract = new this.props.web3.eth.Contract(ethervote_source.abi);
        const instance = ethervoteContract
            .deploy({
                data: ethervote_source.bytecode,
                arguments: [this.state.organitzation_name, 3600]});
        //https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#deploy
        instance.send({
            from: this.state.user_address
        }, (error, transactionHash) => {
            console.log("ERROR: " + error);
        }).on('error', (error) => {
                console.log("error!:" + error);
            })
            .on('transactionHash', (transactionHash) => {
                console.log("transaction hash: " + transactionHash);
            })
            .on('receipt', (receipt) => {
                console.log("new contract address: " + receipt.contractAddress); // contains the new contract address
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log(confirmationNumber);
            })
            .then((newContractInstance) => {
                console.log(newContractInstance.options.address); // instance with the new contract address
                this.setState({ethervoteAddress: newContractInstance.options.address});
            });


        console.log("adhskf; " + ethervoteContract);
    }

    async componentDidMount() {
        //console.log("carrega");
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            } else {
                this.setState({ user_address: accounts[0] });
            }
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
                            <form onSubmit={this.onSubmitNew}>
                                <div className="form-group">
                                    <p className="join-text"> Join Ethervote </p>
                                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleNameChange} placeholder="Enter organization's name" />
                                </div>
                                <Button className="btn btn-primary register-btn"> Submit </Button>
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
