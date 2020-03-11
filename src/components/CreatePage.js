import React, { Component } from 'react';
import { Form, Radio, Label, Button } from 'semantic-ui-react';
import axios from 'axios';
import CreateClozePage from './CreateClozePage'
import CreateMcqPage from './CreateMcqPage'

class CreatePage extends Component{
    constructor(props) {
        super(props);
        // const wordsInSentence = this.props.page.sentence.split(" ")
        this.state = {
            // sentence: this.props.page.sentence,
            subject: this.props.subject,
            title:"",
            type:"",
            sentence:"",
            missingWords:[],
            question:"",
            answers:[],
            correctAnswer:""

            // words: wordsInSentence,
            // //sentence: this.props.page.content.sentence,
            // // missingWords: this.props.page.missingWords,
            // missingWords: this.props.page.content.missingWords,
            // idx_missing: index_missing,
            // id_missing:""
        };
        //this.updateMissing = this.updateMissing.bind(this);
      }


    setType = (e, d) => {
      alert(d.value)
      this.setState( {type: d.value})
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

      saveNewPage = () => {
        const {type, title} = this.state
        const chapterId = this.props.chapterId
        alert("Save type "+ type + "title "+ title)
        switch(type) {
            case 'cloze': {
              const {sentence, missingWords} = this.state
              console.log("Save Sentence " + sentence )
              console.log("Save misssing Words " + missingWords)
              axios.post(`/pages`, {
                type:type,
                title:title,
                author: "Test",
                content: {
                  sentence:sentence,
                  missingWords: missingWords
                 }
              })
              //Add page to chapter here - update chapter with new page 
              .then((response) => {
                console.log(response);
                this.props.closeCreatePageModal()
              }, (error) => {
                console.log(error);
              });
              return
            }
            case 'mcq': {
              const {question, answers, correctAnswer} = this.state
              axios.post(`/pages`, {
                type:type,
                title:title,
                author: "Test",
                content: {
                  question:question,
                  answers: answers,
                  correctAnswer: correctAnswer
                 }
              })
              .then((response) => {
                console.log(response);
                this.props.closeCreatePageModal()
              }, (error) => {
                console.log(error);
              });
              return
            }
            default:
                alert("No page to save")
            }

        }
  
     
    // savePage = (e) => {
    //     e.preventDefault()
    //     this.props.savePage()
    // }

    // divideSentence = (sentence) => {
    //     return sentence.split(" ");
    // }

    // updateMissing = (index) => {
    //     this.setState({idx_missing: index})
    //     alert("index")
    // }

    // updateMissing = (e) => {
    //     this.setState({
    //       idx_missing: e.target.value
    //       })
    //       alert("ET" + e.target.value)
    //       const {words} = this.state
    //       console.log("Word missing in updateMissing in Cloze" + words[e.target.value])
    //       this.props.handleMissing(words[e.target.value])
    //   }

   


    // handleSentenceChange = input => event => {
    //          const wordsInS = this.divideSentence(event.target.value)
    //          console.log(wordsInS)
    //           this.setState({ [input] : event.target.value, words: wordsInS }, () => {
    //           const {sentence, words} = this.state;
    //           console.log("Cloze State" + words)

    //           //this.props.handleChange('sentence')
    //           this.props.handleSentence(sentence) 
    //         });
    // }

    render() {
        const { type, subject } = this.state;

        // const {words, idx_missing, id_missing} = this.state;
        // console.log("Cloze render " + words + "Idx_missing " +idx_missing)
        //person.driver = person.age >=16 ? 'Yes' : 'No';
     
        return(
          <>
            <Label>Choose type of page to create</Label>
            <Form>
             <Form.Field>
              <Radio
                label='Cloze test'
                name='typeGroup'
                value='cloze'
                checked={type === 'cloze'}
                onChange={this.setType}
             />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Multiple Choice Question '
                name='typeGroup'
                value='mcq'
                checked={type === 'mcq'}
                onChange={this.setType}
              />
            </Form.Field>

            </Form>  
            { type === 'cloze' && 
              <CreateClozePage 
              subject= {subject} 
              saveNewPage = {this.saveNewPage} 
              handleChange = {this.handleChange}
              handleMissing = {this.handleMissing}
              handleSentence = {this.handleSentence}>
              </CreateClozePage>
            }

            { type === 'mcq' && 
             <CreateMcqPage subject= {subject} saveNewPage = {this.saveNewPage}></CreateMcqPage>
            }

            {/* <Button onClick={this.saveNewPage}>Save </Button> */}
          </>    
        )
    }
}

export default CreatePage;