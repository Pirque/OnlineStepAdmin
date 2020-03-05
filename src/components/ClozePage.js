import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import MissingWords from './MissingWords';
class ClozePage extends Component{
    constructor(props) {
        super(props);
        const wordsInSentence = this.props.page.sentence.split(" ")
        const missingWord = this.props.page.missingWords[0]
        const index_missing = wordsInSentence.indexOf(missingWord)
        this.state = {
            sentence: this.props.page.sentence,
            words: wordsInSentence,
            //sentence: this.props.page.content.sentence,
            missingWords: this.props.page.missingWords,
            idx_missing: index_missing,
            id_missing:""
        };
        this.updateMissing = this.updateMissing.bind(this);
      }

    savePage = (e) => {
        e.preventDefault()
        this.props.savePage()
    }

    divideSentence = (sentence) => {
        return sentence.split(" ");
    }

    // updateMissing = (index) => {
    //     this.setState({idx_missing: index})
    //     alert("index")
    // }

    updateMissing = (e) => {
        this.setState({
          idx_missing: e.target.value
          })
          alert("ET" + e.target.value)
      }

   

    //handleSentenceChange = input => (event, next) => {
    handleSentenceChange = input => event => {
             const wordsInS = this.divideSentence(event.target.value)
             console.log(wordsInS)
              this.setState({ [input] : event.target.value, words: wordsInS }, () => {
              const {sentence, words} = this.state;
              console.log("Cloze State" + words)

              //this.props.handleChange('sentence')
              this.props.handleSentence(sentence) 
            });
           
            //return next();
    }

    // sentenceCallback = () => {
    //     const {sentence} = this.state;
    //     console.log(sentence);
    //     this.props.handleChange('sentence')
    //     this.props.handleSentence(sentence);  
    // }
    

    render() {
        const { page } = this.props;
        const {words, idx_missing, id_missing} = this.state;
        console.log("Cloze render " + words + "Idx_missing " +idx_missing)
        //person.driver = person.age >=16 ? 'Yes' : 'No';
     
        return(
            <Form >
                <h1 className="ui centered">Enter User Details</h1>
                <Form.Field>
                    <label>Title</label>
                    <input
                    placeholder= 'Title'
                    onChange={this.props.handleChange('title')}
                    defaultValue={page.title}
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
                    defaultValue={page.sentence}
                    />
                </Form.Field>
                <label>Words to remove</label>
                {console.log("Under label " + words)}
                {/* <MissingWords sentence={sentence} missingWords={missingWords}></MissingWords> */}
                <MissingWords missingWord={page.missingWords[0]} words={words} idx_missing={idx_missing} id_missing={id_missing} updateMissing={this.updateMissing}></MissingWords>
                
                <Button onClick={this.savePage}>Save </Button>
            </Form>
        )
    }
}

export default ClozePage;