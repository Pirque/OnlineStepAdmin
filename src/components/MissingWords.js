import React, { Component } from 'react';
import { Form, Radio } from 'semantic-ui-react';

class MissingWords extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //        words: this.props.words,
    //        id_missing:"",
    //        //idx_missing:this.props.idx_missing
    //     };
    //   }

    
    render() {
        // const {missingWords} = this.props;
        // console.log(missingWords);
        // const sentence  = this.props.sentence;
        // const words = sentence.split(" ");
        const {words, idx_missing} = this.props
        console.log("Missing words render " + words + " idx_missing " + idx_missing)
        return (
            <ul>
                {words.map((word, i) => (
                <li key={word+i+""}>
                    <label>
                        {console.log(idx_missing === i)}
                        {console.log(i)}
                        {console.log(idx_missing)}
                        <input
                            type="radio"
                            value={i}
                            name="missing"
                            checked={parseInt(idx_missing) === i}
                            onChange={this.props.updateMissing}
                        />
                        {word}
                     </label>
                </li>))}
    
            </ul>
            // words.map((word, i) => (
            //     <Form.Field
            //     control={Radio}
            //     type="radio"
            //     name="wordsToRemove"
            //     label= {word}
            //     value={i}
            //     key={i}
            //     checked={i===idx_missing}
            //     onChange={this.props.updateMissing}
            //   /> ))
        );
    }
}

export default MissingWords;
