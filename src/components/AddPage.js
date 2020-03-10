import React, { Component } from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import CreatePage from './CreatePage'
import axios from 'axios';
//import Confirmation from './Confirmation';

class AddPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        pages: {},
        showCreatePageModal: false
    }
    this.getPages = this.getPages.bind(this);
    this.getPages()
  }

    
    getPages() {
      const {subject} = this.props
      console.log(subject)
      axios.get(`/pages/`)
        .then(({ data }) => {
          console.log(data);
          const pages  = data;
          console.log(pages);
          //const subjectPages = {};
          this.setState({
            pages: pages
          });
        });
    }

    addChosenPages = () => {
      alert('add')
      // const page = this.state
      // const {_id, type, title, sentence, missingWords, author} = this.state
      //   axios.put(`/pages/${_id}`, {
      //   type:type,
	    //   title:title,
	    //   author: author,
      // 	content: {
		  //      sentence:sentence,
      //      missingWords: missingWords
      //    }
      // })
      // .then((response) => {
      //   console.log(response);
      //   this.props.closeModal()
      // }, (error) => {
      //   console.log(error);
      // });
    }

    render(){
      const subject = this.props
      const {pages, showCreatePageModal} = this.state
      const pagesArray = Object.values(pages)
      return  <Form >
      {/* <h3 className="ui centered">Enter a sentence and choose the missing word</h3> */}
      {/* <Form.Field>
          <label>Title</label>
          <input
          placeholder= 'Title'
          onChange={this.props.handleChange('title')}
          defaultValue={page.title}
          />
      </Form.Field> */}
      <ul>
                {pagesArray.map((page, i) => (
                <li key={page.title+i+""}>
                    <label>
                        <input
                            type="checkbox"
                            value={i}
                            name="pages"
                            //checked={page.flag !== null}
                            //onChange={this.props.updateChosen}
                        />
                        {page.title}
                     </label>
                </li>))}
    
            </ul>
            <Modal closeIcon onClose={this.closeCreatePageModal} open={showCreatePageModal} trigger= { <Button onClick={() => this.setState({ showCreatePageModal: true })}>Create new page</Button> }>
            <Modal.Content>
		          <CreatePage subject={subject} closeModal={this.closeCreatePageModal}></CreatePage>
		      </Modal.Content>
		     </Modal> 
      <Button onClick={this.addChosenPages}>Save</Button>
  </Form>
        }
    
}

export default AddPage;