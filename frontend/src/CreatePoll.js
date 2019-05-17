import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import{isEmpty} from 'lodash';
import { Redirect } from 'react-router';

/* Frontend components*/
import Admin from "./Admin";
import Ethervote from "./Ethervote";
import User from './User';
import Header from "./components/Header"
import Footer from "./components/Footer"

/* react-form import */
import { Form, Text, TextArea } from 'react-form';
import './styles/CreatePoll.css';

/* DatePicker import */
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/* sweetalert import */
import swal from 'sweetalert';

/* ethervote json import */
const ethervote_source = require('./contracts/ethervote.json');

class CreatePoll extends Component {

    constructor(props) {
        super(props);
        this.ethervoteAddress = this.props.ethervoteAddress;
        this.web3 = this.props.web3;
        console.log(this.web3);
        this.ethervote = null;
        this.counter = 1;
        this.state = {
            startDate: moment(),
            selectedDate : '',
            title: "New Poll",
            error : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    goToEth() {
        console.log(this.web3);
        ReactDOM.render(<Ethervote web3={this.web3} ethervoteAddress={this.ethervoteAddress}/>, document.getElementById('root'));
    }

    async domore(formData) {
        console.log('ara soc aqui');
        let postProposals = await this.ethervote.methods.getNumberOfProposals().call(

        ).on('error', (error) => {
            console.log(error)});
        console.log('postproposals ' + postProposals);
        console.log(formData);

        let options   = formData.options;
        let slogans   = formData.slogans;
        console.log(options);
        console.log(slogans);
        //- function addOption(int _proposalID, string _name, string _description) public onlyOwner onlyCreator(_proposalID) returns(bool)
        let i;
        let result;
        console.log('estoy en el domore');
        console.log(options.length);

        result = await this.ethervote.methods.addOption(postProposals, options[0], slogans[0]).send(
            {from: this.state.user_address}
        ).on('transactionHash', (hash) => {
            console.log(hash);
        }).on('confirmation', (confirmationNumber, receipt) => {
            console.log("confirmation number: " + confirmationNumber);
            console.log('hem afegit opcions ok');
        });
        /*for (i=0; i < options.length; i++) {
            result = await this.ethervote.methods.addOption(postProposals, options[i], slogans[i]).send(
                {from: this.state.user_address}
            ).on('transactionHash', (hash) => {
                console.log(hash);
            }).on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmation number: " + confirmationNumber);
                console.log('hem afegit opcions ok');
            });
        }*/
    }

    handleChange(date) {
        // comprovar que la data escollida sigui a partir d'avui
        //(date);
        let today = new Date();
        //alert(today);
        if (date < today) {
            swal({
                title: "Time alert!",
                text: "Time travel is not possible yet. The end date must be from tomorrow.",
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else {
            this.setState({
                startDate: date
            });
        }
    }

    /**
     *
     * @param submittedValues
     * @returns {Promise<void>}
     */
    async handleSubmit(submittedValues){
        let formData = JSON.parse(JSON.stringify(submittedValues)).submittedValues;
        console.log(formData);

        if (isEmpty(formData)) {
            swal({
                title: "Error!",
                text: 'Has d\'omplir el formulari!',
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }
        else if (isEmpty(formData.options)) {
            swal({
                title: "Error!",
                text: 'Has de posar alguna opció a qui votar!',
                icon: "warning",
                button: {
                    text: "Understood!",
                    className: "botosweet"
                }
            });
        }

        else {
            /* Quan l'administrador ha creat la votació, s'envia al smart contract instanciat prèviament. */
            let date = this.state.startDate.format().slice(0, 10);
            console.log("date: " + date);

            let preProposals = await this.ethervote.methods.getNumberOfProposals().call();
            console.log("preProposals: " + preProposals);

            /* Es crea una nova votació. Retorna proposalID o -1 si hi ha un error */

            // function newProposal(string _name, string _description, uint _votingTime, address _creator)
            //let proposalID   = await this.ethervote.methods.newProposal(formData.name, formData.description, { gas: (1000000) }, this.state.user_address).send(
            let proposalID = await this.ethervote.methods.newProposal(formData.name, formData.description).send({
                    from: this.state.user_address
                }
            ).on('transactionHash', (hash) => {
                console.log(hash);
            }).on('confirmation', (confirmationNumber, receipt) => {
                console.log("confirmation number: " + confirmationNumber);
                console.log('he fet new proposal ok');

                swal({
                    title: "Error!",
                    text: 'Tenim problemes per posar les opcions, estamos en ello!',
                    icon: "warning",
                    button: {
                        text: "Understood!",
                        className: "botosweet"
                    }
                });

                //console.log('vaig a cridar a domore');
                //this.domore(formData);

                console.log('despres del domore');
            }).on('error', (error) => {
                console.log(error);
                this.setState({error: true});
                swal({
                    title: "Error!",
                    text: error,
                    icon: "warning",
                    button: {
                        text: "Understood!",
                        className: "botosweet"
                    }
                });

            });
        }




            /* Per cada opció afegir-la al smart contract*/
            //let result;
           // for (var x in options) {
           //     result = await this.ethervote.addOption(this.counter, options[x], slogans[x],{ gas: (1000000) });
           // }
           // ++this.counter;

        //this.handleRedirect();
    }

    handleRedirect(){
        swal({
            title: "Good job!",
            text: "Your poll has been submitted!",
            icon: "success",
            timer: 3000,
        }).then(function() {
            ReactDOM.render(<Ethervote web3={this.web3} ethervoteAddres={this.state.ethervoteAddress}/>, document.getElementById('root'));
        });
    }

    componentDidMount() {
        console.log(this.ethervoteAddress);
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error)
            } else {
                let user_account = accounts[0];
                this.setState({user_address: user_account});
                this.ethervote = new this.web3.eth.Contract(ethervote_source.abi, this.ethervoteAddress);
            }
        });
    }

    render() {

        if (this.state.error){
            swal ( "Oops" ,  "Something went wrong!" ,  "error" )
        }

        return (
            <div>
                <Header title={this.state.title}/>

                <div className="main-window-2">
                    <h1>Create new Poll</h1>
                    <h5>Here you can create a new poll that will be sent to the blockchain.</h5><br/>

                    <Form onSubmit={submittedValues => this.handleSubmit( { submittedValues } )}>
                        { formApi => (
                            <div>
                                <form onSubmit={formApi.submitForm} id="dynamic-form">
                                    <label htmlFor="dynamic-first"><b>Name</b></label><br/>
                                    <Text field="name" id="dynamic-first" /><br/><br/>

                                    <label htmlFor="description"><b>Description</b></label><br/>
                                    <TextArea field="description" id="description" /><br/>

                                    <button id="addOption"
                                            onClick={() => formApi.addValue('options', '')}
                                            type="button"
                                            className="mb-4 mr-4 btn btn-success">Add Option</button><br/>

                                    { formApi.values.options && formApi.values.options.map( ( option, i ) => (
                                        <div key={`option${i}`}>
                                            <label htmlFor={`option-name-${i}`}><b>Option #{i}</b></label><br/>
                                            <Text className="options" field={['options', i]} id={`option-name-${i}`} /><br/>
                                            <label>Option description </label><br/>
                                            <Text className="option-description" field={['slogans', i]} id={`option-description-${i}`} /><br/>
                                            <button
                                                onClick={() => {formApi.removeValue('options', i); formApi.removeValue('slogans', i);}}
                                                type="button"
                                                className="mb-4 btn btn-danger remove-btn">Remove</button><br/>
                                        </div>
                                    ))}

                                    <label htmlFor="description"><b>End date</b></label><br/>
                                    <DatePicker class="data-picker" inline selected={this.state.startDate} onChange={this.handleChange}/><br/><br/>

                                    <button type="submit" className="mb-4 btn btn-primary submit-button">Submit</button>
                                </form>
                                <Button className="btn btn-primary back-btn"  onClick={this.goToEth} > Back </Button>
                            </div>
                        )}
                    </Form>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CreatePoll;
