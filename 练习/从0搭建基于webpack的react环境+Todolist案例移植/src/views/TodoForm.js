import React, {
    Component
} from "react";
import TodoButton from "../components/TodoButton.js";

class TodoForm extends Component{
    constructor(props){
        super(props);
        this.changeText = this.changeText.bind(this);
    }

    changeText(){
        if(this.el.value == ""){
            alert("内容不允许为空");
        }else {
            this.props.addItem(this.el.value)
        }
        this.el.value = "";
        this.el.focus();
    }

    render(){
        return (<div>
            <textarea ref={el=>this.el=el} cols="63" rows="4"></textarea><br />
            <TodoButton click={this.changeText}>添加</TodoButton>
            </div>)
    }
}

export default TodoForm;