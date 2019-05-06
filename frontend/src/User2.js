import React, { Component } from 'react';
import {ListGroup,ListGroupItem,Container,Button} from 'reactstrap';
import {Glyphicon,Row,Col} from 'react-bootstrap';
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
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={6}>

                            <h3> CREATE POLL </h3>
                            <p id="create-explanation"> Create a poll and add the public key of the users that will
                                have access to it.  </p>
                            <Button color="primary" className="createPoll" href="/createPoll" > Create poll </Button>
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

                <div>
                    <Button color="danger" className="back" href="/admin" > Back </Button>
                </div>

            </div>
        );
    }
}

export default User2;
