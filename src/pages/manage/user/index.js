import React from "react";
import styles from "./index.css";
import userData from "../../../assets/userData";
import { Form, Icon, Input, Button, message, Row, Col } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          if(values.newpassword1 !== values.newpassword2) {
            message.warn("两次输入的密码不一致")
          }
          else {
            console.log('Received values of form: ', values);
            //这里写更改密码的请求
          }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className= { styles.input }>
<Form.Item>
          {getFieldDecorator('oldpassword', {
            rules: [{ required: true, message: '请输入原始密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="原密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('newpassword1', {
            rules: [{ required: true, message: '请输入新密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="第一次输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>

        {getFieldDecorator('newpassword2', {
            rules: [{ required: true, message: '请输入新密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="第二次输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            修改密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const UserInfo = ()=> {
    return (
        <div>
            <span className = { styles.title }>用户信息</span> 
            <p>{ `用户： ${userData.userName }`}</p>
            <p>{ `姓名： ${userData.realName}`}</p>
            <p>{ `部门:  ${userData.section}`}</p>
        </div>
    )
}


const User = ()=> {
    return (
        <div>
            <UserInfo />
            <Row >
                <Col span = {12} offset = {6} >
            <WrappedNormalLoginForm />

                </Col>
            </Row>
        </div>
    )
}

export default User;