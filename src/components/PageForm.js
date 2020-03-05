import React, { Component } from 'react';
//import McqPage from './McqPage';
import ClozePage from './ClozePage';
import McqPage from './McqPage';
import axios from 'axios';
//import Confirmation from './Confirmation';

class PageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _id: this.props.page._id,
        type: this.props.page.type,
        title: this.props.page.title,
        sentence: this.props.page.content.sentence,
        missingWords: this.props.page.content.missingWords
    }
  }

     

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    handleSentence = updatedSentence => {
      this.setState( {sentence : updatedSentence })
    }

    savePage = () => {
      alert('save')
      const page = this.state
      axios.post(`/pages/${page._id}`, {
        title: page.title,
        missingWords: page.missingWords,
        sentence: page.sentence
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

      alert(page.title + " " + page.sentence)
    }

    render(){
        const page = this.state;
        const existing_page = page;
        console.log("Type");
        console.log(page.type);
        switch(page.type) {
        case 'cloze':
            return <ClozePage
                    handleChange = {this.handleChange}
                    handleSentence = {this.handleSentence}
                    page={existing_page}
                    savePage = {this.savePage}
                    />
        case 'mcq':
            return <McqPage
                    handleChange = {this.handleChange}
                    page={existing_page}
                    savePage = {this.savePage}
                    />
        
        default:
          return <p> No such page</p>
        }
    }
}

export default PageForm;