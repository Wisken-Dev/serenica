import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ user, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="home-container">
      {/* Show welcome message if user is logged in */}
      {user && (
        <div style={{
          background: 'var(--therapy-secondary)',
          color: 'white',
          padding: 'var(--space-4)',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          Welcome back, {user.name}! 👋
        </div>
      )}
      
      {/* Navigation */}
      <nav className="therapy-navbar">
        <div className="therapy-nav-container">
          <Link to="/" className="therapy-logo">
            <div className="logo-icon">S</div>
            <span className="logo-text">Serenica</span>
          </Link>
          <div className="therapy-nav-links">
            <Link to="/therapists" className="therapy-nav-link">Therapists</Link>
            {user ? (
              // Show user profile and logout when logged in
              <>
                <span style={{ color: 'var(--therapy-primary)', fontWeight: '600' }}>
                  Hi, {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gray-600)',
                    cursor: 'pointer',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius)',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                  className="therapy-nav-link"
                >
                  Logout
                </button>
              </>
            ) : (
              // Show login/signup when not logged in
              <>
                <Link to="/login" className="therapy-nav-link">Login</Link>
                <Link to="/signup" className="btn btn-therapy">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="therapy-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {user ? `Welcome back, ${user.name}!` : 'Your Journey to Mental Wellness Starts Here'}
          </h1>
          <p className="hero-subtitle">
            {user 
              ? "Continue your mental health journey with personalized support and resources."
              : "Serenica connects you with licensed therapists, provides mood tracking tools, and offers a supportive community for your mental health journey."
            }
          </p>
          <div className="hero-buttons">
            {user ? (
              // Show dashboard actions for logged-in users
              <>
                <Link to="/therapists" className="btn btn-therapy btn-large">
                  Browse Therapists
                </Link>
                <Link to="/quiz" className="btn btn-calm btn-large">
                  Take Matching Quiz
                </Link>
                <Link to="/journal" className="btn btn-secondary btn-large">
                  My Journal
                </Link>
              </>
            ) : (
              // Show signup actions for new users
              <>
                <Link to="/signup" className="btn btn-therapy btn-large">
                  Start Your Journey
                </Link>
                <Link to="/therapists" className="btn btn-secondary btn-large">
                  Find Therapists
                </Link>
                <Link to="/quiz" className="btn btn-calm btn-large">
                  Take Matching Quiz
                </Link>
              </>
            )}
          </div>
          <div style={{marginTop: 'var(--space-8)', textAlign: 'center'}}>
            <p style={{color: 'var(--gray-400)', fontSize: 'var(--text-sm)'}}>
              ✅ 100% Confidential • 🛡️ Secure & Private • 💙 Compassionate Care
            </p>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            {user ? '🌟' : '🌈'}<br/>
            {user ? 'Welcome' : 'Mental'}<br/>
            {user ? 'Back!' : 'Wellness'}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: 'var(--space-16) 0', background: 'var(--white)'}}>
        <div className="page-container">
          <div style={{textAlign: 'center', marginBottom: 'var(--space-12)'}}>
            <h2 className="section-title">
              {user ? 'Continue Your Wellness Journey' : 'How Serenica Supports You'}
            </h2>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)'}}>
              {user 
                ? 'Explore tools and resources to support your mental health goals'
                : 'Comprehensive mental health support tailored to your needs'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>👥</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                Therapist Matching
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Connect with licensed mental health professionals who specialize in your specific needs.
              </p>
            </div>
            
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>📊</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                Mood Tracking
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Monitor your emotional patterns and gain insights into your mental health journey.
              </p>
            </div>
            
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>🛟</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                24/7 Resources
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Access guided meditations and coping strategies whenever you need support.
              </p>
            </div>
            
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>🔒</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                Safe Space
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Your privacy is our priority. All sessions and data are completely confidential.
              </p>
            </div>
            
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>📱</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                Always Accessible
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Use Serenica on any device - your support system travels with you.
              </p>
            </div>
            
            <div className="therapy-card">
              <div style={{fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)', textAlign: 'center'}}>❤️</div>
              <h3 style={{fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)', textAlign: 'center'}}>
                Community Support
              </h3>
              <p style={{fontSize: 'var(--text-base)', lineHeight: '1.6', color: 'var(--gray-600)', textAlign: 'center'}}>
                Join supportive groups and connect with others who understand your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{padding: 'var(--space-12) 0', background: 'linear-gradient(135deg, var(--therapy-secondary), var(--therapy-primary))', color: 'var(--white)'}}>
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontSize: 'var(--text-4xl)', fontWeight: '700', marginBottom: 'var(--space-2)'}}>500+</div>
              <div style={{fontSize: 'var(--text-lg)', opacity: '0.9'}}>Licensed Therapists</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontSize: 'var(--text-4xl)', fontWeight: '700', marginBottom: 'var(--space-2)'}}>10K+</div>
              <div style={{fontSize: 'var(--text-lg)', opacity: '0.9'}}>People Helped</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontSize: 'var(--text-4xl)', fontWeight: '700', marginBottom: 'var(--space-2)'}}>24/7</div>
              <div style={{fontSize: 'var(--text-lg)', opacity: '0.9'}}>Support Available</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{fontSize: 'var(--text-4xl)', fontWeight: '700', marginBottom: 'var(--space-2)'}}>98%</div>
              <div style={{fontSize: 'var(--text-lg)', opacity: '0.9'}}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{padding: 'var(--space-16) 0', backgroundColor: 'var(--gray-50)'}}>
        <div className="page-container">
          <div style={{textAlign: 'center', marginBottom: 'var(--space-12)'}}>
            <h2 className="section-title">
              {user ? 'Your Wellness Tools' : 'Getting Started is Simple'}
            </h2>
            <p className="hero-subtitle" style={{color: 'var(--gray-600)'}}>
              {user 
                ? 'Access your personalized mental health resources'
                : 'Begin your mental wellness journey in just a few steps'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
              <div style={{fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', color: 'var(--therapy-primary)'}}>1</div>
              <h4 style={{fontSize: 'var(--text-xl)', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)'}}>
                {user ? 'Track Your Mood' : 'Create Your Profile'}
              </h4>
              <p style={{color: 'var(--gray-600)'}}>
                {user 
                  ? 'Monitor your emotional patterns and progress'
                  : 'Sign up and tell us about your preferences and goals'
                }
              </p>
            </div>
            
            <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
              <div style={{fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', color: 'var(--therapy-primary)'}}>2</div>
              <h4 style={{fontSize: 'var(--text-xl)', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)'}}>
                {user ? 'Connect & Grow' : 'Match with Therapists'}
              </h4>
              <p style={{color: 'var(--gray-600)'}}>
                {user 
                  ? 'Continue sessions and access community support'
                  : 'Browse profiles and find the right professional for you'
                }
              </p>
            </div>
            
            <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
              <div style={{fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', color: 'var(--therapy-primary)'}}>3</div>
              <h4 style={{fontSize: 'var(--text-xl)', color: 'var(--therapy-primary)', marginBottom: 'var(--space-3)'}}>
                {user ? 'Access Resources' : 'Begin Your Journey'}
              </h4>
              <p style={{color: 'var(--gray-600)'}}>
                {user 
                  ? 'Use guided exercises and coping strategies'
                  : 'Start sessions and use our tools to track your progress'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: 'var(--space-16) 0', background: 'var(--gray-50)'}}>
        <div className="page-container">
          <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
            <h2 style={{fontSize: 'var(--text-4xl)', fontWeight: '700', color: 'var(--therapy-primary)', marginBottom: 'var(--space-4)'}}>
              {user ? 'Continue Your Journey' : 'Ready to Take the First Step?'}
            </h2>
            <p style={{fontSize: 'var(--text-xl)', color: 'var(--gray-600)', marginBottom: 'var(--space-8)', lineHeight: '1.6'}}>
              {user 
                ? 'Your mental health journey continues with personalized support and resources.'
                : 'Join thousands of people who have found support and healing through Serenica. Your mental health journey deserves compassion and professional care.'
              }
            </p>
            <div style={{display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap'}}>
              {user ? (
                <>
                  <Link to="/therapists" className="btn btn-therapy btn-large">
                    Find Therapists
                  </Link>
                  <Link to="/quiz" className="btn btn-calm btn-large">
                    Take Matching Quiz
                  </Link>
                  <Link to="/journal" className="btn btn-secondary btn-large">
                    My Journal
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-therapy btn-large">
                    Start for Free
                  </Link>
                  <Link to="/therapists" className="btn btn-secondary btn-large">
                    Meet Our Therapists
                  </Link>
                  <Link to="/quiz" className="btn btn-calm btn-large">
                    Take Matching Quiz
                  </Link>
                </>
              )}
            </div>
            <p style={{marginTop: 'var(--space-4)', color: 'var(--gray-500)', fontSize: 'var(--text-sm)'}}>
              No credit card required • Free 7-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-title">Serenica</div>
            <div className="footer-subtitle">
              Your compassionate mental health companion
            </div>
          </div>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/therapists" className="footer-link">Therapists</Link>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
          </div>
          <div className="footer-copyright">
            &copy; 2024 Serenica. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;