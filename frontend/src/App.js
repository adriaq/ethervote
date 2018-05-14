import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import construction from './img/contruction.gif';
import './styles/App.css';
import Header from "./objects/Header";

function alertClicked(i) {
    alert(i);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        votations: [],
        closeVotations: []
        };
    }



   /* componentDidMount () {
       fetch('/votations')
           .then(res => res.json())
           .then(votations => this.setState({ votations }));

        fetch('/votation/:userId/openVotes')
            .then(res => {return res.json()})
            .then(closeVotations => this.setState({ closeVotations }));
    }*/


    back = (event) => {
        this.props.history.push('/login');
    };

    votation = (event) => {
        this.props.history.push('/openVotation');
    };

    mostra = (event) => {
        this.props.history.push('/votationResult');
    };

    /*<ListGroup className = "Menu">
        {this.state.votations.map( v =>
            <ListGroupItem className = "llista"
                           onClick={() => alertClicked()} href ="#" key={v.id}>{v.name}
            </ListGroupItem>)}
    </ListGroup>*/

    /* <ListGroup className = "Menu">
        {this.state.closeVotations.map( v =>
            <ListGroupItem className = "llista"
                           onClick={() => alertClicked()} href ="#" key={v.id}>{v.name}
            </ListGroupItem>)}
    </ListGroup> */

  render() {

    return (


            <Row className="App">
                <Header/>
                <body className="App-body">
                <p className="App-intro">
                    Pàgina en construcció
                    <img src={construction} className="App-logo" alt="construction"/>
                </p>
                <table className="taula">

                    <thead>
                    <tr>
                        <th>OPEN VOTATIONS</th>
                        <th>RESULTS</th>
                    </tr>
                    </thead>

                    <tr>
                        <td>
                            <ListGroup>
                                <ListGroupItem tag="button" active  onClick={this.votation}> APRETAR EN AQUEST BOTO</ListGroupItem>
                                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                                <ListGroupItem>Morbi leo risus</ListGroupItem>
                                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            </ListGroup>
                        </td>

                        <td>
                            <ListGroup>
                                <ListGroupItem onClick={this.mostra}  >Cras justo odio</ListGroupItem>
                                <ListGroupItem tag="button" active  onClick={this.resultt} > CONSULTAR RESULT</ListGroupItem>
                                <ListGroupItem>Morbi leo risus</ListGroupItem>
                                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            </ListGroup>
                        </td>
                    </tr>
                </table>


                <Button color="danger" onClick={this.back}> Back </Button>
                </body>
            </Row>
    );
  }
}

export default App;
