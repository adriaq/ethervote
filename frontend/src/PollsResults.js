import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from "./components/Header";


class VotationResults extends Component {

    back = (event) => {
        this.props.history.push('/app');
    };

    render() {
        return (
            <div>

                <Header/>

                <div>
                    <Button onClick={this.back}>Back</Button>
                </div>

            </div>

        );
    }



}

export default VotationResults;