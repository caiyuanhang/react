import React,{ useCallback } from "react";

export default function Login(){
    let user = { username:"jingjing", password: 123, role: "admin" };

    const login = useCallback(()=>{
        localStorage.setItem("currentUser",JSON.stringify(user));
    },[]);

    return (<div style={{ backgroundColor:"darkorange" }}>
        <h1>Login</h1>
        <button onClick={ login }>点击登录</button>
    </div>)
}