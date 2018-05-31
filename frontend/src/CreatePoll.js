import React, {Component} from 'react';
import Header from "./components/Header"
import {newPoll, addOptionToPoll} from "./web3Functions"
import {Button} from 'reactstrap';
import swal from 'sweetalert';

import { Form, Text, TextArea } from 'react-form';
import './styles/CreatePoll.css';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreatePoll extends Component {

    constructor() {
        super();
        this.state = {
            startDate: moment(),
            selectedDate : '',
            title: "New Poll",
            redirect : false,
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
      {console.log(JSON.stringify(submittedValues, null, 2))}
      var x;
      var formData = JSON.parse(JSON.stringify(submittedValues)).submittedValues

      /* Quan l'administrador ha creat la votació, s'envia al smart contract instanciat prèviament. */
      var date     = this.state.startDate.format().slice(0,10)
      var pollID   = newPoll(formData.name, formData.description, date)

      /* Per cada opció afegir-la al smart contract*/
      var options   = formData.options
      var slogans   = formData.slogans
      for (x in options) {
        addOptionToPoll(pollID, options[x], slogans[x])
      }

      this.setState({redirect : true})

    }

    render() {

      if (this.state.redirect === true) {
        swal({
          title: "Good job!",
          text: "Your poll has been submitted!",
          icon: "success",
          button: "Ok!",
        })
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
