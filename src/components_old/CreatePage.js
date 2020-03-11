import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class CreatePage extends Component{
    constructor(props) {
        super(props);
        // const wordsInSentence = this.props.page.sentence.split(" ")
        this.state = {
            // sentence: this.props.page.sentence,
            subject: this.props.subject,
            // words: wordsInSentence,
            // //sentence: this.props.page.content.sentence,
            // // missingWords: this.props.page.missingWords,
            // missingWords: this.props.page.content.missingWords,
            // idx_missing: index_missing,
            // id_missing:""
        };
        //this.updateMissing = this.updateMissing.bind(this);
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
        // const { subject } = this.props;
        // const {words, idx_missing, id_missing} = this.state;
        // console.log("Cloze render " + words + "Idx_missing " +idx_missing)
        //person.driver = person.age >=16 ? 'Yes' : 'No';
     
        return(
            <Form >
                {<h3 className="ui centered">Create page </h3>}
                <Form.Field>
                    <label>Title</label>
                    <input
                    placeholder= 'Title'
                    // onChange={this.props.handleChange('title')}
                    // defaultValue={page.title}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Sentence</label>
                    <input
                    placeholder='Sentence'
                    //onChange={this.props.handleChange('sentence')}
                    //onChange={this.handleSentenceChange('sentence', this.sentenceCallback)}
                    // onChange={this.handleSentenceChange('sentence')}
                    // //defaultValue={page.sentence}
                    // defaultValue={page.content.sentence}
                    />
                </Form.Field>
                {/* <label>Words to remove</label>
                {console.log("Under label " + words)}
                {/* <MissingWords sentence={sentence} missingWords={missingWords}></MissingWords> */}
                {/* <MissingWords missingWord={page.content.missingWords[0]} words={words} idx_missing={idx_missing} id_missing={id_missing} updateMissing={this.updateMissing}></MissingWords> */}
                 */}
                <Button onClick={this.savePage}>Save </Button>
            </Form>
        )
    }
}

export default CreatePage;