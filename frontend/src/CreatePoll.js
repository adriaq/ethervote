import React, {Component} from 'react';
import Header from "./components/Header"

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
            title: "New Poll",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }


    render() {
        return (
            <div>
                <Header title={this.state.title}/>

                <div className="main-window">
                    <h1>Create a new Poll</h1>
                    <h4>Here you can create a new poll that will be sent to the blockchain.</h4>

                    <Form onSubmit={submittedValues => this.setState( { submittedValues } )}>
                        { formApi => (
                        <div>
                             <form onSubmit={formApi.submitForm} id="dynamic-form">
                                 <label htmlFor="dynamic-first">Name</label><br/>
                                 <Text field="firstName" id="dynamic-first" /><br/><br/>

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
                                         <Text className="option-description" field={['options-des', i]} id={`option-description-${i}`} /><br/>
                                         <button
                                            onClick={() => {formApi.removeValue('options', i); formApi.removeValue('options-des', i);}}


                                            type="button"
                                            className="mb-4 btn btn-danger remove-btn">Remove</button>
                                     </div>
                                 ))}

                                 <br/>

                               <label htmlFor="description">Finish date</label><br/>
                               <DatePicker class="data-picker" inline selected={this.state.startDate} onChange={this.handleChange}/><br/>

                                 <br/>
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
