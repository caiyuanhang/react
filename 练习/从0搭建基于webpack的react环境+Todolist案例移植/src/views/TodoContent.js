import React, {
    Component
} from "react";
import TodoItem from "./TodoItem.js";
import Context from "../components/TodoContext.js";

class TodoContent extends Component{
    constructor(props){
        super(props);

        this.tableHead = ["序号","代办事项","是否完成","操作"];
    }

    render(){
        const { dataList } = this.props.data;
        let finish = dataList.filter(item=>item.done===true);
        let unFinish = dataList.filter(item=>item.done===false);

        return (<div>
                    <table width="500">
                        <thead>
                            <tr>
                            {
                                this.tableHead.map(item=><th key={item}>{item}</th>)
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // 步骤2：使用Context接收数据的另外一种方式（仅适用于类组件）。
                                this.context.data.map(item=><TodoItem key={item.id} data={item} />)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4">
                                    总数：{dataList.length}，未完成：{finish.length}，已完成：{unFinish.length}
                                </td>
                            </tr>
                        </tfoot>    
                    </table>
                </div>)
    }
}

// 步骤1：使用Context接收数据的另外一种方式（仅适用于类组件）。
TodoContent.contextType = Context;

export default TodoContent;