import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Đăng ký các thành phần bắt buộc của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewOrderGraph = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7'], // Trục x
    datasets: [
      {
        label: 'Đơn hàng',
        data: [65, 59, 80, 81, 56, 55, 40], // Giá trị trục y
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  // Cấu hình thêm cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
      },
    },
  } as const;

  return (
    <div style={{ width: '45%', margin: '0 0', textAlign: 'center', marginBottom: '4em', padding: '1em', border: 'none', backgroundColor: '#f2f2f2', borderRadius:'1em' }}>
      <h2 className="px-4 py-2 font-bold">Đơn hàng mới</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NewOrderGraph;
