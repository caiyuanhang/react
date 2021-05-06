import React, { useCallback } from "react";
import { withUser, withTest } from "../utils/hoc";

export default function Home(props){
    console.log("Home组件的props：",props);

    const toLogin = useCallback(()=>{
        props.history.push("/login");
    },[])
    
    const toReg = useCallback(()=>{
        props.history.replace("/reg");
    },[])

    return (<div style={{ backgroundColor:"crimson" }}>
        <h1>Home</h1>
        <h3>跳吖跳呀，跳到<button onClick={ toLogin }>登录页</button></h3>
        <h3>跳吖跳呀，跳到<button onClick={ toReg }>注册页</button></h3>
    </div>)
}

Home = withUser(Home);