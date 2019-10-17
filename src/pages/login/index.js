import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import Oval from '../../assets/Oval.png';
import axios from 'axios'

@connect(
  ({login, loading}) => ({
    ...login,
    loading: loading.global,
  })
)
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // const { dispatch } = this.props;
        // dispatch({
        //   type: 'login/login',
        //   payload: { ...values }
        // })
        const tmp = values;
        tmp.keep_alive = Number(values.keep_alive)
        console.log(tmp);
        axios({
          method:'post',
          url:'http://yjxt.elatis.cn/users/login',
          data: {
            ...tmp
          },
          headers: {
            'content-type': 'application/json'
          }
        }).then(data =>{
          console.log(data);
          if (data.status === 200 ) {
            sessionStorage.setItem('token', data.data.data.token);
            window.location.href = '/manage'
          }
        }).catch(err => {
          console.log(err)
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.content}>
        <div>
          <img alt="login" src={Oval} className={styles.icon}/>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('keep_alive', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <a href="">现在登录!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;
