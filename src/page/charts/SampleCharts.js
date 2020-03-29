import React, { PureComponent } from 'react'
import {Chart} from '@antv/g2';
class SampleCharts extends PureComponent {
    constructor(props) {
        super(props)
        this.containerRef = React.createRef();
    }
    refreshChart = () => {
        // 接收 data 属性作为数据源
        this.chart.data(this.props.data);
        // 此处为硬编码，配置源自 G2 官方示例： https://github.com/antvis/g2
        // 实际开发中需要封装，推荐直接使用 BizCharts。
        this.chart.interval().position('genre*sold').color('genre');
        this.chart.render();
      };
    componentDidMount(){
        this.chart = new Chart({
            container:this.containerRef.current,
            width:450,
            height:300
        })
        this.refreshChart()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.refreshChart();
        }
      }
      componentWillUnmount() {
        if (this.chart) {
          this.chart.destroy();
        }
      }

    render() {
        return (
            <div ref={this.containerRef}></div>
        )
    }
}

export default SampleCharts