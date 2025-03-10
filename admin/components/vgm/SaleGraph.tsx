import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Đăng ký các thành phần bắt buộc của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SaleGraph = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'], // Trục x
    datasets: [
      {
        label: 'Doanh thu',
        data: [65000, 59000, 80000, 81000, 56000, 55000, 40000], // Giá trị trục y
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
        tension: 0.2, // Độ cong của đường
        pointRadius: 4, // Kích thước điểm dữ liệu
      },
    ],
  };

  // Cấu hình thêm cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hiển thị chú thích
        position: "top",
      },
      title: {
        display: false,
        text: "Doanh thu theo tháng",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Tắt lưới trên trục x
        },
      },
      y: {
        beginAtZero: true, // Bắt đầu từ 0
        // ticks: {
        //     callback: (value: number) => `${value.toLocaleString()} VND`, // Thêm đơn vị VND
        // },
      },
    },
  } as const;

  return (
    <div style={{ width: '45%', margin: '0 0', textAlign: 'center', marginBottom: '4em', padding: '1em', border: 'none', backgroundColor: '#f2f2f2', borderRadius:'1em' }}>
      <h2 className="px-4 py-2 font-bold">Doanh thu hàng tháng</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SaleGraph;
