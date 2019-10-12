import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Select, Table } from 'antd';
import styles from './index.css'
import MenuList from '../../../../assets/contextMenuDown'
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
const tableColumns = [{
  title: '当前附件',
  dataIndex: 'nowAddition',
  width: 150
},{
  title: '上传附件',
  dataIndex: 'addAddition'
}];

const dataSource = [{
  key: 1,
  nowAddition: 'file',
  addAddition: 'todo'
},{
  key: 2,
  nowAddition: 'file',
  addAddition: 'todo'
}];


class FormDemo extends React.Component {

  componentDidMount () {

    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)

  }

  handleSubmit = (event) => {

    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toRAW() // or values.content.toHTML()
        };
        console.log(submitData)
      }
    })

  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  render () {

    const { getFieldDecorator } = this.props.form
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]

    return (
      <div className={styles.wrapper}>
        <div className={styles['demo-container']}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="文章标题">
              {getFieldDecorator('title', {
                rules: [{
                  required: true,
                  message: '请输入标题',
                }],
              })(
                <Input size="large" placeholder="请输入标题"/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="发布部门">
              {getFieldDecorator('title', {
                rules: [{
                  required: true,
                  message: '请填写发布部门',
                }],
              })(
                <Input size="large" placeholder="请输入标题"/>
              )}
            </Form.Item >
            <Form.Item {...formItemLayout} label="请选择文章路径">
              {
                getFieldDecorator('selector',{
                  rules: [{
                    required: true,
                    message: ''
                  }]
                })(
                  <div>
                    <Select defaultValue="新闻中心" style={{ width: 180, marginRight: '80px' }} onChange={this.handleChange}>
                      {
                        MenuList.map((item)=>{
                          return (
                            <Option key={item.id}>{item.value}</Option>
                          )
                        })
                      }
                    </Select>
                    <Select defaultValue="lucy" style={{ width: 180 }} onChange={this.handleChange}>
                      {
                        MenuList.map((item)=>{
                          return (
                            <Option key={item.id}>{item.value}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>

                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="文章正文">
              {getFieldDecorator('content', {
                validateTrigger: 'onBlur',
                rules: [{
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容')
                    } else {
                      callback()
                    }
                  }
                }],
              })(
                <BraftEditor
                  className="my-editor"
                  controls={controls}
                  placeholder="请输入正文内容"
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}>
                <Button size="large" type="primary" htmlType="submit">保存草稿</Button>
                <Button size="large" type="primary" htmlType="submit">预览发布</Button>
                <Button size="large" type="primary" htmlType="submit">直接发布</Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{width: '362px'}}>
          <Table
            columns={tableColumns}
            dataSource={dataSource}
            title={()=>'附件管理'}
          />
        </div>
      </div>
    )
  }
}

export default Form.create()(FormDemo)
