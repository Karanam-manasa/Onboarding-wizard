// File: src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import Cards from '../components/Dashboard/Cards';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../index.css';

const DashboardPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const [summary, setSummary] = useState({
    teamMembers: null,
    activeProjects: null,
    notifications: null,
  });

  const calculateCompletion = () => {
    let completedFields = 0;
    const totalFields = 5;
    if (userData.name) completedFields++;
    if (userData.email) completedFields++;
    if (userData.companyName) completedFields++;
    if (userData.industry) completedFields++;
    if (userData.theme) completedFields++;
    return Math.round((completedFields / totalFields) * 100);
  };

  const weeklyData = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 19 },
    { day: 'Wed', value: 8 },
    { day: 'Thu', value: 15 },
    { day: 'Fri', value: 10 },
    { day: 'Sat', value: 5 },
    { day: 'Sun', value: 2 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSummary({
        teamMembers: 5,
        activeProjects: 3,
        notifications: 7,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = Object.values(summary).every(val => val === null);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">
        Welcome, {userData.name || 'User'}!
      </h1>

      <p className="dashboard-subheading">
        Company: {userData.companyName || 'N/A'} | Theme: {userData.theme || 'N/A'}
      </p>

      <div className="progress-section">
        <h3>Onboarding Completion</h3>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>
        <span>{calculateCompletion()}% complete</span>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading dashboard data...</p>
      ) : (
        <>
          {userData.layout === 'list' ? (
            <div className="list-layout">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Team Members</td>
                    <td>{summary.teamMembers ?? '-'}</td>
                  </tr>
                  <tr>
                    <td>Active Projects</td>
                    <td>{summary.activeProjects ?? '-'}</td>
                  </tr>
                  <tr>
                    <td>Notifications</td>
                    <td>{summary.notifications ?? '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="cards-grid">
              <Cards title="Team Members" value={summary.teamMembers} bgColor="#bfdbfe" />
              <Cards title="Active Projects" value={summary.activeProjects} bgColor="#bbf7d0" />
              <Cards title="Notifications" value={summary.notifications} bgColor="#fef9c3" />
            </div>
          )}

          <div className="chart-container">
            <h3>Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
