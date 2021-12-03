import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Table, Modal, Button,Tag,Form, Input} from 'antd';
import Space from "antd/es/space";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import Select from "antd/es/select";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import CaretRightOutlined from "@ant-design/icons/lib/icons/CaretRightOutlined";

@connect(({ jobBuild, loading }) => ({
  jobBuildPage:jobBuild.jobBuildPage,
  buildLog:jobBuild.buildLog,
  loading: loading.models.list,
}))
class JobBuildPage extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      logModalVisible: false, // 显示日志
      selectedRecord: null, // 当前选中的记录
      queryData:null,//查询条件
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="stop" icon={<CloseOutlined /> }>
          停止构建
        </Menu.Item>
        <Menu.Item key="report" icon={<CaretRightOutlined />}>
          查看报告
        </Menu.Item>
        <Menu.Item key="log" icon={<CaretRightOutlined />}>
          查看日志
        </Menu.Item>
      </Menu>
    );

    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      render: text => <a>{text}</a>,
    },
    {
      title: '任务类型',
      dataIndex: 'jobType',
    },
    {
      title: '成功用例',
      dataIndex: 'result',
      render: (text) => {
        let result = JSON.parse(text);
        return (
          <Tag color="green">{result==null? "0":result["passCount"]}</Tag>
        );
      },
    },
    {
      title: '失败用例',
      dataIndex: 'result',
      render: (text) => {
        let result = JSON.parse(text);
        return (
          <Tag color="red">{result==null? "0":result["failCount"]}</Tag>
        );
      },
    },
    {
      title: '跳过用例',
      dataIndex: 'result',
      render: (text) => {
        let result = JSON.parse(text);
        return (
          <Tag color="red">{result==null? "0":result["skipCount"]}</Tag>
        );
      },
    },
    {
      title: '成功率',
      dataIndex: 'result',
      render: (text) => {
        let result = JSON.parse(text);
        return (
          <div>{result==null? "0":result["successRate"]}</div>
        );
      },
    },
    {
      title: '构建状态',
      dataIndex: 'buildStatus',
      render: (text) => {
        let color = 'red';
        if(text == 'BUILDING' || text == 'REBUILDING'){
          color = 'blue';
        }else if(text == 'SUCCESS'){
          color = 'green';
        }
        return (
          <Tag color={color}>{text}</Tag>
        );
      },
    },
      {
        title: '执行人',
        dataIndex: 'triggerPeople',
      },
      {
        title: '耗时(s)',
        dataIndex: 'duration',
        render: (text) => {
          return (
            <div>{text/1000}</div>
          );
        },
      },
      {
        title: '执行时间',
        dataIndex: 'created',
      },
    {
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
    this.props.dispatch({ type: 'jobBuild/getJobBuildPageList',payload: {"jobType":"iTest"}});
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  showConfirm=() =>{
    const { dispatch} = this.props;
    let data = {
      "jobName": this.state.selectedRecord.jobName,
    }
    Modal.confirm({
      title: '确定停止本次构建?',
      onOk:() =>{
        dispatch({
          type: 'jobBuild/stopBuild',
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
    if (e.key === "stop") {
      this.showConfirm();
    } else if (e.key === "report") {
      let data = {
        "buildReport": this.state.selectedRecord.buildReport,
      }
      if(data["buildReport"] != null){
        window.location.href = (data["buildReport"])
      }

    } else if (e.key === "log") {
      let data = {
        "jobName": this.state.selectedRecord.jobName,
        "buildNumber":this.state.selectedRecord.buildNumber,
      }
      dispatch({
        type: 'jobBuild/getBuildLog',
        payload: data
      })
      this.setState({
        logModalVisible: true,
      });
    }
  }

  saveRecord = (record) => {
    this.setState({
      selectedRecord: record,
    });
  }

  queryDate = () => {
    let data = this.formRef.current.getFieldsValue();
    this.setState({
      queryData: JSON.stringify(data),
    })
    data.jobType = "iTest";
    this.props.dispatch(
      {
        type: 'jobBuild/getJobBuildPageList',
        payload:data
      }
    );
  }

  handleCancel = () => {
    this.setState(
      {
        logModalVisible: false,
      }
      );
  };

  changePage = (page) => {
    this.setState({
      current: page,
    }, () => {
      console.log(this.state.queryData)

      let data = {};
      if(this.state.queryData != null){
        data = this.state.queryData;
      };
      data.pageNum = page,
      data.pageSize= 10
      data.jobType = "iTest";
      this.props.dispatch({ type: 'jobBuild/getJobBuildPageList',payload:data});
    })
  }

  render() {
    const { jobBuildPage,buildLog } = this.props;
    const formItemLayout = {labelCol: { span: 8 }, wrapperCol: { span: 14 },};
    const buttonItemLayout = {wrapperCol: { span: 14, offset: 4 },};
    const {logModalVisible} = this.state;

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
          <Form.Item name="buildStatus" label="构建状态：" >
            <Select placeholder="请选择构建状态">
              <Select.Option value="SUCCESS">SUCCESS</Select.Option>
              <Select.Option value="BUILDING">BUILDING</Select.Option>
              <Select.Option value="FAILURE">FAILURE</Select.Option>
              <Select.Option value="UNSTABLE">UNSTABLE</Select.Option>
              <Select.Option value="REBUILDING">REBUILDING</Select.Option>
              <Select.Option value="ABORTED">ABORTED</Select.Option>
              <Select.Option value="UNKNOWN">UNKNOWN</Select.Option>
              <Select.Option value="NOT_BUILT">NOT_BUILT</Select.Option>
              <Select.Option value="CANCELLED">CANCELLED</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="triggerPeople" label="构建人：" >
            <Input placeholder="请输入构建人" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button onClick={this.queryDate} type="primary">查询</Button>
          </Form.Item>
        </Form>

        <div>
          <Table
            dataSource={jobBuildPage.records}
            columns={this.columns}
            scroll={{ x: 'max-content' }}
            style={{tableLayout: 'fixed',marginTop: '15px'}}
            pagination={{ pageSize: 1 }}
            rowKey={record => record.id}
            pagination={{  // 分页
              simple: true,
              current: jobBuildPage.current,
              total: jobBuildPage.total,
              onChange: this.changePage,
            }}
          />
        </div>
        <Modal title="任务Jenkins日志如下：" visible={logModalVisible} onOk={this.handleCancel} onCancel={this.handleCancel}>
          <p style={{whiteSpace:"pre-wrap"}}>{this.props.buildLog}</p>
        </Modal>
      </LocaleProvider>
    );
  }
}

export default JobBuildPage;
