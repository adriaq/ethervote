import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from "./components/Header";
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText, Col} from 'reactstrap';
import './styles/OpenVotation.css';


class VotationResults extends Component {

    back = (event) => {
        this.props.history.push('/app');
    };

    render() {
        return (
            <div>

                <Header/>

                <Col>
                    <ListGroup className="votations">


                        <ListGroupItem tag="button">
                            <ListGroupItemHeading>ADRIA!!!!!!!!!!!!!!!!</ListGroupItemHeading>
                            <ListGroupItemText>
                                Expliacio de la campanya de l'adria per ser el boss.
                            </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem tag="button" >
                            <ListGroupItemHeading>ALBAAAAAAAA</ListGroupItemHeading>
                            <ListGroupItemText>
                                Expliacio de la campanya de l'ALBA per ser el boss.
                            </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem tag="button">
                            <ListGroupItemHeading> Mar </ListGroupItemHeading>
                            <ListGroupItemText>
                                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                            </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem tag="button" active>
                            <ListGroupItemHeading> Xavi </ListGroupItemHeading>
                            <ListGroupItemText>
                                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                            </ListGroupItemText>
                        </ListGroupItem>

                        <ListGroupItem tag="button">
                            <ListGroupItemHeading> Jorge </ListGroupItemHeading>
                            <ListGroupItemText>
                                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
                            </ListGroupItemText>
                        </ListGroupItem>

                    </ListGroup>
                </Col>


                <Button className="enrere" color="danger" href="/user"  > Back </Button>

            </div>

        );
    }



}

export default VotationResults;