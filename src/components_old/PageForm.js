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
        missingWords: this.props.page.content.missingWords,
        author: this.props.page.author,
        content: this.props.page.content
    }
    this.handleMissing = this.handleMissing.bind(this);
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

    handleMissing = missWord => {
      const missWords = new Array(missWord)
      console.log("PF missWords" + missWords)
      console.log("PF missWord" + missWords[0])
      this.setState( {missingWords : missWords} )
    }

    savePage = () => {
      alert('save')
      // const page = this.state
      const {_id, type, title, sentence, missingWords, author} = this.state
        axios.put(`/pages/${_id}`, {
        type:type,
	      title:title,
	      author: author,
      	content: {
		       sentence:sentence,
           missingWords: missingWords
         }
      })
      .then((response) => {
        console.log(response);
        this.props.closeModal()
      }, (error) => {
        console.log(error);
      });
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
                    handleMissing = {this.handleMissing}
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