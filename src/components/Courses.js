import React from 'react';
import { Table, Menu, Icon, Button, Modal } from 'semantic-ui-react';
//import { get } from 'axios';
import axios from 'axios';
//import times from 'lodash.times';
import { times } from 'lodash';
import { Helmet } from 'react-helmet';
//import { Link, Route } from 'react-router-dom';
import Page from './Page'; 
import { Header } from 'semantic-ui-react';
import DraggableTableRow from './DraggableTableRow';
//import QpageModal from './QpageModal';
import PageForm from './PageForm';
import AddPage from './AddPage';
import CreatePage from './CreatePage';
import styles from './styles.css'
//import UserInfo from './UserInfo';

const TOTAL_PER_PAGE = 10;

class Courses extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  courses: [],
	  chosen_course: {},
	  chapters: [],
	  chosen_chapter: {},
	  pages: [],
	  chosen_page: {},
	  pageno: 0,
	  totalPages: 0,
	  //pageModalIsOpen: false
	  showEditPageModal: false,
	  showAddPageModal: false,
	  showCreatePageModal: false,
	  clickedCourseRow: "",
	  clickedChapterRow:"",
	  clickedPageRow:""
	};
	this.incrementPage = this.incrementPage.bind(this);
	this.decrementPage = this.decrementPage.bind(this);
	this.setPage = this.setPage.bind(this);
	//this.handleDelete = this.handleDelete.bind(this);
	this.getCourses = this.getCourses.bind(this);
	this.getChapters = this.getChapters.bind(this);
	this.getPages = this.getPages.bind(this);
	this.handleClick = this.handleClick.bind(this);
	this.closeEditPageModal = this.closeEditPageModal.bind(this);
	this.closeAddPageModal = this.closeAddPageModal.bind(this);
	this.closeCreatePageModal = this.closeCreatePageModal.bind(this);
  }

  componentDidMount() {
	this.getCourses();
  }

  componentWillReceiveProps({ location = {} }) {
	if (location.pathname === '/courses' && location.pathname !== this.props.location.pathname) {
	  this.getCourses();
	}
  }

  // getUsers() {
  //   get('/api/users')
  //     .then(({ data }) => {
  //       const { users } = data;
  //       const totalPages = Math.ceil(users.length / TOTAL_PER_PAGE);

  //       this.setState({
  //         users: data.users,
  //         page: 0,
  //         totalPages,
  //       });
  //     });
  // }

  // getCourses() {
  //   fetch(`/courses`)
  //   .then((response) => {
  //     return response;
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // }
  getCourses() {
	//axios.get(`('http://online-step-api.herokuapp.com/chapter/${courseId}`)
	axios.get(`/courses/`)
	  .then(({ data }) => {
		console.log(data);
		const courses  = data;
		console.log(courses);
		const {totalPages} = Math.ceil(courses.length / TOTAL_PER_PAGE);
		this.setState({
		  courses: data,
		  pageno: 0,
		  totalPages
		});
	  });
  }

  //     .then(({ data }) => {
  //       const { courses } = data;
  //       const totalPages = Math.ceil(courses.length / TOTAL_PER_PAGE);

  //       this.setState({
  //         courses: data.courses,
  //         pageno: 0,
  //         totalPages,
  //       });
  //     });
  // }
  //Ändra så att chapters är del av courses-objekt och kolla om chapters redan finns som en array på course så sätts bara coursen i state
  // getChapters(courseId) {
  //   //axios.get(`('http://online-step-api.herokuapp.com/chapter/${courseId}`)
  //   axios.get(`/course/chapter/${courseId}`)
  //     .then(({ data }) => {
  //       console.log(data);
  //       this.setState({
  //         course: courseId,
  //         chapters: data
  //       });
  //     });
  // }

  getChapters(course) {
	axios.get(`/courses/chapters/${course._id}`)
	//axios.get(`/chapters/`)
	  .then(({ data }) => {
		console.log(data);
		this.setState({
		  chosen_course: course,
		  chosen_chapter: {},
		  pages: [],
		  chosen_page: {},
		  chapters: data
		});
	  });
  }

  getPages(chapter) {
	axios.get(`/chapters/pages/${chapter._id}`)
	//axios.get(`/pages/`)
	  .then(({ data }) => {
		this.setState({
		  chosen_chapter: chapter,
		  pages: data
		});
	  });
  }

  showPage(page) {
	alert(page._id + " " + page.title)
	this.setState({
	  chosen_page: page,
	  pageModalIsOPen: true
	  });
	}
  

  setPage(pageno) {
	return () => {
	  this.setState({ pageno });
	};
  }

  decrementPage() {
	const { pageno } = this.state;

	this.setState({ pageno: pageno - 1 });
  }

  incrementPage() {
	const { pageno } = this.state;

	this.setState({ pageno: pageno + 1 });
  }

  // handleDelete(courseId) {
  //   const { courses } = this.state;

  //   this.setState({
  //     courses: courses.filter(c => c.id !== courseId),
  //   });
  // }

  deleteCourse(courseId) {
	axios.post(`/course/${courseId}`, {type: 'delete'})
	.then(res => { 
	  if (res.status === 200) {
		this.getCourses();
		return;
	  }
	})
	.catch(function (error) {
	  console.log(error + " Could not delete course");
	});
  }

  deleteChapter(chapterId) {
	axios.post(`/chapter/${chapterId}`, {type: 'delete'})
	.then(res => { 
	  if (res.status === 200) {
		this.getCourses();
		return;
	  }
	})
	.catch(function (error) {
	  console.log(error + " Could not delete course");
	});
  }

  handleClick() {
	alert("hej");
	//Till render
	//className={styles.ui.table.clicked}
  }

  swapChapters(a, b) {
	let { chapters } = this.state;
	chapters[a] = chapters.splice(b, 1, chapters[a])[0];
	this.setState({
	  ...this.state,
	  chapters
	});
  }

  swapPages(a, b) {
	let { pages } = this.state;
	pages[a] = pages.splice(b, 1, pages[a])[0];
	this.setState({
	  ...this.state,
	  pages
	});
  }

  closeEditPageModal() {
	this.setState({
	  showEditPageModal: false
	});
	const {chosen_chapter} = this.state
	this.getPages(chosen_chapter)
 }

 closeAddPageModal() {
  this.setState({
	showAddPageModal: false
  });
  const {chosen_chapter} = this.state
  this.getPages(chosen_chapter)
}

