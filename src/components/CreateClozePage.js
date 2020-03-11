import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import MissingWords from './MissingWords';
class CreateClozePage extends Component{
    constructor(props) {
        super(props);
        // const wordsInSentence = this.props.page.sentence.split(" ")
        // const wordsInSentence = this.props.page.content.sentence.split(" ")
        // const missingWord = this.props.page.missingWords[0]
        // const missingWord = this.props.page.content.missingWords[0]
        // const index_missing = wordsInSentence.indexOf(missingWord)
        this.state = {
            //sentence: "",
            words: [],
            //missingWords: [],
            idx_missing:"",
            id_missing:""
             //sentence: this.props.page.content.sentence,
            // missingWords: this.props.page.missingWords,
        };
        this.updateMissing = this.updateMissing.bind(this);
      }

    savePage = (e) => {
        e.preventDefault()
        this.props.saveNewPage()
    }

    divideSentence = (sentence) => {
        return sentence.split(" ");
    }

    // updateMissing = (index) => {
    //     this.setState({idx_missing: index})
    //     alert("index")
    // }

    updateMissing = (e, d) => {
        this.setState({
          idx_missing: d.value
          })
          alert("ET" + d.value)
          const {words} = this.state
          console.log("Word missing in updateMissing in Cloze" + words[d.value])
          this.props.handleMissing(words[d.value])
      }

   

    //handleSentenceChange = input => (event, next) => {
    handleSentenceChange = input => event => {
        const wordsInS = this.divideSentence(event.target.value)
        console.log(wordsInS)
        //this.setState({ [input] : event.target.value, words: wordsInS }, () => {
        this.setState({ sentence : event.target.value, words: wordsInS }, () => {
            const {sentence, words} = this.state;
            console.log("CreateCloze State" + words)
            console.log("CreateCloze State" + sentence)

            //this.props.handleChange('sentence')
            this.props.handleSentence(sentence) 
        });
    }

    render() {
        const {words, idx_missing} = this.state;
        console.log("Cloze render " + words + "Idx_missing " +idx_missing)

        return(
            <Form >
                {/* <h3 className="ui centered">Enter a sentence and choose the missing word</h3> */}
                <Form.Field>
                    <label>Title</label>
                    <input
                    placeholder= 'Title'
                    onChange={this.props.handleChange('title')}
                    //defaultValue={page.title}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Sentence</label>
                    <input
                    placeholder='Sentence'
                    //onChange={this.props.handleChange('sentence')}
                    //onChange={this.handleSentenceChange('sentence', this.sentenceCallback)}
                    onChange={this.handleSentenceChange('sentence')}
                    //defaultValue={page.sentence}
                    //defaultValue={page.content.sentence}
                    />
                </Form.Field>
                <label>Words to remove</label>
                {console.log("Under label " + words)}
                {/* <MissingWords sentence={sentence} missingWords={missingWords}></MissingWords> */}
                <MissingWords words={words} idx_missing={idx_missing} updateMissing={this.updateMissing}></MissingWords>
                
                <Button onClick={this.props.saveNewPage}>Save </Button>
             </Form>
        )
    }
}

export default CreateClozePage;