import {Container, ListGroup, Table} from 'react-bootstrap';
import Item from './Item';
import React from 'react';

class List extends React.Component{
    constructor(props){
        super(props);

        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleItemDelete(id){
        this.props.onClickDelete(id);
    }

    handleEdit(item){
        this.props.onClickEdit(item);
    }

    render(){
        const items = this.props.items;

        const elemItem = items.map((item, index)=>
            <Item onClickEdit={this.handleEdit} key={index} item={item} index={index} onClickDelete={this.handleItemDelete}/>
        )

        return(
            <Container className={'mt-3'}>
                <ListGroup as="ul">
                    <ListGroup.Item variant="success">List Task</ListGroup.Item>
                    <ListGroup.Item>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Level</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elemItem}
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        );
    }
}

export default List;