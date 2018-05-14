import React, { Component } from 'react';
import { Button } from 'reactstrap';


class VotationResults extends Component {


    render() {
        return (
            <div>
                <Button onClick={this.back()}>Back</Button>
            </div>

        );
    }



}

export default VotationResults;