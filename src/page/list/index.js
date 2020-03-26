
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
        const { dispatch, form: { validateFields } } = this.props;
      
        validateFields((err, values) => {
          if (!err) {
            dispatch({
              type: 'cards/addOne',
              payload: values,
            });
            // 重置 `visible` 属性为 false 以关闭对话框
            this.setState({ visible: false });
          }
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
          title="新建记录"
          visible={visible}
        >
          <Form >
            <FormItem label="名称" rules={[{required:true}]}>
            
                <Input />
            </FormItem>
            <FormItem label="描述" rules={[{required:true}]}>
          
                <Input />
           
            </FormItem>
            <FormItem label="链接" rules={[{required:true},{type:'url'}]}>
           
         
                <Input />
            
            </FormItem>
          </Form>
        </Modal>
          </div>
        );
      }
}

  export default index;