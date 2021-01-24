import React, {
    Component
} from "react";
import Context from "../components/TodoContext.js";
import TodoContent from "./TodoContent.js";
import TodoForm from "./TodoForm.js";

class Todolist extends Component{
    constructor(){
        super();
        this.state = {
            dataList:[
            {
                id:1,text:"月入过万",done:false,time:new Date()
            },{
                id:2,text:"迎娶白富美",done:false,time:new Date()
            },{
                id:3,text:"出任CEO",done:false,time:new Date()
            }
        ]}
        this.addItem = this.addItem.bind(this);
        this.finished = this.finished.bind(this);
        this.deleted = this.deleted.bind(this);
    }

    addItem(text){
        const newDataList = {
            id: parseInt(Math.random()*100000),
            text,
            done: false,
            time: new Date()
        }
        let newData = [newDataList,...this.state.dataList]
        this.setState({
            dataList:newData,
        })
    }

    finished(id){
        let newData = this.state.dataList;
        newData.forEach(item=>{
            if(item.id===id){
                item.done=true}
        });

        this.setState({
            dataList:newData
        })
    }

    deleted(id){
        let newData = this.state.dataList.filter(item=>item.id !== id);
        this.setState({
            dataList: newData,
        })
    }

    render(){
        return (
            <Context.Provider value={{data:this.state.dataList,finished:this.finished,deleted:this.deleted}}><div style={{backgroundColor:"pink"}}>
            <h1>待办事项（webpack版本）</h1>
            <TodoContent data={this.state}/>
            <TodoForm addItem={this.addItem}/>
        </div></Context.Provider>)
    }
}

export default Todolist;