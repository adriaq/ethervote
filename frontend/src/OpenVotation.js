import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText} from 'reactstrap';
import './styles/OpenVotation.css';



class OpenVotation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    back = (event) => {
        this.props.history.push('/app');
    };

    render() {

        return (

            <div className="global">
                <header className="votation-header" >
                    <h1>VOTATION FOR THE NEW BOSS</h1>
                </header>

                <div >

                    <p className="text"> Lorem ipsum dolor sit amet consectetur adipiscing elit velit, curabitur euismod tempus placerat magnis bibendum eros
                        varius cum, purus odio porttitor congue rhoncus viverra diam. Lacus class montes cursus viverra tortor mauris
                        accumsan fermentum parturient, potenti quisque eget eu metus neque tristique molestie, semper tellus mus integer
                        imperdiet odio dis commodo. A integer semper natoque proin per praesent neque nam dignissim litora ad, pretium iaculis dis
                        cubilia erat feugiat phasellus imperdiet ridiculus auctor, rhoncus tincidunt ligula eleifend quam mattis conubia aliquam
                        scelerisque ante.
                    </p>

                    <Col>
                        <ListGroup className="votations">


                            <ListGroupItem tag="button">
                                <ListGroupItemHeading>ADRIA!!!!!!!!!!!!!!!!</ListGroupItemHeading>
                                <ListGroupItemText>
                                    Expliacio de la campanya de l'adria per ser el boss.
                                </ListGroupItemText>
                            </ListGroupItem>

                            <ListGroupItem tag="button">
                                <ListGroupItemHeading>ALBAAAAAAAA</ListGroupItemHeading>
                                <ListGroupItemText>
                                    Expliacio de la campanya de l'ALBA per ser el boss.
                                </ListGroupItemText>
                            </ListGroupItem>

                            <ListGroupItem tag="button">
                                <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                                <ListGroupItemText>
                                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                                </ListGroupItemText>
                            </ListGroupItem>

                            <ListGroupItem tag="button">
                                <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                                <ListGroupItemText>
                                    Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                                </ListGroupItemText>
                            </ListGroupItem>


                        </ListGroup>
                    </Col>

                    <div className="opcions">
                        <Button className="votar" color="success" onClick={this.vote}> VOTE </Button>
                        <Button className="enrere" color="danger" onClick={this.back}> Back </Button>
                    </div>
                </div>

            </div>
        );
    }

}

export default OpenVotation;