closeCreatePageModal() {
  this.setState({
	showCreatePageModal: false
  });
  const {chosen_chapter} = this.state
  this.getPages(chosen_chapter)
}

setClickedCourseRow(courseId) {
  this.setState({clickedCourseRow: courseId})
}

setClickedChapterRow(chapterId) {
  this.setState({clickedChapterRow: chapterId})
  alert("Chapter id i set Clicked " + chapterId)
}

setClickedPageRow(pageId) {
  this.setState({clickedPageRow: pageId})
}

  render() {
	const { courses, pageno, totalPages, chapters, chosen_course, chosen_chapter, pages, 
	  showEditPageModal, showAddPageModal, showCreatePageModal, 
	  clickedCourseRow, clickedChapterRow, clickedPageRow} = this.state;
	  //alert("Clicked chapter row " + clickedChapterRow)
	const startIndex = pageno * TOTAL_PER_PAGE;

	return (
	  <Page>
		<Header>OnlineStep AdminTools</Header>
			<div class="ui three columned grid"> 
				<div class="three width column">
			<Header as='h2'>Courses</Header>
			<Table celled striped>
			  <Table.Header>
				<Table.Row>
				  <Table.HeaderCell>Title</Table.HeaderCell>
				  <Table.HeaderCell>Subject</Table.HeaderCell>
				  <Table.HeaderCell>Delete</Table.HeaderCell>
				</Table.Row>
			  </Table.Header>
		  <Table.Body>
			{courses.slice(startIndex, startIndex + TOTAL_PER_PAGE).map(course  => (
			  <Table.Row key={course._id} onClick={()=> this.setClickedCourseRow(course._id)} className={clickedCourseRow ===  course._id ? 'ui celled striped table clicked' : ''}>
			 {/* <DraggableTableRow key={course._id} i={i} action={this.swap.bind(this)}>  */}
				<Table.Cell onClick={()=> this.getChapters(course)}>
				  {/* <Link to={`/users/${user.id}`}>{user.name}</Link> */}
				{course.name}
				</Table.Cell>
				<Table.Cell>{course.subject}</Table.Cell>
				<Table.Cell>
				  <Button icon onClick={() => this.deleteCourse(course._id)}>
					<Icon name='delete' />
				  </Button>
				</Table.Cell>
			  </Table.Row>
			))}
		  </Table.Body>
		  <Table.Footer>
			<Table.Row>
			  <Table.HeaderCell colSpan={6}>
				<Menu floated="right" pagination>
				  {pageno !== 0 && <Menu.Item as="a" icon onClick={() => this.decrementPage}>
					<Icon name="left chevron" />
				  </Menu.Item>}
				  {times(totalPages, n =>
					(<Menu.Item as="a" key={n} active={n === pageno} onClick={() => this.setPage(n)}>
					  {n + 1}
					</Menu.Item>),
				  )}
				  {pageno !== (totalPages - 1) && <Menu.Item as="a" icon onClick={() => this.incrementPage}>
					<Icon name="right chevron" />
				  </Menu.Item>}
				</Menu>
			  </Table.HeaderCell>
			</Table.Row>
		  </Table.Footer>
		</Table>
	  </div>  
		{/* <Link to="/users/new">
		  <Button positive>New User</Button>
		</Link>
		<Route path="/users/:userId" component={UserInfo} /> */}
		 {/* {chapters.length && course && <Table celled striped> */}
				<div class="three width column">
		 {chapters.length !== 0 && <>
		 <Header as='h2'> Chapters in course {chosen_course.name} </Header> 
		 <Table celled striped>
		  <Table.Header>
			<Table.Row>
			  <Table.HeaderCell>Title</Table.HeaderCell>
			  <Table.HeaderCell>Delete</Table.HeaderCell>
			</Table.Row>
		  </Table.Header>
		  <Table.Body>
			{chapters.map((chapter, i) => (
			  //<Table.Row key={chapter._id}>
			  // <DraggableTableRow key={chapter._id} i={i} action={this.swapChapters.bind(this)} onClick={()=> this.setClickedChapterRow(chapter._id)} className={clickedChapterRow ===  chapter._id ? 'draggable clicked' : 'draggable'}> 
			  <Table.Row key={chapter._id} i={i} onClick={()=> this.setClickedChapterRow(chapter._id)} className={clickedChapterRow ===  chapter._id ? 'ui celled striped table clicked' : ''}>   
				<Table.Cell onClick={() => this.getPages(chapter)}>
				  {/* <Link to={`/users/${user.id}`}>{user.name}</Link> */}
				{chapter.name}
				</Table.Cell>
				<Table.Cell>
				  <Button icon onClick={() => this.deleteChapter(chapter._id)}>
					<Icon name='delete' />
				  </Button>
				</Table.Cell>
			  </Table.Row>
			))}
		  </Table.Body> 
		</Table>
		</>}
		</div>
				<div class="three width column">
		{pages.length !== 0 && <>
		 <Header as='h2'> Pages in chapter {chosen_chapter.name} </Header> 
		 
		 <Table celled striped selectable>
		  <Table.Header>
			<Table.Row>
			  <Table.HeaderCell>Title</Table.HeaderCell>
			  <Table.HeaderCell>Delete</Table.HeaderCell>
			</Table.Row>
		  </Table.Header>
		  <Table.Body>
			{pages.map((page, i) => (
			  //<Table.Row key={chapter._id}>
			
			  <DraggableTableRow key={page._id} i={i} action={this.swapPages.bind(this)}> 
				{/* <Modal trigger= { <Table.Cell> {page.title} </Table.Cell> } closeIcon> */}
				<Modal closeIcon onClose={this.closeEditPageModal} open={showEditPageModal} trigger= { <Table.Cell onClick={() => this.setState({ showEditPageModal: true })}> {page.title} </Table.Cell> }>
				  <Header icon='edit' content='Edit page' />
					  <Modal.Content>
					   <PageForm page={page} closeModal={this.closeEditPageModal}></PageForm>
					  </Modal.Content>
					</Modal>
				<Table.Cell>
				  <Button icon onClick={() => this.deletePage(page._id)}>
					<Icon name='delete' />
				  </Button>
				</Table.Cell>
			  </DraggableTableRow>
			))}
		  </Table.Body> 
						</Table>
						<Modal closeIcon onClose={this.closeAddPageModal} open={showAddPageModal} trigger={<Button className={"ui button styled"} onClick={() => this.setState({ showAddPageModal: true })}>Add page from page library</Button>}>
							<Header as='h2'> Pages within subject {chosen_chapter.subject} </Header>
							<Modal.Content>
								<AddPage subject={chosen_chapter.subject} closeModal={this.closeAddPageModal}></AddPage>
							</Modal.Content>
						</Modal>
						<Modal closeIcon onClose={this.closeCreatePageModal} open={showCreatePageModal} trigger={<Button className={"ui button styled"} onClick={() => this.setState({ showCreatePageModal: true })}>Create new page</Button>}>
							<Header as='h2'> Add new page within subject {chosen_chapter.subject} </Header>
							<Modal.Content>
								<CreatePage chapterId={chosen_chapter._id} subject={chosen_chapter.subject} closeCreatePageModal={this.closeCreatePageModal}></CreatePage>
							</Modal.Content>
						</Modal>
		</>}
		</div>
		</div>
		{/* { pageModalIsOPen && 
		<>
		<Button>test</Button>
		<QpageModal name="TestProp" pg={chosen_page} showPageModal={true} closeModal={() => this.closePageModal()}/>
		</>
		} */}
	  </Page>
	);
  }
}

export default Courses;

 /*<Table.Cell onClick={() => this.showPage(page)}>*/
				  /* <Link to={`/users/${user.id}`}>{user.name}</Link> */
				/*{page.title}
				</Table.Cell>*/
