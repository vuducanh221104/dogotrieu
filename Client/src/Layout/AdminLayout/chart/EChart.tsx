import ReactApexChart from 'react-apexcharts';
import { Row, Col, Typography } from 'antd';
import eChart from './configs/eChart';

function EChart() {
    const { Title, Paragraph } = Typography;

    return (
        <>
            <Title level={5}>Tổng Sản Phẩm Đã Bán</Title>
            <Paragraph className="lastweek">
                Nhiều hơn tháng trước<span className="bnb2">+30%</span>
            </Paragraph>
            <Paragraph className="lastweek">Biểu Đồ Tổng Lượng Sản Phẩm Đã Bán Qua Từng Tháng</Paragraph>
            <div id="chart" style={{ marginTop: '30px' }}>
                <ReactApexChart
                    className="bar-chart"
                    options={eChart.options}
                    series={eChart.series}
                    type="bar"
                    height={220}
                />
            </div>
        </>
    );
}

export default EChart;
