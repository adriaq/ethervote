import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ListGroup,ListGroupItem,Container,Button} from 'reactstrap';
import {Glyphicon,Row,Col} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import CreatePoll from "./CreatePoll";
const ethervote_source = require('./contracts/ethervote.json');

class User2 extends Component {
    constructor(props) {
        super(props);
        this.web3 = this.props.web3;
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.ethervote = null;
        this.state = {
            votations: [],
            closeVotations: []
        };
        //debugger;
        this.goToNewPoll = this.goToNewPoll.bind(this);
    }

    componentDidMount() {
        this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                console.log(accounts);
                console.log(accounts[0]);
                let user_account = accounts[0];
                this.setState({ user_address: user_account });

                console.log(this.ethervote);
                this.ethervote.methods.getNumberOfProposals().call({from: this.state.user_address}).then(raw_n_proposals => {
                    let n_proposals = raw_n_proposals.toString(); //variable que conte el numero de proposals
                    console.log(n_proposals);

                });
            }
        });
     }

    goToNewPoll() {
       // debugger
        //console.log(this.web3);
        //console.log('eps');
        ReactDOM.render(<CreatePoll web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    render() {

        return (
            <div>
                <Header/>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={6}>

                            <h3> CREATE POLL </h3>
                            <p id="create-explanation"> Create a poll and add the public key of the users that will
                                have access to it.  </p>
                            <Button color="primary" className="createPoll" onClick={this.goToNewPoll} > Create poll </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={6}>

                            <h3> OPEN POLLS </h3>

                            <ListGroup>
                                {this.state.votations.map( v =>
                                    <ListGroupItem tag="a" key={v.id}>
                                        {v.name} <a href={"/openPolls?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                                    </ListGroupItem>)}
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={6}>
                            <h3> RESULTS </h3>
                            <ListGroup>
                                <ListGroup>
                                    {this.state.closeVotations.map(v =>
                                        <ListGroupItem tag="a" key={v.id}>
                                            {v.name} <a href={"/pollsResult?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                                        </ListGroupItem>)}
                                </ListGroup>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>

            </div>


        );
    }
}

export default User2;
