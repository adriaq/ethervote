import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Col } from 'reactstrap';
import {Button} from 'reactstrap';
import {ListGroup} from 'reactstrap';
import {ListGroupItem} from 'reactstrap';
import {ListGroupItemHeading} from 'reactstrap';
import {ListGroupItemText} from 'reactstrap';
import './styles/OpenPoll.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ethervote from "./Ethervote";
import swal from 'sweetalert';


const ethervote_source = require('./contracts/ethervote.json');


function PollListGroupItem(props) {
    console.log('i get here');
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
        this.web3 = this.props.web3;
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.ethervote = null;
        this.state = {
            Id: this.props.id,
            name: '',
            description: '',
            opcionsPoll: [
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
                }

            ],
            Selected: ''
        };
        this.getValue = this.getValue.bind(this);
    }

    goToEth() {
        console.log(this.web3);
        ReactDOM.render(<Ethervote web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    componentDidMount() {
        this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                console.log(accounts);
                console.log(accounts[0]);
                let user_account = accounts[0];
                this.setState({ user_address: user_account });

                console.log(this.ethervote);
                this.ethervote.methods.getProposalName(this.state.Id).call({from: this.state.user_address}).then(nom => {
                    this.setState({
                        name: nom,
                    });
                });
                this.ethervote.methods.getProposalDescription(this.state.Id).call({from: this.state.user_address}).then(des => {
                    this.setState({
                        description: des,
                    });
                });

            }
        });

    }


    vote() {
        console.log('funcio vote');
        console.log(this.state.Selected);
        if (this.state.Selected === ''){
            swal({
                title: "Error!",
                text: 'Select one candidate',
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else {
            swal({
                title: "Are you sure? You are voting for " + this.state.Selected,
                text: "Once you vote, you will not be able to make any change!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Encara estem implementant la votacio!", {
                            icon: "success",
                        });
                        //S'hauria de cridar abans de que surti com a succes, no?
                        //let asd = this.ether_vote();
                        ReactDOM.render(<Ethervote/>, document.getElementById('root'));
                        //console.log(asd);
                    } else {
                        swal({
                            title: "Vote canceled",
                            icon: "warning",
                            button: {
                                text: "Understood!",
                                className: "botosweet"
                            }
                        });
                    }
                });
        }
    }

    //ganache-cli -d


    getValue = (selected_value) => {
        /*
        Atencio, la manera correcta de fer això seri a atraves de un setState
            pero com el setState es asincron no funciona be. Sempre va un click per darrere.
            i no podem permetre que es selecioni una opcio i sen voti una altra
        * */
        this.state.Selected = selected_value;
        console.log(this.state.Selected);
    };

    render() {

        let name = this.state.name;
        let desc = this.state.description;
        return (

            <div>
                <Header/>
                <div>
                    <div className='titol'>
                        <h1>{name}</h1>
                        <h4>{desc}</h4>
                    </div>
                    <Col>
                        <ListGroup className="votations">
                            {this.state.opcionsPoll.map( o =>
                                <PollListGroupItem tag="a" key={o.id} title={o.name} description={o.description} getValue={this.getValue} />)}
                        </ListGroup>
                    </Col>
                    <div className="opcions">
                        <Button className="votar" color="success" onClick={() => this.vote()}> VOTE </Button>
                        <Button className="enrere"  onClick={() => this.goToEth()}> Back </Button>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default OpenPoll;


/*
* <ListGroup className="votations">
                            {this.state.opcionsPoll.map( o =>
                                <PollListGroupItem tag="a" key={o.id} title={o.name} description={o.description} getValue={this.getValue} />)}
                        </ListGroup>
* */


/* <ListGroup className="votations">
                           {this.state.opcionsPoll.map( o =>
                               <PollListGroupItem tag="a" key={o.id} title={o.name} description={o.description} getValue={this.getValue} />)}
                       </ListGroup>*/

        /* <ListGroup className="votations">

                           {this.state.candidats.p.map( o =>
                               <PollListGroupItem tag="a" title={o.name} description={o.description}/>)}

                       </ListGroup>*/



