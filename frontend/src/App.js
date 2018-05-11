import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import construction from './img/contruction.gif';
import './styles/App.css';
import Header from "./objects/Header";
import MenuVotacions from "./objects/MenuVotacions";

function alertClicked(i) {
    alert(i);
}

class App extends Component {
    state = {votations: []};

    componentDidMount () {
        fetch('/votations')
            .then(res => res.json())
            .then(votations => this.setState({ votations }));
    }


    back = (event) => {
        this.props.history.push('/login');
    };


  render() {

    return (


            <div className="App">
                <Header/>
                <body className="App-body">
                <p className="App-intro">
                    Pàgina en construcció
                    <img src={construction} className="App-logo" alt="construction"/>
                </p>
                <Row className="ListGroupChart">
                    <Col>
                        <ListGroup className = "Menu">
                            {this.state.votations.map( v =>
                                <ListGroupItem className = "llista"
                                               onClick={() => alertClicked()} href ="#" key={v.id}>{v.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>


                    <Col>
                        <ListGroup className = "Menu">
                            {this.state.votations.map( v =>
                                <ListGroupItem className = "llista"
                                               onClick={() => alertClicked()} href ="#" key={v.id}>{v.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>
                </Row>

                <Button color="danger" onClick={this.back}> Back </Button>
                </body>
            </div>
    );
  }
}

export default App;
