import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import img_user from './img/delete-user-2-128.gif';
import Header from "./components/Header";
import Footer from "./components/Footer";
import swal from "sweetalert";
import Ethervote from "./Ethervote";
import ReactDOM from 'react-dom';

const ethervote_source = require('./contracts/ethervote.json');

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        this.state = {
            userPK: null
        };
        this.updateInputValueUser = this.updateInputValueUser.bind(this);
        this.submitbtn = this.submitbtn.bind(this);
    }

    updateInputValueUser(event) {
        event.preventDefault();
        this.setState({
            userPK: event.target.value
        });
    }

    goToEth() {
        ReactDOM.render(<Ethervote web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    submitbtn() {
        /*
        - function addVoter(address _voter, int _privilege) onlyOwner public {
        - function getPrivilege(address _voter) public view returns (int){
        - function changePrivilege(address _voter, int _privilege) onlyOwner public {
        - function deleteVoter(address _voter) onlyOwner public {
        - function getNumberOfVoters() public view returns (int){
        - function newProposal(string _name, string _description, uint _votingTime, address _creator) canCreate(_creator) public returns(bool succes) {
        - function addOption(int _proposalID, string _name, string _description) public onlyOwner onlyCreator(_proposalID) returns(bool)  {
        - function getNumberOfOptions(int _proposalID) public view returns(int) {
        - function getNumberOfVotes(int _proposalID, int _n_option) public view returns(int){
        - function getOptionName(int _proposalID, int _n_option) public view returns(string) {
        - function hasEnded(int _proposalID) public view returns(bool) {
        - function getNumberOfProposals() public view returns (int) {
        - function vote(int _proposalID, int _option) public canVote(msg.sender) returns(bool){
        - function hasVoted(address _voter, int _proposalID) public view canVote(_voter) returns(bool)
         */
        if (!this.web3.utils.isAddress(this.state.userPK)) {
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
            this.ethervote.methods.getNumberOfVoters().call({from: this.state.user_address}).then(n => {
                console.log("number of voters before: " + n);
            });

            this.ethervote.methods.deleteVoter(this.state.userPK).send({
                from: this.state.user_address
            }).on('transactionHash', (hash) => {
                console.log(hash);
            }).on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmation number: " + confirmationNumber);
                console.log("receipt: " + receipt);

                swal({
                    title: "Info",
                    text: "Voter deleted from your organization.",
                    icon: "info",
                    button: {
                        text: "Ok!",
                        className: "botosweet"
                    }
                });

                this.ethervote.methods.getNumberOfVoters().call({from: this.state.user_address}).then(n => {
                    console.log("number of voters: " + n);
                });

            }).on('error', (error) => { // If there's an out of gas error the second parameter is the receipt.
                swal({
                    title: "Error!",
                    text: error,
                    icon: "warning",
                    button: {
                        text: "Understood!",
                        className: "botosweet"
                    }
                });
            });
        }
    }

    async componentDidMount() {
        console.log(this.ethervoteAddress);
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                let user_account = accounts[0];
                this.setState({user_address: user_account});
                this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
            }
        });
    }

    render() {

        return(
            <div>
                <div>
                    <Header/>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <img className="usr-img-del" src={img_user} alt="user"/>
                    </div>

                    <div className="col-lg-9">
                        <div className="input">
                            <div>
                                <div className="col-lg-8">
                                    <p> PUBLIC KEY TO BE DELETED </p>
                                    <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}/>
                                </div>

                                <div className="ei">
                                    <Button className="submit-btn" color="primary" onClick={this.submitbtn}>Delete user</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <Button className="btn btn-primary back-btn"  onClick={this.goToEth} > Back </Button>
                </div>
                <br/>
                <Footer/>
            </div>
        );
    }
}

export default DeleteUser;
