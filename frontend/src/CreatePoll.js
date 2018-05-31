import React, {Component} from 'react';
import Header from "./components/Header"
import {newPoll, addOptionToPoll} from "./web3Functions"
import {Button} from 'reactstrap';
import swal from 'sweetalert';
import User from './User';
import { Redirect } from 'react-router';

import { Form, Text, TextArea } from 'react-form';
import './styles/CreatePoll.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class CreatePoll extends Component {

    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
        this.state = {
            startDate: moment(),
            selectedDate : '',
            title: "New Poll",
            redirect : false,
            error : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }


    handleSubmit(submittedValues){

        console.log(JSON.stringify(submittedValues, null, 2));
        let x;
        let formData = JSON.parse(JSON.stringify(submittedValues)).submittedValues;

        /* Quan l'administrador ha creat la votació, s'envia al smart contract instanciat prèviament. */
        let date     = this.state.startDate.format().slice(0,10);
        let pollID   = this.ethervote.newPoll(formData.name, formData.description, date);

        if (!pollID) alert("Error creating new poll");

        /* Per cada opció afegir-la al smart contract*/
        let options   = formData.options;
        for (x in options) {
            console.log(options[x]);
          //  let a = this.ethervote.addOptionToPoll(pollID, options[x], "description");
            // TODO: S'Ha de fer asíncrona
           // if (!a) alert("Error adding option to poll");
        }

        alert("New poll " + formData.name +  "created successfully :)");
    }


    render() {
        if (this.state.redirect) {
            swal({
                title: "Good job!",
                text: "Your poll has been submitted!",
                icon: "success",
                button: "Ok!",
                timer: 3000,
            })
        }

        if (this.state.error){
            swal ( "Oops" ,  "Something went wrong!" ,  "error" )
        }

        return (
            <div>
                <Header title={this.state.title}/>

                <div className="main-window">
                    <h1>Create a new Poll</h1>
                    <h4>Here you can create a new poll that will be sent to the blockchain.</h4>

                    <Form onSubmit={submittedValues => this.handleSubmit( { submittedValues } )}>
                        { formApi => (
                        <div>
                             <form onSubmit={formApi.submitForm} id="dynamic-form">
                                 <label htmlFor="dynamic-first">Name</label><br/>
                                 <Text field="name" id="dynamic-first" /><br/><br/>

                                 <label htmlFor="description">Description</label><br/>
                                 <TextArea field="description" id="description" /><br/>

                                 <button id="addOption"
                                    onClick={() => formApi.addValue('options', '')}
                                    type="button"
                                    className="mb-4 mr-4 btn btn-success">Add Option</button><br/>

                                 { formApi.values.options && formApi.values.options.map( ( option, i ) => (
                                     <div key={`option${i}`}>
                                         <label htmlFor={`option-name-${i}`}>Option #{i}</label><br/>
                                         <Text className="options" field={['options', i]} id={`option-name-${i}`} /><br/>
                                         <label>Option description </label><br/>
                                         <Text className="option-description" field={['slogans', i]} id={`option-description-${i}`} /><br/>
                                         <button
                                            onClick={() => {formApi.removeValue('options', i); formApi.removeValue('slogans', i);}}
                                            type="button"
                                            className="mb-4 btn btn-danger remove-btn">Remove</button><br/>
                                     </div>
                                 ))}

                               <label htmlFor="description">Finish date</label><br/>
                               <DatePicker class="data-picker" inline selected={this.state.startDate} onChange={this.handleChange}/><br/><br/>

                              <button type="submit" className="mb-4 btn btn-primary submit-button">Submit</button>
                             </form>
                         </div>
                        )}
                    </Form>
                </div>
            </div>
        );
    }
}

export default CreatePoll;