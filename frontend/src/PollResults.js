import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from "./components/Header";
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText, Col} from 'reactstrap';
import './styles/OpenPoll.css';
import Footer from "./components/Footer";

const ethervote_source = require('./contracts/ethervote.json');

function PollListGroupItem(props) {
    return (
        <ListGroupItem>
            <ListGroupItemHeading className="title"> {props.title} </ListGroupItemHeading>
            <ListGroupItemText className="description"> Description: {props.description} </ListGroupItemText>
            <ListGroupItemText className="votes"> Votes: {props.votes} </ListGroupItemText>
        </ListGroupItem>
    );
}

class PollResults extends Component {
    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        this.state = {
            id: this.props.id,
            user_address: null,
            name: null,
            description: null,
            options: [],
        };
    }

    async componentDidMount() {
        console.log("HOLAAAAAAAAAAA");
        this.web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.log(error);
            } else {
                let user_account = accounts[0];
                this.setState({user_address: user_account});
                this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
                /*
                function getProposalName(int id) public view returns(string) public
                function getProposalDescription(int id) public view returns(string) public
                function getNumberOfOptions(int _proposalID) public view returns(int)
                function getNumberOfVotes(int _proposalID, int _n_option) public view returns(int)
                function getOptionName(int _proposalID, int _n_option) public view returns(string)
                function getOptionDescription(int _proposalID, int _n_option) public view returns(string)
                 */
                console.log("holaaaa");

                await this.ethervote.methods.getProposalName(this.state.id).call({
                    from: this.state.user_address
                }).then(name => {
                    this.setState({ name: name});
                });

                await this.ethervote.methods.getProposalDescription(this.state.id).call({
                    from: this.state.user_address
                }).then(desc => {
                    this.setState({ description: desc });
                });

                await this.ethervote.methods.getNumberOfOptions(this.state.id).call({
                    from: this.state.user_address
                }).then(async n_options => {
                    let options = [];

                    for (let i = 1; i <= n_options; ++i) {
                        let op = new Object();

                        await this.ethervote.methods.getOptionName(this.state.id, i).call({
                            from: this.state.user_address
                        }).then(name => {
                            op.name = name;
                        });

                        await this.ethervote.methods.getOptionDescription(this.state.id, i).call({
                            from: this.state.user_address
                        }).then(desc => {
                            op.description = desc;
                        });

                        await this.ethervote.methods.getNumberOfVotes(this.state.id, i).call({
                            from: this.state.user_address
                        }).then(votes => {
                            op.votes = votes;
                        });

                        options.push(op);
                    }

                    this.setState({
                        options: options
                    });
                });

                console.log("results");
                console.log(this.state.results);
            }
        });
    }

    render() {
        return (
            <div>

                <Header/>
                <div>
                    <div className='titol'>
                        <h1>{this.state.name}</h1>
                        <h4>{this.state.description}</h4>
                    </div>

                    <Col>
                        <ListGroup className="votations">
                            {this.state.options.map( o =>
                                <PollListGroupItem title={o.name} description={o.description} votes={o.votes}/>)}
                        </ListGroup>
                    </Col>
                </div>

                <Footer/>

            </div>

        );
    }
}

export default PollResults;
/*

 */