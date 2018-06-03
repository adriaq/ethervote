import React, { Component } from 'react';
import {Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText} from 'reactstrap';
import './styles/OpenPoll.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
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
            /*
            candidats: [
                {

                    "id":"0",
                    "name": "example glossary",
                    "description": "Descripcio de el que votarem a continuacio",
                    "num_opcions": "4",
                    options: [
                        {
                            "id": "1",
                            "name": "M. Rajoy",
                            "description": "Luis se fuerte",
                            "votes": "3",
                         },
                        {
                            "id": "2",
                            "name": "G. Rufian",
                            "description": "Soc una mica demagog",
                            "votes": "3",
                        },
                        {
                            "id": "3",
                            "name": "A. Rivera",
                            "description": "Ibex 35",
                            "votes": "3",
                        } ],
                },
            ],
            */
            candidats: [],


        };

        this.vote = this.vote.bind(this);
        this.getValue = this.getValue.bind(this);
        this.ether_vote = this.ether_vote.bind(this);

        this.ether_getPoll = this.ether_getPoll.bind(this);

        this.state.candidats = this.ether_getPoll();
        console.log(this.state.candidats);

        //Tira error no se xq
        this.state.candidats.map( o => {this.state.opcionsPoll = o.options });
    }

    async ether_getPoll() {
        let name = await this.ethervote.getProposalName(this.state.Id);
        let description = await this.ethervote.getProposalDescription(this.state.Id);
        let num_opcions = await this.ethervote.getNumberOfOptions(this.state.Id);
        let options = [];
        for (let j = 1; j <= num_opcions; ++j) {
            let option_name = await this.ethervote.getOptionName(this.state.Id, j);
            let option_description = await this.ethervote.getOptionDescription(this.state.Id, j);
            let option_votes = await this.ethervote.getNumberOfVotes(this.state.Id, j);

            let o = {"id": j, "name": option_name, "description": option_description, "votes": option_votes};
            options.push(o);
        }

        let p = {"name": name, "description": description, "num_opcions": num_opcions, "options": options};
        return JSON.parse(p);
    }

    async ether_vote() {
        console.log("asdasdadsa");
        let v = false;
        let idPoll = this.state.Id;

        //Agafar id de la opció seleccionada
        let idOption = 1;
        let voted = await this.ethervote.hasVoted(this.web3.eth.accounts[0], idPoll); //retorna tal qual true or false
        if(!voted) {
            await this.ethervote.vote(idPoll, idOption); //no retorna res important
            v = await this.ethervote.hasVoted(this.web3.eth.accounts[0], idPoll);
        }
        //v si false hi ha hagut un error,
        //ja sigui xq ya ha votat o perque no ha pogut votar per algo extrany
        return v;
        console.log(v);
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

                    //S'hauria de cridar abans de que surti com a succes, no?
                    let asd = this.ether_vote();
                    console.log(asd);
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
                               <PollListGroupItem tag="a" key={o.id} title={o.name} description={o.description} getValue={this.getValue} />)}
                       </ListGroup>
                    </Col>
                    <div className="opcions">
                        <Button className="votar" color="success" onClick={this.vote}> VOTE </Button>
                        <Button className="enrere" color="danger" href="/User"> Back </Button>
                    </div>
                </div>
                <Footer/>
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
