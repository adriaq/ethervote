import React, { Component } from 'react';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AddUser.css'
import img_user from './img/add-user-2-128.gif';
import Header from "./components/Header";
import Footer from "./components/Footer";
import swal from "sweetalert";

const ethervote_source = require('./contracts/ethervote.json');

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        this.state = {
            userPK: null,
            privilegeLevel: '0',
        };
        this.updateInputValueUser = this.updateInputValueUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitbtn = this.submitbtn.bind(this);
    }

    updateInputValueUser(event) {
        event.preventDefault();
        this.setState({
            userPK: event.target.value
        });
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({privilegeLevel: event.target.value});
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
        if (this.state.userPK === null) {
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
            console.log("HOLAAAAAAAAA: " + this.state.user_address);
            console.log("contract adress: " + this.ethervoteAddress);
            this.ethervote.methods.getNumberOfProposals().call({from: this.state.user_address}).then(n => {
                console.log("number of proposals: " + n);
            });
            this.ethervote.methods.addVoter(this.state.userPK, this.state.privilegeLevel).call()
                .then((result, error) => {
                    if(!error) {
                        console.log(result);
                        swal({
                            title: "Info",
                            text: "Voter added to poll!",
                            icon: "info",
                            button: {
                                text: "Great!",
                                className: "botosweet"
                            }
                        });
                    }
                    else {
                        alert("Error adding voter");
                        swal({
                            title: "Error!",
                            text: "Error adding voter to poll.",
                            icon: "warning",
                            button: {
                                text: "Understood!",
                                className: "botosweet"
                            }
                        });
                    }
                });
        }
    }

    async componentDidMount() {
        //console.log("carrega");
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
                        <img src={img_user} alt="user"/>
                    </div>

                    <div className="col-lg-9">
                        <div className="input">
                            <div>
                                <p> USER PUBLIC KEY </p>
                                <input value={this.state.inputValueUser} onChange={evt => this.updateInputValueUser(evt)}
                                />

                                <div className="col-lg-8">
                                    <p> PRIVILEGE LEVEL: </p>
                                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange} >
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>

                                <div className="ei">
                                    <Button className="submit-btn" color="primary" onClick={this.submitbtn}>Add user</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <Button  color="danger" href="/"> Back </Button>
                </div>
                <br/>
                <Footer/>
            </div>
        );
    }

}

export default AddUser;
