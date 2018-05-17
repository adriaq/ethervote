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
                            <a class="navbar-brand" href="/"> Welcome UserName! </a>
                        </div>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#"> Help </a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div class="row">
                    <div class="col-lg-6">
                        <h3> CREATE POLL </h3>
                        <p> Explicació de crear una votació </p>
                    </div>

                    <div class="col-lg-6">
                        <Button color="primary"  href="/createPoll" > Create poll </Button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">

                        <h3> OPEN POLLS </h3>

                        <ListGroup>
                            {this.state.votations.map( v =>
                                <ListGroupItem tag="a" href={"/openPolls"+ '#' +v.id} key={v.id}>{v.name}
                                </ListGroupItem>)}
                        </ListGroup>
                    </div>

                    <div class="col-lg-6">
                        <h3> RESULTS </h3>
                        <ListGroup>
                            <ListGroup>
                                {this.state.closeVotations.map( v =>
                                    <ListGroupItem tag="a"  href={"/pollsResult"+ '#' +v.id} key={v.id}>{v.name}
                                    </ListGroupItem>)}
                            </ListGroup>
                        </ListGroup>
                    </div>
                </div>

            <div class="center">
                <Button color="danger"  href="/admin" > Back </Button>
            </div>


    </div>
);
}
}

export default App;
