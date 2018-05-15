import React, { Component } from 'react';
import { Button } from 'reactstrap';


class VotationResults extends Component {

    back = (event) => {
        this.props.history.push('/app');
    };

    render() {
        return (
            <div>

                <nav class="navbar navbar-expand-lg custom-navbar">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"> New boss election results </a>
                        </div>
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#"> Help </a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                    <Button onClick={this.back}>Back</Button>
                </div>

            </div>

        );
    }



}

export default VotationResults;