import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';

class AddTaskForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskID: '',
            taskName: '',
            taskLevel: 0
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let itemSelected = this.props.itemSelected;
        if(itemSelected !== null){
            this.setState({
                taskID: itemSelected.id,
                taskName: itemSelected.name,
                taskLevel: itemSelected.level
            });
        }
    }

    static shouldComponentUpdate(nextProps, prevState){
        if(prevState.taskID !== ''){
            let itemSelected = nextProps.itemSelected;
            
            return {
                taskID: itemSelected.id,
                taskName: itemSelected.name,
                taskLevel: itemSelected.level
            };
        }
        
        return { hasError: true };
    }

    handleCancel(){
        this.props.onClickCancel();
    }

    handleChange(e){
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(e){
        this.props.onClickAdd(this.state);
        e.preventDefault();
    }

    render(){
        return(
            <Form>
                <Row>
                    <Col sm={5} className={'p-0'}>
                        <Form.Control value={this.state.taskName} onChange={this.handleChange} type="text" placeholder="Task Name" name="taskName" />
                    </Col>
                    <Col sm={3} className={'p-0'}>
                        <Form.Control as="select" value={this.state.taskLevel} onChange={this.handleChange} name="taskLevel">
                            <option value={0}>Small</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                        </Form.Control>
                    </Col>
                    <Col sm={2} className={'p-0'}>
                        <Button variant="info" type="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                    <Col sm={2} className={'p-0'}>
                        <Button onClick={this.handleCancel} variant="secondary" type="submit">
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default AddTaskForm;