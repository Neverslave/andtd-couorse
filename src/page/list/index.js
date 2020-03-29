
import React, { Component } from 'react';
import { Table,Modal,Button,Form,Input } from 'antd';
import { connect } from 'dva';
import SampleChart from '../charts/SampleCharts';
const FormItem = Form.Item;

function mapStateToProps(state) {
    return {
      cardsList: state.cards.cardsList,
      cardsLoading: state.loading.effects['cards/queryList'],
      statistic: state.charts.statistic,
    };
  }

@connect(mapStateToProps)
class index extends Component {
  formRef = React.createRef();
    state={
        visible:false,
        statisticVisible:false,
        id:null
    }
    showModal = () => {
        this.setState({ visible: true });
      };
      handleCancel = () => {
        this.setState({
          visible: false,
        });
      }
    handleOk = () => {
        let values = this.formRef.current.getFieldsValue();
        const {dispatch} = this.props;
        dispatch({
            type: 'cards/addOne',
            payload: values,
        });
        // 重置 `visible` 属性为 false 以关闭对话框
        this.setState({
            visible: false
        });
    }
      //显示图表
      showStatistic = () => {
        const {dispatch} = this.props;
       dispatch({
          type: 'charts/getStatistic',
    
        });
        // 更新 state，弹出包含图表的对话框
        this.setState({ statisticVisible: true })
      };
    
      handleStatisticCancel = () => {
        this.setState({
          statisticVisible: false,
        });
      }
    

  
    columns = [
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
          },
          {
            title: '',
            dataIndex: '_',
            render: (_, { id }) => {
              return (
                <Button onClick={() => { this.showStatistic(); }}>图表</Button>
              );
            },
          },
      ];

      componentDidMount() {
        this.props.dispatch({
          type: 'cards/queryList',
        });
      }
      
      
      render() {
        const { cardsList, cardsLoading,statistic } = this.props;
        const { visible ,statisticVisible} = this.state;
        return (
          <div>
            <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />
                <Button onClick={this.showModal}>新建</Button>
                <Modal 
                visible={visible}
                title="新建记录"
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                okText="确认"
                cancelText="取消"
                >
          <Form ref={this.formRef}>
            <FormItem name ='name' label="名称" rules={[{required:true}]}>
                <Input  />
            </FormItem>
            <FormItem name = 'desc' label="描述" rules={[{required:true}]}>
                <Input />
            </FormItem>
            <FormItem label="链接" name='url' rules={[{required:true}]}>
                <Input  />
            </FormItem>
          </Form>
        </Modal>
        <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
        
        <SampleChart data={statistic} />
        </Modal>
          </div>
        );
      }
}

  export default index;