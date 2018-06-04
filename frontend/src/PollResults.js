import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from "./components/Header";
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText, Col} from 'reactstrap';
import './styles/OpenPoll.css';
import Footer from "./components/Footer";


function PollListGroupItem(props) {
    return (
        <ListGroupItem>
            <ListGroupItemHeading className="title"> {props.title} </ListGroupItemHeading>
            <ListGroupItemText className="description"> Votes: {props.description} </ListGroupItemText>
        </ListGroupItem>
    );
}

class PollResults extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.state = {
            id: this.props.id,
            resultats: [],
            votacio: [
                {
                    "id": "0",
                    "name": "example glossary",
                    "description": "Descripcio de el que votarem a continuacio",
                    "num_opcions": "4",
                    options: [
                        {
                            "name": "M. Rajoy",
                            "description": "Luis se fuerte",
                            "votes": "3",
                        },
                        {
                            "name": "G. Rufian",
                            "description": "Soc una mica demagog",
                            "votes": "3",
                        },
                        {
                            "name": "A. Rivera",
                            "description": "Ibex 35",
                            "votes": "3",
                        }],
                }],
        };


        //de moment hi he posat aquesta xq em falten
        //this.state.options = getPoll(this.state.id);

        this.state.votacio.map( o => {this.state.resultats = o.options });
    }


    render() {
        return (
            <div>

                <Header/>

                <p className="text"> Resultat de la votació tal </p>

                <Col>
                    <ListGroup className="votations">

                        {this.state.resultats.map( o =>
                            <PollListGroupItem title={o.name} description={o.votes}/>)}

                    </ListGroup>
                </Col>

                <Footer/>

            </div>

        );
    }
}

export default PollResults;