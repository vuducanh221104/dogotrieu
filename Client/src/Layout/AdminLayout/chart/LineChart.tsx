import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import lineChart from './configs/lineChart';

function LineChart() {
    const { Title, Paragraph } = Typography;

    return (
        <>
            <div className="linechart">
                <div>
                    <Title level={5}>Tổng Số Người Dùng Đăng ký</Title>
                    <Paragraph className="lastweek">
                        Nhiều hơn tháng trước<span className="bnb2">+30%</span>
                    </Paragraph>
                    <Paragraph className="lastweek">Tổng Số Người Dùng Đăng Ký Qua Từng Tháng</Paragraph>
                </div>
                <div className="sales">
                    <ul>
                        <li>{<MinusOutlined />} Traffic</li>
                        <li>{<MinusOutlined />} Sales</li>
                    </ul>
                </div>
            </div>

            <ReactApexChart
                className="full-width"
                options={lineChart.options}
                series={lineChart.series}
                type="area"
                height={350}
                width={'100%'}
            />
        </>
    );
}

export default LineChart;
