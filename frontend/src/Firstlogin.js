import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Row} from 'reactstrap';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Firstlogin.css';
import Admin from "./Admin";
import swal from 'sweetalert';

const ethervote_source = require('./contracts/ethervote.json');
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
            existing_ethervote_address: null,
            default_voting_time: 3600
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.connect_to_ethervote = this.connect_to_ethervote.bind(this);
        this.onSubmitNew = this.onSubmitNew.bind(this);
    }

    handleNameChange(event) {
        event.preventDefault();
        this.setState({organitzation_name: event.target.value});
    }

    handleTimeChange(event) {
        event.preventDefault();
        this.setState({default_voting_time: event.target.value});
    }

    handleAddressChange(event) {
        event.preventDefault();
        this.setState({existing_ethervote_address: event.target.value});
    }

    async connect_to_ethervote() {
        if (!this.web3.utils.isAddress(this.state.existing_ethervote_address)) {
            swal({
                title: "Alert!",
                text: "You must enter a valid address.",
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else {
            let myEthervoteInstance = this.web3.eth.Contract(ethervote_source.abi, this.state.existing_ethervote_address);
            //let myEthervoteInstance = tmp_ethervote.at(this.state.existing_ethervote_address);

            await fetch('/post_ethervote', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // NOM ORGANITZACIÓ SI JA EXISTEIX EL CONTRACTE?????
                    "organitzation_name": "check",
                    "ethervote_address": myEthervoteInstance.address,
                    "deployed": true
                })
            });
        }
    }


    async onSubmitNew(event) {
        event.preventDefault();
        //console.log((typeof(this.state.default_voting_time) === "number"));
        if (isNaN(this.state.default_voting_time)) {
            swal({
                title: "Error!",
                text: "Default voting time must be a valid number.",
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else if (this.state.organitzation_name === null) {
            swal({
                title: "Error!",
                text: "You must give a organization name!",
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else {
            let ethervoteContract = new this.props.web3.eth.Contract(ethervote_source.abi);
            await ethervoteContract
                .deploy({
                    data: ethervote_source.bytecode,
                    arguments: [this.state.organitzation_name, this.state.default_voting_time]})
                .send({
                    from: this.state.user_address
                }).on('error', (error) => {
                    swal({
                        title: "Error!",
                        text: error,
                        icon: "warning",
                        button: {
                            text: "Understood!",
                            className: "botosweet"
                        }
                    });
                }).on('transactionHash', (transactionHash) => {
                    console.log("transaction hash: " + transactionHash);
                }).on('receipt', (receipt) => {
                    console.log("new contract address: " + receipt.contractAddress); // contains the new contract address
                }).on('confirmation', (confirmationNumber, receipt) => {
                    //guardem l'adreça al estat
                    this.setState({ethervoteAddress: receipt.contractAddress});

                    //i al servidor
                    fetch('/post_ethervote', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "organitzation_name": this.state.organitzation_name,
                            "ethervote_address": receipt.contractAddress,
                            "deployed": true
                        })
                    });
                }).then((newContractInstance) => {
                    //hauria d'entrar aqui..
                    console.log(newContractInstance.options.address) // instance with the new contract address
                    ReactDOM.render(<Admin web3={this.web3} ethervoteAddres={this.state.ethervoteAddress}/>, document.getElementById('root'));
                });
            //  console.log(instance);
        }
    }

    async componentDidMount() {
        //console.log("carrega");
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                swal({
                    title: "Error!",
                    text: error,
                    icon: "warning",
                    button: {
                        text: "Understood!",
                        className: "botosweet"
                    }
                });
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
                                    Default voting time:
                                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleTimeChange} placeholder="3600" />
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
