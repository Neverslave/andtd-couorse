
import React, { Component } from 'react';
import { Table,Modal,Button,Form,Input } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;

function mapStateToProps(state) {
    return {
      cardsList: state.cards.cardsList,
      cardsLoading: state.loading.effects['cards/queryList'],
    };
  }

@connect(mapStateToProps)
class index extends Component {
  formRef = React.createRef();
    state={
        visible:false
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
      ];

      componentDidMount() {
        this.props.dispatch({
          type: 'cards/queryList',
        });
      }
      
      render() {
        const { cardsList, cardsLoading } = this.props;
        const { visible } = this.state;
      
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
          </div>
        );
      }
}

  export default index;