import React,{ Component } from 'react';
import Home from "./components/Home";
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      num:0,
      bool: true,
    }
  }

  render() {
    return (<div className="App">
      <h2>打开控制台查看相关生命周期函数</h2>
      <button onClick={()=>{ this.setState((preState)=>{ return { num: preState.num + 1 } }) }}>（App）点击+1</button> 
      <h3>{ this.state.bool ? "真的" : "假的" }</h3>
      <button onClick={()=>{ this.setState({ bool: !this.state.bool });console.log(this.state.bool) }}>改变真假</button>
      <hr />
      <Home total={ this.state.num }/>
    </div>)
  }
}

export default App;
