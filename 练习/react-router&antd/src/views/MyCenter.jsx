import React, { Component } from "react";
import { withAuth } from "../utils/hoc";
import { Radio  } from "antd";

// ES7装饰器模式
@withAuth
class MyCenter extends Component {
    constructor(props) {
        super(props);
        console.log("MyCenter的props：", this.props);
        this.jiantou();
    }

    jiantou = (e)=>{
        console.log("箭头函数可以用了");
    }



    render() {
        return (<div style={{ backgroundColor: "pink" }}>MyCenter
            <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
                <Radio.Button value="d">Chengdu</Radio.Button>
            </Radio.Group>
        </div>)
    }
}

export default MyCenter;