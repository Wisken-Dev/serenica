// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  // Mock data for dashboard
  const userStats = {
    moodStreak: 7,
    sessionsCompleted: 3,
    journalEntries: 12,
    goalsAchieved: 5
  };

  const upcomingSessions = [
    { id: 1, therapist: "Dr. Sarah Johnson", date: "Tomorrow, 2:00 PM", type: "Video Call" },
    { id: 2, therapist: "Dr. Michael Chen", date: "Friday, 10:00 AM", type: "In-Person" }
  ];

  const recentActivities = [
    { id: 1, activity: "Mood logged", time: "2 hours ago", type: "mood" },
    { id: 2, activity: "Journal entry completed", time: "1 day ago", type: "journal" },
    { id: 3, activity: "Therapy session completed", time: "2 days ago", type: "session" }
  ];

  return (
    <div className="page-container">
      {/* Welcome Section */}
      <div className="therapy-hero text-center">
        <h1 className="hero-title">Welcome back, {user?.name}!
</h1>
        <p className="hero-subtitle">
          Here's your mental wellness overview and recent activity
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="therapy-card text-center">
          <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--therapy-primary)", marginBottom: "var(--space-2)" }}>
            {userStats.moodStreak}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>Day Mood Streak</div>
        </div>
        <div className="therapy-card text-center">
          <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--therapy-primary)", marginBottom: "var(--space-2)" }}>
            {userStats.sessionsCompleted}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>Sessions Completed</div>
        </div>
        <div className="therapy-card text-center">
          <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--therapy-primary)", marginBottom: "var(--space-2)" }}>
            {userStats.journalEntries}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>Journal Entries</div>
        </div>
        <div className="therapy-card text-center">
          <div style={{ fontSize: "var(--text-3xl)", fontWeight: "700", color: "var(--therapy-primary)", marginBottom: "var(--space-2)" }}>
            {userStats.goalsAchieved}
          </div>
          <div style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>Goals Achieved</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <div className="therapy-card">
          <h3 className="section-title" style={{ marginBottom: "var(--space-4)" }}>Upcoming Sessions</h3>
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 style={{ fontWeight: "600", color: "var(--gray-800)" }}>{session.therapist}</h4>
                    <p style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>{session.date}</p>
                    <span style={{ 
                      fontSize: "var(--text-xs)", 
                      color: "var(--therapy-primary)",
                      backgroundColor: "var(--therapy-soft)",
                      padding: "var(--space-1) var(--space-2)",
                      borderRadius: "var(--radius)"
                    }}>
                      {session.type}
                    </span>
                  </div>
                  <button className="btn btn-therapy">
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p style={{ color: "var(--gray-600)", marginBottom: "var(--space-4)" }}>No upcoming sessions</p>
              <Link to="/therapists" className="btn btn-therapy">
                Book a Session
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="therapy-card">
          <h3 className="section-title" style={{ marginBottom: "var(--space-4)" }}>Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--therapy-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--therapy-primary)",
                  fontSize: "var(--text-lg)"
                }}>
                  {activity.type === 'mood' && '😊'}
                  {activity.type === 'journal' && '📝'}
                  {activity.type === 'session' && '💬'}
                </div>
                <div className="flex-1">
                  <p style={{ fontWeight: "600", color: "var(--gray-800)", margin: 0 }}>{activity.activity}</p>
                  <p style={{ color: "var(--gray-500)", fontSize: "var(--text-sm)", margin: 0 }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="therapy-card mt-8">
        <h3 className="section-title" style={{ marginBottom: "var(--space-4)" }}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/journal" className="therapy-card text-center hover:transform hover:scale-105 transition-all">
            <div style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>📝</div>
            <div style={{ fontWeight: "600", color: "var(--gray-800)" }}>Journal</div>
          </Link>
          <Link to="/therapists" className="therapy-card text-center hover:transform hover:scale-105 transition-all">
            <div style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>👥</div>
            <div style={{ fontWeight: "600", color: "var(--gray-800)" }}>Therapists</div>
          </Link>
          <Link to="/quiz" className="therapy-card text-center hover:transform hover:scale-105 transition-all">
            <div style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>🎯</div>
            <div style={{ fontWeight: "600", color: "var(--gray-800)" }}>Matching Quiz</div>
          </Link>
          <Link to="/contact" className="therapy-card text-center hover:transform hover:scale-105 transition-all">
            <div style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>📞</div>
            <div style={{ fontWeight: "600", color: "var(--gray-800)" }}>Support</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;