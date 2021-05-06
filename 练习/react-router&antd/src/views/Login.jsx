import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from 'antd';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};


export default function Login() {
    let user = { username: "jingjing", password: 123, role: "admin" };

    const login = useCallback(() => {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<div style={{ backgroundColor: "darkorange" }}>
        <h1>Login</h1>
        <button onClick={login}>点击登录</button>
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入您的用户名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>请记住我</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>
    </div>)
}