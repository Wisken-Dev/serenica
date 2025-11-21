// src/App.js - UPDATED WITH DASHBOARD AS DEFAULT ROUTE
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Therapists from "./pages/Therapists";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // All African languages with flags
  const africanLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
    { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴' },
    { code: 'rw', name: 'Kinyarwanda', nativeName: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'ln', name: 'Lingala', nativeName: 'Lingála', flag: '🇨🇩' },
    { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', flag: '🇲🇬' },
    { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
    { code: 'st', name: 'Sotho', nativeName: 'Sesotho', flag: '🇱🇸' },
    { code: 'tn', name: 'Tswana', nativeName: 'Setswana', flag: '🇧🇼' },
    { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', flag: '🇲🇱' },
    { code: 'wo', name: 'Wolof', nativeName: 'Wolof', flag: '🇸🇳' },
    { code: 'ff', name: 'Fula', nativeName: 'Fulfulde', flag: '🇬🇳' }
  ];

  // Enhanced translations for all pages
  const translations = {
    en: {
      common: {
        welcome: "Welcome",
        dashboard: "Dashboard",
        journal: "Journal",
        login: "Login",
        logout: "Logout",
        save: "Save",
        cancel: "Cancel",
        home: "Home",
        therapists: "Therapists",
        support: "Support",
        quiz: "Quiz",
        contact: "Contact",
        signup: "Sign Up"
      },
      home: {
        title: "Your Journey to Mental Wellness Starts Here",
        subtitle: "Find peace, healing, and professional support for your mental health journey with Serenica.",
        getStarted: "Get Started",
        findTherapists: "Find Therapists"
      },
      dashboard: {
        title: "Your Wellness Dashboard",
        welcome: "Welcome back",
        subtitle: "Here's your mental wellness overview and recent activity",
        stats: {
          moodStreak: "Day Mood Streak",
          sessionsCompleted: "Sessions Completed",
          journalEntries: "Journal Entries",
          goalsAchieved: "Goals Achieved"
        },
        upcomingSessions: "Upcoming Sessions",
        recentActivity: "Recent Activity",
        quickActions: "Quick Actions",
        joinSession: "Join",
        noSessions: "No upcoming sessions",
        bookSession: "Book a Session",
        activity: {
          moodLogged: "Mood logged",
          journalCompleted: "Journal entry completed",
          sessionCompleted: "Therapy session completed"
        },
        session: {
          video: "Video Call",
          inPerson: "In-Person"
        }
      },
      journal: {
        title: "Mental Health Journal",
        subtitle: "Express your thoughts, track your mood, and reflect on your journey",
        newEntry: "New Journal Entry",
        howFeeling: "How are you feeling today?",
        whatsOnMind: "What's on your mind?",
        saveEntry: "Save Entry",
        recentEntries: "Recent Entries",
        moodOverview: "Mood Overview",
        journalingTips: "Journaling Tips",
        safeSpace: "Your journal is a safe space for reflection.",
        placeholder: "Write about your thoughts, feelings, challenges, or anything you're experiencing...",
        noEntries: "No entries yet"
      },
      moods: {
        sad: "Sad",
        down: "Down",
        neutral: "Neutral",
        happy: "Happy",
        excited: "Excited",
        anxious: "Anxious",
        tired: "Tired",
        angry: "Angry",
        calm: "Calm"
      },
      auth: {
        login: "Login to Your Account",
        signup: "Create Your Account",
        email: "Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        forgotPassword: "Forgot your password?",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?"
      },
      therapists: {
        title: "Find Your Therapist",
        subtitle: "Connect with licensed mental health professionals who understand your needs",
        specialties: "Specialties",
        bookSession: "Book Session"
      },
      quiz: {
        title: "Therapist Matching Quiz",
        subtitle: "Answer a few questions to help us match you with the right therapist",
        question: "Question",
        complete: "Complete",
        next: "Next",
        previous: "Previous",
        skip: "Skip Quiz"
      }
    },
    sw: {
      common: {
        welcome: "Karibu",
        dashboard: "Dashibodi",
        journal: "Daftari",
        login: "Ingia",
        logout: "Toka",
        save: "Hifadhi",
        cancel: "Ghairi",
        home: "Nyumbani",
        therapists: "Watabibu",
        support: "Msaada",
        quiz: "Mtihani",
        contact: "Mawasiliano",
        signup: "Jisajili"
      },
      home: {
        title: "Safari Yako Ya Ustawi Wa Akili Yaanza Hapa",
        subtitle: "Pata utulivu, uponyaji, na usaidizi wa kitaaluma kwa safari yako ya afya ya akili na Serenica.",
        getStarted: "Anza",
        findTherapists: "Tafuta Watabibu"
      },
      dashboard: {
        welcome: "Karibu tena",
        subtitle: "Hapa kuna muonekano wa ustawi wako wa akili na shughuli za hivi karibuni",
        stats: {
          moodStreak: "Mfululizo Wa Siku Za Hisia",
          sessionsCompleted: "Mikutano Imekamilika",
          journalEntries: "Maingizo Ya Daftari",
          goalsAchieved: "Malengo Yalifikiwa"
        },
        upcomingSessions: "Mikutano Inayokuja",
        recentActivity: "Shughuli Za Hivi Karibuni",
        quickActions: "Vitendo Vya Haraka",
        joinSession: "Jiunge",
        noSessions: "Hakuna mikutano inayokuja",
        bookSession: "Panga Mikutano",
        activity: {
          moodLogged: "Hisia zilirekodiwa",
          journalCompleted: "Ingizo la daftari limekamilika",
          sessionCompleted: "Mkutano wa tiba umekamilika"
        },
        session: {
          video: "Simu ya Video",
          inPerson: "Kwa Mtu Binafsi"
        }
      }
    },
    fr: {
      common: {
        welcome: "Bienvenue",
        dashboard: "Tableau de bord",
        journal: "Journal",
        login: "Connexion",
        logout: "Déconnexion",
        save: "Sauvegarder",
        cancel: "Annuler",
        home: "Accueil",
        therapists: "Thérapeutes",
        support: "Soutien",
        quiz: "Quiz",
        contact: "Contact",
        signup: "S'inscrire"
      },
      home: {
        title: "Votre voyage vers le bien-être mental commence ici",
        subtitle: "Trouvez la paix, la guérison et un soutien professionnel pour votre parcours de santé mentale avec Serenica.",
        getStarted: "Commencer",
        findTherapists: "Trouver des thérapeutes"
      }
    },
    ar: {
      common: {
        welcome: "مرحباً",
        dashboard: "لوحة التحكم",
        journal: "يوميات",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        save: "حفظ",
        cancel: "إلغاء",
        home: "الرئيسية",
        therapists: "المعالجين",
        support: "الدعم",
        quiz: "اختبار",
        contact: "اتصال",
        signup: "اشتراك"
      },
      home: {
        title: "رحلتك نحو الصحة النفسية تبدأ من هنا",
        subtitle: "ابحث عن السلام والشفاء والدعم المهني لرحلتك في الصحة النفسية مع Serenica.",
        getStarted: "ابدأ الآن",
        findTherapists: "ابحث عن المعالجين"
      }
    }
  };

  // Translation function
  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) return fallback || key;
    }
    
    return value || fallback || key;
  };

  // Get current language info
  const currentLanguage = africanLanguages.find(lang => lang.code === language) || africanLanguages[0];

  // Check if user is logged in on app start (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Language switcher component
  const LanguageSwitcher = () => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: 'transparent',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#475569',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f8fafc';
          e.target.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.borderColor = '#e2e8f0';
        }}
      >
        <span style={{ fontSize: '16px' }}>🌍</span>
        <span style={{ fontWeight: '500' }}>{currentLanguage.code.toUpperCase()}</span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>▼</span>
      </button>

      {/* Language Dropdown */}
      {showLanguageDropdown && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '5px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            minWidth: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}
          onMouseLeave={() => setShowLanguageDropdown(false)}
        >
          {africanLanguages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setShowLanguageDropdown(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: language === lang.code ? '#f1f5f9' : 'white',
                border: 'none',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = language === lang.code ? '#f1f5f9' : 'white';
              }}
            >
              <span style={{ fontSize: '18px' }}>{lang.flag}</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{lang.name}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{lang.nativeName}</span>
              </div>
              {language === lang.code && (
                <span style={{ marginLeft: 'auto', color: '#4f46e5', fontWeight: 'bold' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Router>
      {/* Global Language Switcher - Fixed position */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <LanguageSwitcher />
      </div>

      <Routes>
        {/* UPDATED: Default route shows Dashboard if user is logged in, HomePage if not */}
        <Route 
          path="/" 
          element={
            user ? 
            <Dashboard user={user} language={language} t={t} /> : 
            <HomePage user={user} onLogout={handleLogout} language={language} t={t} />
          } 
        />
        <Route path="/signup" element={<Signup setUser={setUser} language={language} t={t} />} />
        <Route path="/login" element={<Login setUser={setUser} language={language} t={t} />} />
        <Route path="/therapists" element={<Therapists user={user} language={language} t={t} />} />
        <Route path="/quiz" element={<Quiz user={user} language={language} t={t} />} />
        <Route path="/dashboard" element={<Dashboard user={user} language={language} t={t} />} />
        <Route path="/journal" element={<Journal user={user} language={language} t={t} />} />
        <Route path="/contact" element={<Contact user={user} language={language} t={t} />} />
        <Route path="/logout" element={
          <div className="page-container">
            <div className="therapy-card text-center">
              <h2>{t('common.logout', 'Logged Out')}</h2>
              <p>You have been successfully logged out.</p>
              <a href="/" className="btn btn-therapy">{t('common.home', 'Return to Home')}</a>
            </div>
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000
            }}>
              <LanguageSwitcher />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;