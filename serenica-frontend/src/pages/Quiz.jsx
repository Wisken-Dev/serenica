import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = ({ user }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  console.log('Quiz answers:', answers);

  const quizQuestions = [
    {
      id: 1,
      question: "What brings you to Serenica today?",
      options: [
        "Anxiety or stress management",
        "Depression or mood issues", 
        "Relationship or family concerns",
        "Trauma or PTSD",
        "Personal growth and self-discovery",
        "Other specific concerns"
      ]
    },
    {
      id: 2,
      question: "What type of therapy approach interests you?",
      options: [
        "Cognitive Behavioral Therapy (CBT) - Practical strategies",
        "Mindfulness and meditation-based",
        "Psychodynamic - Exploring past experiences",
        "Humanistic - Personal growth focused",
        "Solution-focused - Goal oriented",
        "I'm not sure, I'd like guidance"
      ]
    },
    {
      id: 3,
      question: "What are your preferences for therapist matching?",
      options: [
        "Gender-specific therapist",
        "Cultural background understanding",
        "Similar life experiences",
        "Specialized expertise in my concern",
        "No specific preferences",
        "Open to any qualified professional"
      ]
    },
    {
      id: 4,
      question: "How would you describe your current support system?",
      options: [
        "Strong - I have good support from friends/family",
        "Moderate - Some support but could be better", 
        "Limited - I don't have much support",
        "Isolated - I'm dealing with this mostly alone",
        "Complicated - My situation is complex"
      ]
    },
    {
      id: 5,
      question: "What are your goals for therapy?",
      options: [
        "Immediate crisis management",
        "Long-term personal growth",
        "Specific skill development",
        "Understanding myself better",
        "Improving relationships",
        "General emotional well-being"
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Auto-advance to next question after short delay
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Quiz completed - show results
        handleQuizComplete();
      }
    }, 500);
  };

  const handleQuizComplete = () => {
    navigate("/therapists", { 
      state: { 
        message: "Quiz completed! Here are therapists matching your preferences.",
        fromQuiz: true 
      } 
    });
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  if (currentStep >= quizQuestions.length) {
    return (
      <div className="page-container">
        <div className="therapy-card text-center">
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          <h2>Finding Your Perfect Match...</h2>
          <p>Analyzing your preferences to connect you with the right therapists.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentStep];

  return (
    <div className="page-container">
      <div className="therapy-card">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h1 className="page-title">Therapist Matching Quiz</h1>
          <p className="page-subtitle">
            Answer a few questions to help us match you with therapists who understand your needs
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: 'var(--text-sm)', 
            color: 'var(--gray-600)',
            marginBottom: 'var(--space-2)'
          }}>
            <span>Question {currentStep + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{ 
            width: '100%', 
            backgroundColor: 'var(--gray-200)', 
            borderRadius: '9999px', 
            height: '12px' 
          }}>
            <div 
              style={{ 
                background: 'linear-gradient(to right, var(--therapy-primary), var(--therapy-accent))',
                height: '12px',
                borderRadius: '9999px',
                transition: 'all 0.5s',
                width: `${progress}%`
              }}
            ></div>
          </div>
        </div>

        {/* Current Question */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ 
            fontSize: 'var(--text-2xl)', 
            fontWeight: '600', 
            color: 'var(--gray-800)',
            marginBottom: 'var(--space-4)'
          }}>
            {currentQuestion.question}
          </h2>
          <p style={{ color: 'var(--gray-600)' }}>
            Select the option that best describes your situation
          </p>
        </div>

        {/* Options */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'var(--space-4)'
        }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className="therapy-card"
              style={{ 
                textAlign: 'left',
                padding: 'var(--space-6)',
                border: '2px solid transparent',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.borderColor = 'var(--therapy-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--therapy-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--therapy-primary)',
                  fontWeight: '600'
                }}>
                  {index + 1}
                </div>
                <span style={{ fontWeight: '500', color: 'var(--gray-800)' }}>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: 'var(--space-8)' 
        }}>
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="btn btn-secondary"
          >
            ← Previous
          </button>
          
          <button
            onClick={() => navigate('/therapists')}
            className="btn btn-secondary"
          >
            Skip Quiz
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div style={{ 
            marginTop: 'var(--space-6)', 
            padding: 'var(--space-4)', 
            backgroundColor: 'var(--therapy-soft)', 
            borderRadius: 'var(--radius)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--therapy-primary)', fontWeight: '500' }}>
              Welcome, {user.name}! Your answers will help us personalize your experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;