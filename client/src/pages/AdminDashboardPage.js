import React, { useEffect, useState } from 'react';
import { adminService } from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

/**
 * Admin Dashboard Page
 */
const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getStats();
        setStats(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;

  const activityChartData = [
    { name: 'Approved', value: stats?.approvedActivities || 0 },
    { name: 'Pending', value: stats?.pendingActivities || 0 },
    { name: 'Rejected', value: stats?.rejectedActivities || 0 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">{stats?.totalStudents || 0}</p>
            </div>
            <FiUsers className="text-blue-600 opacity-20" size={48} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Activities</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalActivities || 0}</p>
            </div>
            <FiClock className="text-purple-600 opacity-20" size={48} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Approval</h3>
              <p className="text-3xl font-bold text-orange-600">{stats?.pendingActivities || 0}</p>
            </div>
            <FiCheckCircle className="text-orange-600 opacity-20" size={48} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Approved</h3>
              <p className="text-3xl font-bold text-green-600">{stats?.approvedActivities || 0}</p>
            </div>
            <FiCheckCircle className="text-green-600 opacity-20" size={48} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {activityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top 10 Students</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {stats?.topStudents?.map((student, index) => (
              <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-blue-600">#{index + 1}</span>
                  <span className="font-semibold text-gray-800">{student.name}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">{student.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
