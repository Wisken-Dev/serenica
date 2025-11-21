import React, { useState } from "react";

const Journal = ({ user, language, t }) => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [mood, setMood] = useState("neutral");
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTherapistConnect, setShowTherapistConnect] = useState(false);

  // Simple RTL detection
  const isRTL = language === 'ar';

  // Mood options
  const moods = [
    { emoji: "😢", value: "sad", label: "Sad" },
    { emoji: "😔", value: "down", label: "Down" },
    { emoji: "😐", value: "neutral", label: "Neutral" },
    { emoji: "😊", value: "happy", label: "Happy" },
    { emoji: "😄", value: "excited", label: "Excited" },
    { emoji: "😰", value: "anxious", label: "Anxious" },
    { emoji: "😴", value: "tired", label: "Tired" },
    { emoji: "😡", value: "angry", label: "Angry" },
    { emoji: "😌", value: "calm", label: "Calm" }
  ];

  // AI analysis function
  const analyzeEntry = (content, selectedMood) => {
    const contentLower = content.toLowerCase();
    
    // Detect critical issues
    const criticalKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'harm myself'];
    const isCritical = criticalKeywords.some(keyword => contentLower.includes(keyword));
    
    // Detect anxiety
    const anxietyKeywords = ['anxious', 'panic', 'worry', 'scared', 'fear', 'nervous', 'overwhelmed'];
    const hasAnxiety = anxietyKeywords.some(keyword => contentLower.includes(keyword));
    
    // Detect depression
    const depressionKeywords = ['depressed', 'sad', 'empty', 'worthless', 'guilty', 'lonely', 'cry'];
    const hasDepression = depressionKeywords.some(keyword => contentLower.includes(keyword));

    // Generate AI suggestions
    const suggestions = {
      isCritical,
      immediateActions: [
        "Take 5 deep breaths",
        "Drink a glass of water", 
        "Step outside for fresh air",
        "Practice grounding technique"
      ],
      breathingExercises: [
        {
          title: "4-7-8 Breathing",
          description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds",
          steps: ["4s inhale", "7s hold", "8s exhale"]
        },
        {
          title: "Box Breathing", 
          description: "Equal duration for each phase",
          steps: ["4s inhale", "4s hold", "4s exhale", "4s hold"]
        }
      ],
      books: [
        {
          title: "The Anxiety and Phobia Workbook",
          author: "Edmund Bourne",
          description: "Comprehensive guide for anxiety management",
          link: "https://www.amazon.com/Anxiety-Phobia-Workbook-Edmund-Bourne/dp/1572248919"
        }
      ],
      videos: [
        {
          title: "Mindfulness Meditation for Anxiety",
          creator: "The Honest Guys", 
          duration: "20 min",
          link: "https://www.youtube.com/watch?v=6p_yaNFSYao",
          description: "Guided meditation for anxiety relief"
        }
      ],
      exercises: [
        {
          title: "Progressive Muscle Relaxation",
          description: "Tense and relax each muscle group",
          duration: "10-15 min",
          benefits: ["Reduces physical tension", "Promotes relaxation"]
        }
      ]
    };

    // Add therapist recommendation for critical issues
    if (isCritical) {
      suggestions.therapistRecommendation = {
        urgent: true,
        message: "Based on your entry, we recommend speaking with a mental health professional immediately.",
        action: "Connect with a therapist now",
        resources: [
          "Crisis Text Line: Text HOME to 741741",
          "National Suicide Prevention Lifeline: 988", 
          "Emergency Services: 911"
        ]
      };
    }

    return suggestions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentEntry.trim()) return;

    setIsAnalyzing(true);
    
    // Create new entry
    const newEntry = {
      id: Date.now(),
      content: currentEntry,
      mood: mood,
      date: new Date().toISOString(),
      timestamp: new Date()
    };

    // Simulate AI analysis
    setTimeout(() => {
      const suggestions = analyzeEntry(currentEntry, mood);
      
      setEntries(prev => [newEntry, ...prev]);
      setAiSuggestions(suggestions);
      
      if (suggestions.isCritical) {
        setShowTherapistConnect(true);
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleClear = () => {
    setCurrentEntry("");
    setAiSuggestions(null);
    setShowTherapistConnect(false);
  };

  const handleConnectTherapist = () => {
    alert("Redirecting to therapist matching service...");
    // In real app: window.location.href = '/therapists';
  };

  return (
    <div className="page-container" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>AI Mental Health Journal</h1>
        <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.9 }}>
          Express your thoughts and get AI-powered wellness recommendations
        </p>
        {user && (
          <p style={{ color: "white", opacity: "0.9", marginTop: '10px' }}>
            Welcome, {user.name}! Your journal is a safe space for reflection.
          </p>
        )}
      </div>

      {/* Critical Alert */}
      {showTherapistConnect && aiSuggestions?.therapistRecommendation && (
        <div style={{ 
          backgroundColor: '#fee2e2', 
          border: '2px solid #ef4444',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>🚨</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#dc2626', margin: '0 0 10px 0' }}>
                Immediate Support Recommended
              </h3>
              <p style={{ color: '#7f1d1d', margin: '0 0 15px 0' }}>
                {aiSuggestions.therapistRecommendation.message}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleConnectTherapist}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {aiSuggestions.therapistRecommendation.action}
                </button>
                {aiSuggestions.therapistRecommendation.resources.map((resource, index) => (
                  <span key={index} style={{
                    backgroundColor: '#fecaca',
                    color: '#7f1d1d',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px'
      }}>
        {/* Journal Form */}
        <div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>New Journal Entry</h3>
            
            {/* Mood Selection */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "#374151" }}>
                How are you feeling today?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {moods.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    style={{
                      padding: '10px',
                      border: mood === m.value ? '2px solid #667eea' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: mood === m.value ? '#667eea' : 'white',
                      color: mood === m.value ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '20px'
                    }}
                    type="button"
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px', color: '#667eea', fontWeight: '500' }}>
                {moods.find(m => m.value === mood)?.label}
              </div>
            </div>

            {/* Journal Textarea */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#374151' }}>
                  What's on your mind?
                </label>
                <textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  style={{ 
                    width: '100%',
                    minHeight: "200px", 
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    resize: 'vertical',
                    textAlign: isRTL ? 'right' : 'left',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Write about your thoughts, feelings, challenges, or anything you're experiencing..."
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  type="submit" 
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  disabled={isAnalyzing || !currentEntry.trim()}
                >
                  {isAnalyzing ? "AI Analyzing..." : "Save Entry & Get AI Suggestions"}
                </button>
                <button 
                  type="button" 
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onClick={handleClear}
                  disabled={isAnalyzing}
                >
                  Clear
                </button>
                {isAnalyzing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#667eea' }}>
                    <div>⏳</div>
                    <span>AI is analyzing your entry...</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && !isAnalyzing && (
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginTop: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ fontSize: '24px' }}>🤖</div>
                <h3 style={{ margin: 0, color: '#333' }}>
                  Your AI Wellness Recommendations
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Immediate Actions */}
                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>
                    💫 Quick Actions
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {aiSuggestions.immediateActions.map((action, index) => (
                      <span key={index} style={{
                        backgroundColor: '#e0e7ff',
                        color: '#667eea',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Breathing Exercises */}
                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>
                    🌬️ Breathing Exercises
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    {aiSuggestions.breathingExercises.map((exercise, index) => (
                      <div key={index} style={{
                        backgroundColor: '#f9fafb',
                        padding: '15px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>
                          {exercise.title}
                        </h5>
                        <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
                          {exercise.description}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {exercise.steps.map((step, stepIndex) => (
                            <span key={stepIndex} style={{
                              backgroundColor: '#e0e7ff',
                              color: '#667eea',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {step}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Recommendations */}
                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>
                    📚 Recommended Books
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {aiSuggestions.books.map((book, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '15px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <h5 style={{ margin: '0 0 5px 0', color: '#374151' }}>
                            {book.title}
                          </h5>
                          <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '14px' }}>
                            by {book.author}
                          </p>
                          <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px' }}>
                            {book.description}
                          </p>
                        </div>
                        <a 
                          href={book.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#667eea',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          View Book
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Recommendations */}
                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>
                    🎥 Helpful Videos
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                    {aiSuggestions.videos.map((video, index) => (
                      <div key={index} style={{
                        backgroundColor: '#f9fafb',
                        padding: '15px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h5 style={{ margin: '0 0 10px 0', color: '#374151' }}>
                          {video.title}
                        </h5>
                        <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
                          {video.creator} • {video.duration}
                        </p>
                        <p style={{ margin: '0 0 15px 0', color: '#9ca3af', fontSize: '12px' }}>
                          {video.description}
                        </p>
                        <a 
                          href={video.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#667eea',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          Watch Video
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercise Recommendations */}
                <div>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>
                    💪 Wellness Exercises
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    {aiSuggestions.exercises.map((exercise, index) => (
                      <div key={index} style={{
                        backgroundColor: '#f9fafb',
                        padding: '15px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>
                          {exercise.title}
                        </h5>
                        <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
                          {exercise.description}
                        </p>
                        <p style={{ margin: '0 0 10px 0', color: '#9ca3af', fontSize: '12px' }}>
                          ⏱️ {exercise.duration}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {exercise.benefits.map((benefit, benefitIndex) => (
                            <span key={benefitIndex} style={{
                              color: '#667eea',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}>
                              ✓ {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Entries */}
          {entries.length > 0 && (
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginTop: '20px'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Recent Entries</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {entries.slice(0, 5).map(entry => (
                  <div key={entry.id} style={{
                    padding: '15px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px' }}>
                        {moods.find(m => m.value === entry.mood)?.emoji}
                      </span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#374151' }}>{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;