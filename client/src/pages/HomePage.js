import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiBook, FiUsers, FiTrendingUp, FiAward, FiZap, FiTarget, FiStar } from 'react-icons/fi';

/**
 * Home Page
 */
const HomePage = () => {
  const { user } = useAuth();

  if (user) {
    return null; // Redirect to dashboard in App.js
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-blue-50 to-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-32 z-10">
        <div className="text-center mb-16 animate-slideUp">
          <div className="mb-6 inline-block">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              ✨ Track Your Success
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 mb-6 leading-tight">
            Student Activity Record System
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Track your academic achievements, showcase your portfolio, and compete on the leaderboard to become a top performer in your institution
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold flex items-center gap-2 text-lg"
            >
              <FiZap /> Get Started Now
            </Link>
            <Link
              to="/leaderboard"
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all font-semibold flex items-center gap-2 text-lg"
            >
              <FiTrendingUp /> View Leaderboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {[
            { icon: FiBook, color: 'blue', title: 'Track Activities', desc: 'Record and manage all your activities with certificate uploads' },
            { icon: FiAward, color: 'green', title: 'Earn Points', desc: 'Get points for approved activities and climb the ranking' },
            { icon: FiUsers, color: 'purple', title: 'Share Portfolio', desc: 'Create a public portfolio to showcase your work' },
            { icon: FiTrendingUp, color: 'orange', title: 'View Rankings', desc: 'See how you rank against other students' }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            const colors = {
              blue: 'from-blue-500 to-blue-600 shadow-blue-200',
              green: 'from-green-500 to-green-600 shadow-green-200',
              purple: 'from-purple-500 to-purple-600 shadow-purple-200',
              orange: 'from-orange-500 to-orange-600 shadow-orange-200'
            };
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 p-8 text-center group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${colors[feature.color]} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <section className="mt-32">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Create your account as a student and get started right away' },
              { step: '2', title: 'Submit Activities', desc: 'Add your activities with details and certificate uploads' },
              { step: '3', title: 'Get Approved', desc: 'Admins review and approve your activities with points' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-16 text-white text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl group-hover:opacity-30 transition-opacity"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
              <FiStar className="text-yellow-300" /> Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
              Join our community of students tracking their achievements and building amazing portfolios
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg hover:shadow-2xl hover:scale-105"
            >
              Create Account Now
            </Link>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20 py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 Student Activity Record System. Built with ❤️ using MERN Stack.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
