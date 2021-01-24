import React from "react";

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

// 高阶组件加强版：形参接收一个字符串值或一个数组。
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