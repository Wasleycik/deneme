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
import { format, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data - Replace with actual data from Supabase
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'd MMMM', { locale: tr });
  }).reverse();

  const salesData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Satışlar',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.3,
      },
      {
        label: 'Kar',
        data: [3600, 5700, 4500, 7500, 6600, 9000, 8400],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Günlük Satış</h3>
          <p className="text-2xl font-bold">28,000 TL</p>
          <span className="text-green-500 text-sm">+12.5%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Haftalık Satış</h3>
          <p className="text-2xl font-bold">151,000 TL</p>
          <span className="text-green-500 text-sm">+8.2%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Aylık Satış</h3>
          <p className="text-2xl font-bold">583,000 TL</p>
          <span className="text-green-500 text-sm">+15.3%</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Toplam Ürün</h3>
          <p className="text-2xl font-bold">124</p>
          <span className="text-purple-600 text-sm">Stokta</span>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Satış Grafiği</h2>
        <Line data={salesData} />
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Son Siparişler</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Sipariş No</th>
                <th className="text-left py-3">Müşteri</th>
                <th className="text-left py-3">Ürünler</th>
                <th className="text-left py-3">Toplam</th>
                <th className="text-left py-3">Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">#12345</td>
                <td>Ahmet Yılmaz</td>
                <td>Vintage Elbise, Deri Çanta</td>
                <td>499.98 TL</td>
                <td><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Tamamlandı</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3">#12344</td>
                <td>Ayşe Demir</td>
                <td>Spor Ayakkabı</td>
                <td>449.99 TL</td>
                <td><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Hazırlanıyor</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;