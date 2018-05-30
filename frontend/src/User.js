import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup, Row} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import {getOpenedPolls, getClosedPolls} from "./web3Functions";


class User extends Component {
    constructor(props) {
        super(props);
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
                    "id":"3",
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
            closeVotations: [],
            privilegeLevel: '',
        };

        //this.state.votations = getOpenedPolls();
        //this.state.closeVotations = getClosedPolls();
    }

  /*  componentDidMount() {
        this.state.votations = getOpenedPolls();
        this.state.closeVotations = getClosedPolls();
    }*/

    render() {

        return (

            <div >
                <Header/>

                <Row  className="DP">
                    <div className="col-lg-6">

                        <h3> OPEN POLLS </h3>

                        <ListGroup>
                            {this.state.votations.map( p =>
                                <ListGroupItem className="LGI" tag="a" key={p.name}  href={"/OpenPoll?"+ p.id}>
                                    {p.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </div>

                    <div className="col-lg-6">
                        <h3> RESULTS </h3>
                        {this.state.closeVotations.map( p =>

                            <ListGroupItem tag="a" key={p.name} href={"/User?"+ p.id}>
                                {p.name}
                            </ListGroupItem>)}
                    </div>
                </Row>

                <div>
                    <Button color="danger" className="back" href="/admin" > Back </Button>
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