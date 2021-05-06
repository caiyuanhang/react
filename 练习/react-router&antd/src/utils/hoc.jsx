import React from "react";
import { Redirect } from "react-router-dom";

// 高阶组件：属性代理
export function withUser(InnerComponent) {
    return function OuterComponent(props) {
        let data = localStorage.getItem("currentUser");
        let currentUser;
        try {
            currentUser = JSON.parse(data);
        } catch (err) {
            currentUser = data;
        }

        return <InnerComponent {...props} user={currentUser}></InnerComponent>
    }
}

// 高阶组件属性代理加强版：形参接收一个字符串值或一个数组。
export function withStorage(key) {
    return (InnerComponent) => {
        return function OuterComponent(props) {
            let data;
            let obj = {};
            if (Object.prototype.toString.call(key) === "[object Array]") {
                key.forEach(item => {
                    data = localStorage.getItem(item);
                    try {
                        data = JSON.parse(data);
                    } catch (err) {
                        data = data;
                    }
                    obj[item] = data;
                })
            } else {
                data = localStorage.getItem(key);
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    data = data;
                }
                obj = {
                    [key]: data
                }
            }

            return <InnerComponent {...props} {...obj}></InnerComponent>
        }
    }
}

// 高阶组件：反向继承，进行路由拦截。
export const withAuth = (InnerComponent) => {
    // 高阶组件的装饰器模式用法（记得要安装插件噢）
    @withStorage("currentUser")

    class OuterComponent extends InnerComponent {
        // OuterComponent继承了InnerComponent里面的所有内容（包括render），如果OuterComponent里面没有写任何东西，那么将运行和渲染InnerComponent里面的内容，否则运行和渲染OuterComponent里面的内容

        render(){
            const { currentUser } = this.props;
            if(currentUser){
                // super指的就是继承的父类，如果user存在，则渲染父组件的内容。
                return super.render();
            }else {
                // user不存在，则重定向到登录页。
                return <Redirect to="/login" />
            }
        }
    }

    // 高阶组件的普通用法。
    // OuterComponent = withUser(OuterComponent);

    return OuterComponent;
}