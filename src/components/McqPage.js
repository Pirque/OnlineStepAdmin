import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class McqPage extends Component{

    savePage = (e) => {
        e.preventDefault()
        this.props.savePage()
    }

    render(){
        const { page } = this.props;
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
                    onChange={this.props.handleChange('sentence')}
                    defaultValue={page.sentence}
                    />
                </Form.Field>
                <Button onClick={this.savePage}>Save </Button>
            </Form>
        )
    }
}

export default McqPage;