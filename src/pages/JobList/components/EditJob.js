import React, { Component } from 'react';
import {
  Modal,
  Input,
  Form,
}
  from 'antd';
import Select from "antd/es/select";

class EditJob extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      id: !!props.data && props.data.id || null,
      creator: !!props.data && props.data.creator || "admin",
      updator: !!props.data && props.data.updator || "admin",
    };
  }

  handleOk = (e) => {
    console.log(e);
    let data = this.formRef.current.getFieldsValue();
    data.id = this.state.id;
    data.creator = this.state.creator;
    data.updator = this.state.updator;
    console.log(data);
    if (!data.id || data.id === 'undefined' || data.id === '') {
      this.props.handleOk(data, 0);
    } else {
      this.props.handleOk(data, 1);
    }
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.handleCancel(e);
  }

  render() {
    const { id} = this.state;
    return (
      <div>
        <Modal
          title={this.props.type === 0 ? '添加' : '修改'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={true}
        >
          <Form initialValues={this.props.data} ref={this.formRef}>
            <Form.Item
              name="jobName"
              label="jobName"
              hasFeedback
              rules={[{ required: true, message: '请输入任务名称' }]}
            >
              <Input placeholder="请输入任务名称" disabled ={!id || id === 'undefined' || id === '' ? false:true}/>
            </Form.Item>
            <Form.Item
              name="jobType"
              label="jobType"
              hasFeedback
              rules={[{ required: true, message: '请选择任务类型' }]}
            >
              <Select placeholder="请选择任务类型">
                <Select.Option value="iTest">自动化测试</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="gitUrl"
              label="gitUrl"
              hasFeedback
              rules={[{ required: true, message: '请输入gitUrl' }]}
            >
              <Input placeholder="请输入gitUrl"/>
            </Form.Item>
            <Form.Item
              name="gitBranch"
              label="gitBranch"
              hasFeedback
              rules={[{ required: true, message: '请输入gitBranch' }]}
            >
              <Input placeholder="请输入gitBranch"/>
            </Form.Item>
            <Form.Item
              name="command"
              label="command"
              hasFeedback
              rules={[{ required: true, message: '请输入执行命令' }]}
            >
              <Input.TextArea placeholder="请输入执行命令"/>
            </Form.Item>
            <Form.Item
              name="recipients"
              label="recipients"
              hasFeedback
              rules={[{ required: true, message: '请输入通知人' }]}
            >
              <Input placeholder="通知人(邮件地址，英文逗号分隔)"/>
            </Form.Item>
            <Form.Item
              name="timeoutMinutes"
              label="timeoutMinutes"
              hasFeedback
              rules={[{ required: true, message: '请输入超时时间' }]}
            >
              <Input placeholder="请输入超时时间（分钟）"/>
            </Form.Item>
            <Form.Item
              name="timer"
              label="timer"
              hasFeedback
              rules={[{ required: false, message: '请输入定时时间' }]}
            >
              <Input placeholder="请输入定时时间(corn格式)"/>
            </Form.Item>
            <Form.Item
              name="jobDesc"
              label="jobDesc"
              hasFeedback
              rules={[{ required: false, message: '请输入任务描述' }]}
            >
              <Input placeholder="请输入任务描述"/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditJob;

