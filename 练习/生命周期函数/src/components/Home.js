import React,{ PureComponent, Component } from "react";

class Home extends PureComponent {
    // 通过控制台打印演示生命周期函数的执行过程。
    

    // 1、初始化阶段：constructor(){}，包含getDefualtProps（获取默认Props）和getInitialState（获取初始的state）。
    constructor(props){
        super(props);
        this.state = {
            user:"laoxie",
            num:0,
        }
        console.log("constructor");
    }


    // 2、挂载前阶段：componentWillMount(){}，这个即将被弃用，从18.X版本之后改为UNSAFE_componentWillMount(){}。
    UNSAFE_componentWillMount(){
        console.log("UNSAFE_componentWillMount");
    }


    // 3、挂载后阶段：componentDidMount(){}，可用于发送ajax请求、设置定时器、延时器。
    componentDidMount(){
        console.log("componentDidMount");
    }


    // 4、更新前阶段：componentWillUpdate(){}，这个即将被弃用，从18.X版本之后改为UNSAFE_componentWillUpdate(){}。
    UNSAFE_componentWillUpdate(){
        console.log("UNSAFE_componentWillUpdate");
    }


    // 5、更新后阶段：componentDidUpdate(){}，可用于状态改变后做的一些操作。
    componentDidUpdate(){
        console.log("componentDidUpdate");
    }


    // 6、销毁阶段：componentWillUnmount(){}，可用于取消ajax请求、取消定时器等操作。
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }


    // 7、特殊生命周期函数：componentWillReceiveProps(){}、shouldComponentUpdate(){}
    // 1）componentWillReceiveProps(){}，父组件传递的数据props改变时触发，这个即将被弃用，从18.X版本之后改为UNSAFE_componentWillReceiveProps(){}。
    UNSAFE_componentWillReceiveProps(){
        console.log("UNSAFE_componentWillReceiveProps");
    }

    // 2）shouldComponentUpdate(){}，state改变时触发，必须返回一个Boolean（默认返回true），一般用于性能优化。
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log("shouldComponentUpdate =>");

    //     // // this.state表示当前状态，nextState表示将要修改的状态。
    //     // console.log("下一个State：",nextState);
    //     // // 对nextState进行优化，只有当满足某种条件的时候才渲染页面。
    //     // return nextState.num % 5 === 0;

    //     // this.props表示当前父组件传入的值，nextProps表示父组件数据修改后传入的值。
    //     console.log("下一个Props",nextProps.total);
    //     // 对nextProps进行优化，只有当满足某种条件的时候才渲染页面。
    //     return nextProps.total % 5 === 0;
    // }

    
    // 8、PureComponent，当业务需求是简单的props和state不改变就不刷新组件，可以使用PureComponent来优化。PureComponent与Component的区别：PureComponent内部做了shouldComponentUpdate优化，在依赖的props或state没有发生改变的时候，组件是不会刷新的。但如果是复杂的业务场景，就还是需要使用shouldComponentUpdate来优化。


    // 9、this.forceUpdate()强制刷新，就是不经过shouldComponentUpdate，直接执行后面的componentWillUpdate、render和componentDidUpdate。（一般不推荐使用，除非特殊需求）
    powerUpdate = () => {
        this.forceUpdate();
    }


    render(){
        console.log("render渲染");
        return (<div>
            <h3>Home组件</h3>
            <h4>（App）数量：{ this.props.total }</h4>
            <h4>（Home）数量：{ this.state.num }</h4>
            <button onClick={()=>{ this.setState((preState)=>{ return { num: preState.num + 1 } }) }}>（Home）点击+1</button>
            <button onClick={ this.powerUpdate }>强制刷新</button>
        </div>)
    }
}

export default Home;