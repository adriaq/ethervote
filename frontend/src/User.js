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


class User extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.state = {
            votations: [
                    {
                        "id":"0",
                        "name": "example glossary",
                        "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                        "num_opcions": "4",
                        "options": {
                            "name": "S",
                            "description": "meh",
                            "votes": "3",
                        }
                    },

                    {
                        "id":"1",
                        "name": "prova2",
                        "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                        "num_opcions": "4",
                        "options": {
                            "name": "S",
                            "description": "meh",
                            "votes": "3",
                        }
                    },


                {
                    "id":"4",
                    "name": "prova 3",
                    "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                    "num_opcions": "4",
                    "options": {
                        "name": "S",
                        "description": "meh",
                        "votes": "3",
                    }
                }


            ],

            closeVotations: [{
                "id":"0",
                "name": "example glossary",
                "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                "num_opcions": "4",
                "options": {
                    "name": "S",
                    "description": "meh",
                    "votes": "3",
                }
            },

                {
                    "id":"1",
                    "name": "prova2",
                    "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                    "num_opcions": "4",
                    "options": {
                        "name": "S",
                        "description": "meh",
                        "votes": "3",
                    }
                },


                {
                    "id":"4",
                    "name": "prova 3",
                    "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                    "num_opcions": "4",
                    "options": {
                        "name": "S",
                        "description": "meh",
                        "votes": "3",
                    }
                }],

            privilegeLevel: '',
        };

        this.goToOpenPoll = this.goToOpenPoll.bind(this);
        this.goToResults = this.goToResults.bind(this);

        //this.state.votations = getOpenedPolls();
        //this.state.closeVotations = getClosedPolls();
    }

    goToOpenPoll(pollId) {
        ReactDOM.render(<OpenPoll web3={this.web3} ethervote={this.ethervote} id={pollId}/>, document.getElementById('root'));
    }

    goToResults(pollId) {
        ReactDOM.render(<PollResults web3={this.web3} ethervote={this.ethervote} id={pollId}/>, document.getElementById('root'));
    }

    render() {

        return (

            <div >
                <Header/>

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
                        {this.state.closeVotations.map( p =>
                            <ListGroupItem className="LGI2" tag="a" onClick={(e) => this.goToResults(p.id, e)} key={p.name} >
                                {p.name}
                            </ListGroupItem>)}
                    </div>
                </Row>

                <div>
                    <Button color="danger" className="back"> Back </Button>
                </div>
                <Footer/>
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
