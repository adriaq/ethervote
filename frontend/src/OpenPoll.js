import React, { Component } from 'react';
import {Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText} from 'reactstrap';
import './styles/OpenPoll.css';
import Header from "./components/Header";
import swal from 'sweetalert';


//FUNCIONS DE PROVA X RECONEIXER L'ELEMENT SELECIONAT
/*function notify(el) {
    resetElements();

    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(el.innerHTML);
    el.classList.add('active');
}


function findElement(id) {
    var ele = document.getElementsByClassName(id);
    notify(ele);
}
*/


function PollListGroupItem(props) {

    return (
        <ListGroupItem tag="button" onClick={(e) => props.getValue(props.title)} >
            <ListGroupItemHeading className="title"> {props.title} </ListGroupItemHeading>
            <ListGroupItemText className="description"> {props.description} </ListGroupItemText>
        </ListGroupItem>
    );
}



class OpenPoll extends Component {
    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.state = {
            Id: this.props.id,
            opcionsPoll: [],
            Selected: ' ',

            // petit json montat x fer proves
            candidats: [
                {
                    
                    "id":"0",
                    "name": "example glossary",
                    "description": "Descripcio de el que votarem a continuacio",
                    "num_opcions": "4",
                    options: [
                        {
                            "name": "M. Rajoy",
                            "description": "Luis se fuerte",
                            "votes": "3",
                         },
                        {
                            "name": "G. Rufian",
                            "description": "Soc una mica demagog",
                            "votes": "3",
                        },
                        {
                            "name": "A. Rivera",
                            "description": "Ibex 35",
                            "votes": "3",
                        } ],
                },
            ],


        };

        this.vote = this.vote.bind(this);
        this.getValue = this.getValue.bind(this);

       //this.state.candidats = getPoll(this.state.Id);

        this.state.candidats.map( o => {this.state.opcionsPoll = o.options });
    }




    vote() {
        swal({
            title: "Are you sure? You are voting for " + this.state.Selected,
            text: "Once you vote, you will not be able to make any change!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("You have voted successfuly!", {
                        icon: "success",
                    });
                } else {
                    swal("Canceled Vote");
                }
            });
    }

    //ganache-cli -d
    getValue = (selected_value) => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(selected_value);
        this.setState({Selected: selected_value});

        console.log("BBBBBBBBBBBBBBBBB");
        console.log(this.state.Selected);
    }

    render() {

        return (

            <div>
                <Header/>

                <div>

                    <p className="text"> {this.state.candidats.map(o => o.description)}</p>

                    <Col>
                       <ListGroup className="votations">
                           {this.state.opcionsPoll.map( o =>
                               <PollListGroupItem tag="a" key={o.name} title={o.name} description={o.description} getValue={this.getValue} />)}
                       </ListGroup>

                    </Col>

                    <div className="opcions">
                        <Button className="votar" color="success" onClick={this.vote}> VOTE </Button>
                        <Button className="enrere" color="danger" href="/User"> Back </Button>
                    </div>
                </div>

            </div>
        );
    }

}

export default OpenPoll;


        /* <ListGroup className="votations">

                           {this.state.candidats.p.map( o =>
                               <PollListGroupItem tag="a" title={o.name} description={o.description}/>)}

                       </ListGroup>*/



/* Solucionat el problema del map*/
/* Pot ser per pillar el this.state.prova.options -> crear function smart contract per agafar només opcions*/
/*Funcio feta -> getPollOptions(id)*/
/*{this.state.prova.map( function(o, i) {
     return <PollListGroupItem key={i} title={o.name} description={o.description}/>;
 })}*/
