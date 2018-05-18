import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {Glyphicon, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import './styles/App.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        votations: [],
        closeVotations: [],
        privilegeLevel: '',
        };
    }



  componentDidMount () {
       fetch('/user/:publicKey/openedPolls')
           .then(res => res.json())
           .then(votations => this.setState({ votations }));

        fetch('/user/:publicKey/closedPolls')
            .then(res => {return res.json()})
            .then(closeVotations => this.setState({ closeVotations }));
    }




  render() {

    return (
        <div>
            <nav class="navbar navbar-expand-lg custom-navbar">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand"> Welcome to Ethervote! </a>
                    </div>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul class="nav navbar-nav">
                            <li><a href="/logout" className="logout"> Log out </a></li>
                        </ul>
                        <ul class="nav navbar-nav">
                            <ButtonToolbar>
                                <DropdownButton title="Help" pullRight id="dropdown-no-caret">
                                   <MenuItem eventKey="1">
                                        <p> You can see a list of the polls you have access to vote in the
                                            <br/> <i> Open polls </i> division </p>
                                    </MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey="2">
                                        <p> You can see a list of the polls in which you have participated
                                            <br/>  in the <i> Results </i> division </p>
                                    </MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="col-lg-6">

                <h3> OPEN POLLS </h3>

                <ListGroup>
                    {this.state.votations.map( v =>
                        <ListGroupItem tag="a" key={v.id}>
                            {v.name} <a href={"/openPolls" +"?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                        </ListGroupItem>)}
                </ListGroup>
            </div>

            <div class="col-lg-6">
                <h3> RESULTS </h3>
                <ListGroup>
                    <ListGroup>
                        {this.state.closeVotations.map( v =>
                            <ListGroupItem tag="a" key={v.id}>
                                {v.name} <a href={"/pollsResult"+"?"+ v.id}> <Glyphicon glyph="zoom-in" /> </a>
                            </ListGroupItem>)}
                    </ListGroup>
                </ListGroup>
            </div>

            <div>
                <Button color="danger" className="back" href="/admin" > Back </Button>
            </div>

    </div>
);
}
}

export default App;
