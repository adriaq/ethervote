import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import './styles/App.css';


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
        <div>
            <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"> Welcome UserName! </a>
                        </div>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#"> Help </a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="col-lg-6">

                    <h3> OPEN POLLS </h3>

                    <ListGroup>
                        <ListGroupItem tag="button" active  onClick={this.votation}> APRETAR EN AQUEST BOTO</ListGroupItem>
                        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                        <ListGroupItem>Morbi leo risus</ListGroupItem>
                        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                </div>

                <div class="col-lg-6">
                    <h3> RESULTS </h3>
                    <ListGroup>
                        <ListGroupItem >Cras justo odio</ListGroupItem>
                        <ListGroupItem tag="button" active  onClick={this.votation} > CONSULTAR RESULT</ListGroupItem>
                        <ListGroupItem>Morbi leo risus</ListGroupItem>
                        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                </div>

            <div class="center">
                <Button color="danger" onClick={this.back}> Back </Button>
            </div>


    </div>
);
}
}

export default App;
