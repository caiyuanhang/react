import React from "react";
import "./App.scss";
import { Switch, Route, withRouter, Redirect, Link, NavLink } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Reg from "./views/Reg";
import Mine from "./views/Mine";
import MyCenter from "./views/MyCenter";
import { request } from './utils/request';

// 使用antd
import { Menu, Row, Col } from 'antd';

function App(props) {
    const nav = [{ path: "/home", text: "首页" }, { path: "/mine", text: "我的" }, { path: "/myCenter", text: "个人中心" }, { path: "/login", text: "登录" }, { path: "/reg", text: "注册" }]

    const handleClick = e => {
        props.history.push(e.key);
    };

    request("/iq").then((res)=>{
        console.log("fetch数据：",res.data.result);
    })

    return (<div className="app">
        <h2>App主页</h2>
        <div>
            {/* 为什么selectedKeys使用了state.current，在打开页面的时候没有自动选住首页呢？因为useState是异步执行，异步程序等函数组件执行完了执行再执行，所以这里使用state.current在页面中没有显示。解决方法：直接使用props.location.pathname，选中高亮和渲染的时候直接根据当前路径来高亮和渲染 */}
            <Row>
            <Menu onClick={ handleClick } selectedKeys={ [props.location.pathname] } mode="horizontal" theme="dark">
                {
                    nav.map((item, index) => <Menu.Item key={ item.path }>{ item.text }</Menu.Item>)
                }
            </Menu>
            </Row>
        </div>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/myCenter" component={MyCenter} />
            <Route path="/reg" component={Reg} />
            <Route path="/mine" component={Mine} />
            <Route path="/notFound" render={() => <div>404错误，该页面没找到</div>} />
            <Redirect from="/" to="/home" exact />
            <Redirect to="/notFound" />
        </Switch>
        <ul>
            <h3>声明式导航：Link</h3>
            {
                nav.map(item => <li key={item.path}><Link to={item.path} replace={false}>{item.text}</Link></li>)
            }
            <h3>声明式导航：NavLink</h3>
            {
                nav.map(item => <li key={`${item.path}1`}><NavLink to={item.path} activeClassName="select">{item.text}</NavLink></li>)
            }
        </ul>

    </div>)
}

export default withRouter(App);