import React from 'react';
import {Button, Badge} from 'react-bootstrap';

class Item extends React.Component{
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete(id){
        this.props.onClickDelete(id);
    }
    
    handleEdit(item){
        this.props.onClickEdit(item);
    }

    render(){
        const item = this.props.item;
        const index = this.props.index;
        
        return(
        <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{this.elementLevel(item.level)}</td>
            <td>
                <Button onClick={() => this.handleEdit(item)} variant="warning">Edit</Button>
                <Button onClick={()=>this.handleDelete(item.id)} variant="danger">Delete</Button>
            </td>
        </tr>
        )
    }

    elementLevel(level){
        let elemLevel = <Badge variant="info">Small</Badge>;
        if(level === 1){
            elemLevel = <Badge variant="warning">Medium</Badge>;
        } else if (level === 2) {
            elemLevel = <Badge variant="danger">High</Badge>;
        }
        
        return elemLevel;
    }
}

export default Item;