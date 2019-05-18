import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import {ListGroup, Row} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import './styles/User.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import OpenPoll from "./OpenPoll";
import PollResults from "./PollResults";
import Ethervote from "./Ethervote";

const ethervote_source = require('./contracts/ethervote.json');

class User extends Component {
    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        this.state = {
            user_address: null,
            votations: [],
            closedVotations: [],
        };

        this.goToOpenPoll = this.goToOpenPoll.bind(this);
        this.goToResults = this.goToResults.bind(this);

        //this.state.votations = getOpenedPolls();
        //this.state.closeVotations = getClosedPolls();
    }

    goToOpenPoll(pollId) {
        ReactDOM.render(<OpenPoll web3={this.web3} ethervoteAddress={this.ethervoteAddress} id={pollId}/>, document.getElementById('root'));
    }

    goToResults(pollId) {
        ReactDOM.render(<PollResults web3={this.web3} ethervoteAddress={this.ethervoteAddress} id={pollId}/>, document.getElementById('root'));
    }

    goToEth() {
        console.log(this.web3);
        ReactDOM.render(<Ethervote web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    async componentDidMount() {
        this.web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.log(error);
            } else {
                let user_account = accounts[0];
                this.setState({ user_address: user_account });
                this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);

                /*
                function getProposalName(int id) public view returns(string) public
                Retorna el nom de una proposal segons el ID

                function getProposalDescription(int id) public view returns(string) public
                Retorna la descriptio de una proposal segons el ID

                function getNumberOfProposals() public view returns (int)
                retorna el numero de proposals
                 */

                await this.ethervote.methods.getNumberOfProposals().call({
                    from: this.state.user_address
                }).then(async raw_n_proposals => {
                    let n_proposals = raw_n_proposals.toString(); //variable que conte el numero de proposals
                    console.log(n_proposals);
                    //aqui hauriem de construir les proposals i afegirles
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

                        this.ethervote.methods.hasEnded(i).call({
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
                                    <ListGroupItem className="LGI" tag="a" onClick={(e) => this.goToOpenPoll(p.id, e)} key={p.name}>
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
                <Button className="btn btn-primary back-btn"  onClick={this.goToEth} > Back </Button>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default User;

/*
OPEN
{this.state.closeVotations.map( v =>
    <ListGroupItem tag="a" key={v.id}>
        {v.name} <a href={"/pollsResult?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
    </ListGroupItem>)}

CLOSE
{this.state.votations.map( v =>
                            <ListGroupItem tag="a" key={v.id}>
                                {v.name} <a href={"/openPolls?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                            </ListGroupItem>)}


*/
