import React, {Component} from 'react';
import Header from "./components/Header"

import { Form, Text, TextArea } from 'react-form';
import './styles/CreatePoll.css';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreatePoll extends Component {

  constructor(){
    super();
    this.state = {
      startDate: moment(),
      title : "New Poll",
    }

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

            <Form
              onSubmit={submittedValues => this.setState( { submittedValues } )}>
              { formApi => (
                <div>
                  <form onSubmit={formApi.submitForm} id="dynamic-form">

                    <label htmlFor="dynamic-first">Name</label><br/>
                    <Text style={{width: "25%"}} field="firstName" id="dynamic-first" /><br/><br/>

                    <button style={{width: "15%", margin: "10px", align: "center"}}
                        onClick={() => formApi.addValue('options', '')}
                        type="button"
                        className="mb-4 mr-4 btn btn-success">Add Option</button><br/>

                  { formApi.values.options && formApi.values.options.map( ( option, i ) => (
                      <div key={`option${i}`}>
                        <label htmlFor={`option-name-${i}`}>Option #{i}</label><br/>
                        <Text style={{width: "25%"}} field={['options', i]} id={`option-name-${i}`} /><br/>
                        <Text style={{width: "25%", margin: "10px"}} field={['options', i]} id={`option-2-name-${i}`} /><br/>
                        <button style={{width: "8%", margin: "10px", align: "center", margin: "10px"}}
                          onClick={() => formApi.removeValue('options', i)}
                          type="button"
                          className="mb-4 btn btn-danger">Remove</button>
                      </div>
                    ))}

                    <label htmlFor="description">Description</label><br/>
                    <TextArea style={{width: "25%"}} field="description" id="description" /><br/>

                    <label htmlFor="description">Finish date</label><br/>
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>

                   <button style={{width: "15%", margin: "10px", align: "center"} } type="submit" className="mb-4 btn btn-primary">Submit</button>

                  </form>
                </div>
              )}
            </Form>
          </div>
      </div>

    );

  }
}
