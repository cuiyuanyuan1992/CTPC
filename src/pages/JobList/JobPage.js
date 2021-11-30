import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import * as lodash from 'lodash';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Table, Modal, Button,Tag,Form, Input,Radio } from 'antd';
import Space from "antd/es/space";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import Select from "antd/es/select";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import EditJob from "@/pages/JobList/components/EditJob";
import {currentUser as queryCurrentUser} from "@/services/ant-design-pro/api";

@connect( job => ({ job, loading }) => ({
  jobPage:job.jobPage,
  loading: loading.models.list,
}))
class JobPage extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      editModalVisible: false, // 修改弹框显示状态
      selectedRecord: null, // 当前选中的记录
      queryData:null,//查询条件
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="run" icon={<CaretRightOutlined /> }>
          执行
        </Menu.Item>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          编辑
        </Menu.Item>
        <Menu.Item key="disable" icon={<CloseOutlined />}>
          禁用
        </Menu.Item>
        <Menu.Item key="enable" icon={<CheckOutlined />}>
          启用
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          删除
        </Menu.Item>
      </Menu>
    );

    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '任务名称',
      dataIndex: 'jobName',
      render: text => <a>{text}</a>,
    }, {
      title: '任务类型',
      dataIndex: 'jobType',
    }, {
      title: '定时',
      dataIndex: 'timer'
    }, {
      title: '创建人',
      dataIndex: 'creator'
    }, {
      title: '任务状态',
      dataIndex: 'jobStatus',
      render: (text) => {
        let color = (text === 'enable' ? 'green' : 'red');
        let value = (text === 'enable' ? '启用' : '禁用');
        return (
          <Tag color={color}>{value}</Tag>
        );
      },
    }, {
      title: '任务描述',
      dataIndex: 'jobDesc'
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <Space wrap>
            <Dropdown trigger={['click']} onClick={()=> this.saveRecord(record)} overlay={menu}>
              <Button>
                操作 <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    }
    ];
  }

  componentWillMount() {
    this.props.dispatch({ type: 'job/getJobPageList',payload: {}});
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  showConfirm=() =>{
    const { dispatch} = this.props;
    let data = {
      "id": this.state.selectedRecord.id,
    }
    Modal.confirm({
      title: '确定删除该任务?',
      onOk:() =>{
        dispatch({
          type: 'job/deleteJob',
          payload: data
        })
        location.reload()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleMenuClick= async (e) => {
    const {dispatch} = this.props;
    if (e.key === "edit") {
      this.setState({
        editModalVisible: true,
      })
    } else if (e.key === "delete") {
      this.showConfirm();
    } else if (e.key === "run") {
      const msg = await queryCurrentUser();

      let data = {
        "jobName": this.state.selectedRecord.jobName,
        "trigger": msg.data.name,
      }
      dispatch({
        type: 'job/buildJob',
        payload: data
      })
    } else if (e.key === "disable") {
      let data = {
        "jobName": this.state.selectedRecord.jobName,
      }
      dispatch({
        type: 'job/disableJob',
        payload: data
      })
      location.reload()
    } else if (e.key === "enable") {
      let data = {
        "jobName": this.state.selectedRecord.jobName,
      }
      dispatch({
        type: 'job/enableJob',
        payload: data
      })
      location.reload()
    }

  }

  handleAdd = () => {
    this.setState({
      selectedRecord: null,
      editModalVisible: true,
    })
  }

  saveRecord = (record) => {
    this.setState({
      selectedRecord: record,
    });
  }

  handleOk = (newJob, type) => {
    const { dispatch} = this.props;
    if (type == 0) {
      dispatch({
        type: 'job/saveJob',
        payload: newJob,
      })
    } else if (type == 1 && !!newJob) {
      dispatch({
        type: 'job/updateJob',
        payload: newJob,
      })
    }

    this.setState({
      editModalVisible: false,
      selectedRecord: null,
    })

    location.reload()
  }

  handleCancel = (e) => {
    this.setState({
      editModalVisible: false,
      selectedRecord: null,
    })
  }

  queryDate = () => {
    let data = this.formRef.current.getFieldsValue();
    this.setState({
      queryData: data,
    })
    this.props.dispatch(
      {
        type: 'job/getJobPageList',
        payload:data
      }
    );
  }

  changePage = (page) => {
    this.setState({
      current: page,
    }, () => {
      console.log(this.state.queryData)

      let data = this.state.queryData;
      data.pageNum = this.state.current,
      data.pageSize= 10
      this.props.dispatch({ type: 'job/getJobPageList',payload:data});
    })
  }

  render() {
    const { jobPage } = this.props;
    const formItemLayout = {labelCol: { span: 8 }, wrapperCol: { span: 18 },};
    const buttonItemLayout = {wrapperCol: { span: 14, offset: 4 },};
    const {editModalVisible, selectedRecord } = this.state;

    return (
      <LocaleProvider locale={zhCN}>
        <Form
          {...formItemLayout}
          layout='inline'
          initialValues={this.state.queryData}
          ref={this.formRef}
        >
          <Form.Item name="jobName" label="任务名称：" >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item name="jobType" label="类型：" >
            <Select placeholder="请选择任务类型">
              <Select.Option value="iTest">自动化测试</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="jobStatus" label="状态：" >
            <Select placeholder="请选择状态">
              <Select.Option value="enable">启用</Select.Option>
              <Select.Option value="disable">禁用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="creator" label="创建人：" >
            <Input placeholder="请输入创建人" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button onClick={this.queryDate} type="primary">查询</Button>
          </Form.Item>
        </Form>

        <div>
          <Button style={{marginTop: '15px'}} type="primary" onClick={this.handleAdd}>新增</Button>
          <Table
            dataSource={jobPage.records}
            columns={this.columns}
            scroll={{ y: '200px' }}
            style={{tableLayout: 'fixed',marginTop: '15px'}}
            pagination={{ pageSize: 1 }}
            rowKey={record => record.id}
            pagination={{  // 分页
              simple: true,
              current: jobPage.current,
              total: jobPage.total,
              onChange: this.changePage,
            }}
          />
          {
            editModalVisible &&
            <EditJob
              type={lodash.isEmpty(selectedRecord) ? 0 : 1}
              data={selectedRecord}
              handleOk={this.handleOk}
              handleCancel={this.handleCancel}
            />
          }
        </div>
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state) {
  const { jobPageList } = state.job;
  return {
    jobPageList,
  };
}

export default connect(mapStateToProps)(JobPage);
