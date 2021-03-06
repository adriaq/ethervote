import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ListGroup,ListGroupItem,Container,Button} from 'reactstrap';
import {Glyphicon,Row,Col} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePoll from "./CreatePoll";
import OpenPoll from "./OpenPoll";
const ethervote_source = require('./contracts/ethervote.json');

class User2 extends Component {
    constructor(props) {
        super(props);
        this.web3 = this.props.web3;
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.ethervote = null;
        this.state = {
            votations: [],
            closedVotations: []
        };
        //debugger;
        this.goToNewPoll = this.goToNewPoll.bind(this);
        this.goOpenPoll = this.goOpenPoll.bind(this);
    }

    async componentDidMount() {

        this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
        this.web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                console.log(accounts);
                console.log(accounts[0]);
                let user_account = accounts[0];
                this.setState({ user_address: user_account });

                console.log(this.ethervote);
                this.ethervote.methods.getNumberOfProposals().call({from: this.state.user_address}).then(async raw_n_proposals => {
                    let n_proposals = raw_n_proposals.toString(); //variable que conte el numero de proposals
                    console.log('proposals');
                    console.log(n_proposals);

                    let proposals = [];
                    let finishedProposals = [];

                    for (let i = 1; i <= n_proposals; ++i) {
                        let prop = new Object();
                        prop.id = i;

                        await this.ethervote.methods.getProposalName(i).call({
                            from: this.state.user_address
                        }).then(nom => {
                            prop.name = nom;
                        });

                        await this.ethervote.methods.getProposalDescription(i).call({
                            from: this.state.user_address
                        }).then(des => {
                            prop.description = des;
                        });

                        await this.ethervote.methods.hasEnded(i).call({
                            from: this.state.user_address
                        }).then(ended => {
                            if (ended) {
                                finishedProposals.push(prop);
                            }
                            else {
                                proposals.push(prop);
                            }
                        });
                    }

                    this.setState({
                        votations: proposals,
                        closedVotations: finishedProposals
                    });

                });


            }
        });
     }

    goToNewPoll() {
        ReactDOM.render(<CreatePoll web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    goOpenPoll(id) {
        ReactDOM.render(<OpenPoll web3={this.web3} ethervoteAddress={this.ethervoteAddress} id={id}/>, document.getElementById('root'));
    }

    render() {

        return (
            <div >
                <Header/>

                <div className="container">
                    <Row className="DP">
                        <div className="col-lg-6">

                            <h3> OPEN POLLS </h3>

                            <ListGroup>
                                {this.state.votations.map( p =>
                                    <ListGroupItem className="LGI" tag="a" onClick={(e) => this.goOpenPoll(p.id)} key={p.name}>
                                        {p.name}
                                    </ListGroupItem>)}
                            </ListGroup>
                        </div>
                    </Row>

                    <Row className={"DP"}>
                        <div className="col-lg-6">
                            <h3> RESULTS </h3>
                            {this.state.closedVotations.map( p =>
                                <ListGroupItem className="LGI2" tag="a" onClick={(e) => this.goToResults(p.id, e)} key={p.name} >
                                    {p.name}
                                </ListGroupItem>)}
                        </div>
                    </Row>

                </div>
                <Button color="primary" className="createPoll" onClick={this.goToNewPoll} > Create poll </Button>
                <Button className="btn btn-primary back-btn"  onClick={this.goToEth} > Back </Button>
                <div>
                    <Footer/>
                </div>
            </div>


        );
    }
}

export default User2;
