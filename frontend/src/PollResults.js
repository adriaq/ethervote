import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from "./components/Header";
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText, Col} from 'reactstrap';
import './styles/OpenPoll.css';


function PollListGroupItem(props) {
    return (
        <ListGroupItem>
            <ListGroupItemHeading className="title"> {props.title} </ListGroupItemHeading>
            <ListGroupItemText className="description"> {props.description} </ListGroupItemText>
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
            options: []
        };


        //de moment hi he posat aquesta xq em falten
        //this.state.options = getClosedPolls();
    }

    back = (event) => {
        this.props.history.push('/app');
    };

    render() {
        return (
            <div>

                <Header/>

                <p className="text"> Resultat de la votació tal </p>

                <Col>
                    <ListGroup className="votations">

                        {this.state.options.map( o =>
                            <PollListGroupItem title={o.title} description={o.description}/>)}

                    </ListGroup>
                </Col>

                <div className="opcions">
                    <Button className="enrere" color="danger" href="/user"  > Back </Button>
                </div>

            </div>

        );
    }
}

export default PollResults;