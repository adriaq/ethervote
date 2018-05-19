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

            <h1>Jorge Ferrer Rodríguez</h1>

            <Form
              onSubmit={submittedValues => this.setState( { submittedValues } )}>
              { formApi => (
                <div>
                  <button
                    onClick={() => formApi.addValue('options', '')}
                    type="button"
                    className="mb-4 mr-4 btn btn-success">Add Option</button>
                  <form onSubmit={formApi.submitForm} id="dynamic-form">

                    <label htmlFor="dynamic-first">First name</label><br/>
                    <Text field="firstName" id="dynamic-first" /><br/>

                  { formApi.values.options && formApi.values.options.map( ( option, i ) => (
                      <div key={`option${i}`}>
                        <label htmlFor={`option-name-${i}`}>Name</label>
                        <Text field={['options', i]} id={`option-name-${i}`} />
                        <button
                          onClick={() => formApi.removeValue('options', i)}
                          type="button"
                          className="mb-4 btn btn-danger">Remove</button>
                      </div>
                    ))}

                    <label htmlFor="description">Description</label><br/>
                    <TextArea field="description" id="description" /><br/>

                    <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>

                   <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                  </form>
                </div>
              )}
            </Form>
          </div>
      </div>

    );

  }
}
