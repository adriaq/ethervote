import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import {getOpenedPolls, getClosedPolls} from "./web3Functions"

class User2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        votations: [],
        closeVotations: []
        };
    }

   /* componentDidMount() {
        this.state.votations = getOpenedPolls();
        this.state.closeVotations = getClosedPolls();
    }*/


    render() {

        return (
            <div>
                <Header/>

                <div className="row">
                    <div className="col-lg-10">
                        <h3> CREATE POLL </h3>
                        <p id="create-explanation"> Create a poll and add the public key of the users that will
                            have access to it.  </p>
                        <Button color="primary" className="createPoll" href="/createPoll" > Create poll </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">

                        <h3> OPEN POLLS </h3>

                        <ListGroup>
                            {this.state.votations.map( v =>
                                <ListGroupItem tag="a" key={v.id}>
                                    {v.name} <a href={"/openPolls?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                                </ListGroupItem>)}
                        </ListGroup>
                    </div>

                    <div className="col-lg-6">
                        <h3> RESULTS </h3>
                        <ListGroup>
                            <ListGroup>
                                {this.state.closeVotations.map(v =>
                                    <ListGroupItem tag="a" key={v.id}>
                                        {v.name} <a href={"/pollsResult?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                                    </ListGroupItem>)}
                            </ListGroup>
                        </ListGroup>
                    </div>
                </div>

                <div>
                    <Button color="danger" className="back" href="/admin" > Back </Button>
                </div>


            </div>
        );
    }
}

export default User2;
