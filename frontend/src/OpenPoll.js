import React, { Component } from 'react';
import {Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText} from 'reactstrap';
import './styles/OpenPoll.css';
import Header from "./components/Header";
import {getPoll} from './web3Functions';




//FUNCIONS DE PROVA X RECONEIXER L'ELEMENT SELECIONAT
/*function notify(el) {
    resetElements();

    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log(el.innerHTML);
    el.classList.add('active');
}

function resetElements() {
    // Get all elements with "active" class
    var els = document.getElementsByClassName("active");

    // Loop over Elements to remove active class;
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    }
}

function findElement(id) {
    var ele = document.getElementsByClassName(id);
    notify(ele);
}
*/


function PollListGroupItem(props) {
    return (
        <ListGroupItem tag="button"  >
            <ListGroupItemHeading className="title"> {props.title} </ListGroupItemHeading>
            <ListGroupItemText className="description"> {props.description} </ListGroupItemText>
        </ListGroupItem>
    );
}


class OpenPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',

            prova: [{"name": "xavi"}, {"name": "marti"}, {"name": "joan"}],

            // petit json montat x fer proves
            candidats: [
                {
                    
                    "id":"0",
                    "name": "example glossary",
                    "description": "buaaaaaaaaaaaaaaaaaaaaaa",
                    "num_opcions": "4",
                    "options": [
                        {
                            "name": "S",
                            "description": "meh",
                            "votes": "3",
                         },
                        {
                            "name": "B",
                            "description": "meh",
                            "votes": "3",
                        },
                        {
                            "name": "G",
                            "description": "meh",
                            "votes": "3",
                        } ],
                },
            ],


        };

        //x agafar la id de la openPoll que hem selecionat des de User(que passem via url) i ppder carregar a info que toca
       const query = window.location.search.substring(1);
       const vars = query.split("?");

       this.state.Id = vars[vars.length -1];

        //aquesta carrega la info de la poll que marca la id obtiguda x la url
       //this.state.candidats = getPoll(this.state.Id);
    }

    vote() {
        //aqui hauria de mirar quin ListGroupItem esta marcat i selecionarlo.
        /* estan xl document tres funcions q he fet servir x provr coses
         idees: jugar amb el "active" de ListGroupItem.
        * */


    }

    //Aquesta funcio seria per agafar el array element options que conté totes les opcions
    //i escriureu. NO FUNCIONA, no se ven bé xq
    /*
    renderItem() {
        const elements = [];
        this.state.candidats.map( function(c, i) {
            elements.push(c.options)
            console.log(elements); //Aixó ho agafa bé
            return (
                { elements.map( function(o, i) {
                   return <PollListGroupItem key={i} title={o.name} description={o.description}/>;
                })}
            );
        })
    }
*/

    render() {

        return (

            <div>
                <Header/>

                <div>

                    <p className="text">{this.state.candidats.description}</p>


                        /* Solucionat el problema del map*/
                        /* Pot ser per pillar el this.state.prova.options -> crear function smart contract per agafar només opcions*/
                        /*Funcio feta -> getPollOptions(id)*/
                       {this.state.prova.map( function(o, i) {
                            return <PollListGroupItem key={i} title={o.name} description={o.description}/>;
                        })}

                    <Col>

                        /*Una altre maneera de printar per pantalla. mes visual?*/
                       <ListGroup className="votations">
                                {this.state.candidats.map( function(p, i) {
                                    return <ListGroupItem key={i}> {p.name} </ListGroupItem>;
                                })}
                        </ListGroup>

                        {this.renderItem()}

                    </Col>

                    /*nomes serveix de prova x comprovar que la id es passa correctament*/
                    <p>{this.state.Id}</p>

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
