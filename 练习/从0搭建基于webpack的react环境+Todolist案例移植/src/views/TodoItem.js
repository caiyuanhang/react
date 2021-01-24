import React from "react";
import TodoButton from "../components/TodoButton.js";
import Context from "../components/TodoContext.js";

function TodoItem (props){
    return (<tr align="center">
    <td>{props.data.id}</td>
    <td>{props.data.text}</td>
    <td>{props.data.done?"已完成":"未完成"}</td>
        <Context.Consumer>
            {
                value=>{
                    return <td><TodoButton click={value.finished.bind(null,props.data.id)}>完成</TodoButton>
                    <TodoButton click={value.deleted.bind(null,props.data.id)}>删除</TodoButton></td>
                }
            }
        </Context.Consumer>
</tr>)
}

export default TodoItem;