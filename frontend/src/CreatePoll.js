import React, {Component} from 'react';
import {Button} from 'reactstrap';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {

        return (

            <div>
                <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand"> New boss election! </a>
                        </div>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#"> Help </a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Button className="enrere" color="danger" href="/"> Back </Button>

            </div>
        );
    }
}

/*
Camps del formulari
 -> nom de la votacio
 -> data de tancament
 -> petita explicacio
 -> candidats + explicacioo
 */

export default CreatePoll;