import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import { Redirect } from 'react-router';

/* Frontend components*/
import Admin from "./Admin";
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


class CreatePoll extends Component {

    constructor(props) {
        super(props);
        this.ethervote = this.props.ethervote;
        this.web3 = this.props.web3;
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

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    async handleSubmit(submittedValues){
        let formData = JSON.parse(JSON.stringify(submittedValues)).submittedValues;

        /* Quan l'administrador ha creat la votació, s'envia al smart contract instanciat prèviament. */
        let date     = this.state.startDate.format().slice(0,10);
        let preProposals = await this.ethervote.getNumberOfProposals();

        /* Es crea una nova votació. Retorna proposalID o -1 si hi ha un error */
        let proposalID   = await this.ethervote.newProposal(formData.name, formData.description, { gas: (1000000) });

        console.log(proposalID);





        let postProposals = await this.ethervote.getNumberOfProposals();
        console.log(postProposals)

        if (0 == -1) this.setState({ error : true });
        else{
          /* Recollir assignacio options i slogans del JSON */
          let options   = formData.options;
          let slogans   = formData.slogans;

          /* Per cada opció afegir-la al smart contract*/
          let result;
          for (var x in options) {
              result = await this.ethervote.addOption(this.counter, options[x], slogans[x],{ gas: (1000000) });

          }
          ++this.counter;
        }
        this.handleRedirect();
    }

    handleRedirect(){
      swal({
          title: "Good job!",
          text: "Your poll has been submitted!",
          icon: "success",
          timer: 3000,
      });

      setTimeout(
        function(){
           ReactDOM.render(<User web3={this.web3} ethervote={this.ethervote}/>, document.getElementById('root'));
         }, 1500);
    }

    render() {

        if (this.state.error){
            swal ( "Oops" ,  "Something went wrong!" ,  "error" )
        }

        return (
          <div>
            <Header title={this.state.title}/>

            <div className="main-window-2">
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
            <Footer/>
          </div>
        );
    }
}

export default CreatePoll;
