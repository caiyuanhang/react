import React from "react";

function TodoButton(props){
    return (<button onClick={props.click}>{props.children}</button>)
}

export default TodoButton;