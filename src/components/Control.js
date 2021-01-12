import React from 'react';
import { Row, InputGroup, FormControl, Button, Col, Dropdown, DropdownButton, Container } from 'react-bootstrap';
import AddTaskForm from './AddTaskForm';
import List from './List';
import {filter, includes, orderBy} from 'lodash';

class Control extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowForm: false,
            value: '',
            orderType: 'name',
            orderDir: 'asc'
        };
        this.handleClickAddTask = this.handleClickAddTask.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClickAddTask(){
        this.setState({
            isShowForm: !this.state.isShowForm
        })
    }

    handleSearchChange(e){
        this.setState({
            value: e.target.value
        })
    }

    handleClear(){
        this.setState({
            value: ''
        })
    }

    handleSort(orderSortType, orderSortDir){
        this.setState({
            orderType: orderSortType,
            orderDir: orderSortDir
        });

        let focusSort = document.getElementsByClassName('dropdown-item');
        if(orderSortType === 'name' && orderSortDir === 'asc'){
            focusSort[1].classList.remove('active');
            focusSort[2].classList.remove('active');
            focusSort[3].classList.remove('active');
            if(!focusSort[0].classList.contains('active')) focusSort[0].classList.add('active');
        } else if(orderSortType === 'name' && orderSortDir === 'desc'){
            focusSort[0].classList.remove('active');
            focusSort[2].classList.remove('active');
            focusSort[3].classList.remove('active');
            if(!focusSort[1].classList.contains('active')) focusSort[1].classList.add('active');
        } else if(orderSortType === 'level' && orderSortDir === 'asc'){
            focusSort[0].classList.remove('active');
            focusSort[1].classList.remove('active');
            focusSort[3].classList.remove('active');
            if(!focusSort[2].classList.contains('active')) focusSort[2].classList.add('active');
        } else{
            focusSort[0].classList.remove('active');
            focusSort[1].classList.remove('active');
            focusSort[2].classList.remove('active');
            if(!focusSort[3].classList.contains('active')) focusSort[3].classList.add('active');
        }
    }

    handleItemDelete(id){
        this.props.onClickDelete(id);
    }

    handleAdd(item){
        this.setState({
            isShowForm: false
        })
        this.props.onClickAdd(item);
    }

    handleEdit(item){
        this.setState({
            isShowForm: true
        })
        this.props.onClickEdit(item);
    }

    render(){
        let formValue = this.state.value.toLowerCase();
        const originItems = this.props.items;
        let items = [];
        items = filter(originItems, (item)=>{
            return includes(item.name.toLowerCase(), formValue);
        })
        items = orderBy(items, [this.state.orderType], [this.state.orderDir]);
        let elemForm = null;
        let addTaskButton = <Button onClick={this.handleClickAddTask} variant="info" block>Add Task</Button>;
        if(this.state.isShowForm){
            elemForm = <AddTaskForm itemSelected={this.props.itemSelected} onClickCancel={this.handleClickAddTask} onClickAdd={this.handleAdd}/>;
            addTaskButton = <Button onClick={this.handleClickAddTask} variant="danger" block>Close</Button>;
        }
        return(
            <Container>
                <Row>
                    <Col xs={5}>
                    {/* SEARCH: START */}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Keyword"
                            value={this.state.value}
                            onChange={this.handleSearchChange}
                        />
                    <InputGroup.Append>
                        <Button variant="warning" onClick={this.handleClear}>Clear</Button>
                        </InputGroup.Append>
                    </InputGroup>
                {/* SEARCH: END */}
                </Col>
                <Col xs={2}>
                {/* SORT: START */}
                    <DropdownButton
                        as={InputGroup}
                        variant={'light'}
                        title={'Sort by'}
                    >
                        <Dropdown.Item eventKey="1" active onClick={(e)=>this.handleSort('name', 'asc')}>Name ASC</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={(e)=>this.handleSort('name', 'desc')}>Name DESC</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onClick={(e)=>this.handleSort('level', 'asc')}>Level ASC</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={(e)=>this.handleSort('level', 'desc')}>Level DESC</Dropdown.Item>
                    </DropdownButton>
                {/* SORT: END */}
                </Col>
                <Col xs={5}>
                    { addTaskButton }
                </Col>
            </Row>
            <Row>
                <Col xs={7}></Col>
                <Col xs={5}>
                    { elemForm }
                </Col>
            </Row>
            <List onClickEdit={this.handleEdit} items={items} onClickDelete={this.handleItemDelete}/>
        </Container>
        );
    }
}


export default Control;