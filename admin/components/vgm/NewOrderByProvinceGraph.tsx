import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Đăng ký các thành phần bắt buộc của Chart.js
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const NewOrderbyProvinceGraph = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ['Hà Nội', 'Thành phố Hồ Chí Minh', 'Bắc Ninh', 'Thái Bình'], // Nhãn cho từng tỉnh
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: [150, 200, 120, 80], // Giá trị tương ứng với từng tỉnh
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)',
          'rgba(255,206,86,0.6)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình thêm cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hiển thị chú thích
        position: "top",
      },
      title: {
        display: false,
        text: "Số lượng đơn hàng theo vị trí",
      },
    },
  } as const;

  return (
    <div style={{ width: '30%', margin: '0 auto', textAlign: 'center', marginBottom: '4em', padding: '1em', border: 'none', backgroundColor: '#f2f2f2', borderRadius:'1em' }}>
      <h2 className="px-4 py-2 font-bold">Đơn hàng theo vị trí</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default NewOrderbyProvinceGraph;
