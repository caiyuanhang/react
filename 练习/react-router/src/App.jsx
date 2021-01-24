import React from "react";
import "./App.css";  
import { Switch, Route, withRouter, Redirect, Link, NavLink } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Reg from "./views/Reg";
import Mine from "./views/Mine";


function App(props) {
    const nav = [{ path: "/home", text: "首页" }, { path: "/login", text: "登录" }, { path: "/reg", text: "注册" }, { path: "/mine", text: "我的" }]

    return (<div className="app">
        App
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
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/reg" component={Reg} />
            <Route path="/mine" component={Mine} />
            <Route path="/notFound" render={() => <div>404错误，该页面没找到</div>} />
            <Redirect from="/" to="/home" exact />
            <Redirect to="/notFound" />
        </Switch>
    </div>)
}

export default withRouter(App);