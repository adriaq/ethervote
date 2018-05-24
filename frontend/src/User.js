import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup, Row} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';
import './styles/User.css';
import Header from "./components/Header";
import {getOpenedPolls, getClosedPolls} from "./web3Functions"


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votations: [],
            closeVotations: [],
            privilegeLevel: '',
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

                <Row>
                    <div className="col-lg-6">

                        <h3> OPEN POLLS </h3>

                        <ListGroup>
                            <ListGroupItem> Grups FESTAFIB </ListGroupItem>
                            <ListGroupItem> Nom del meu gos </ListGroupItem>
                            <ListGroupItem> Antibiòtics més populars </ListGroupItem>
                            <ListGroupItem> Aprovarem PTI? </ListGroupItem>
                        </ListGroup>
                    </div>

                    <div className="col-lg-6">
                        <h3> RESULTS </h3>
                        <ListGroup>
                            <ListGroup>
                                <ListGroupItem> Canvi de material de la sala 238 </ListGroupItem>
                                <ListGroupItem> Activitats per nadal </ListGroupItem>
                                <ListGroupItem> Excursions fi de curs </ListGroupItem>
                            </ListGroup>
                        </ListGroup>
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