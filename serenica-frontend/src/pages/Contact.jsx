// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
    urgency: "normal"
  });

  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      subject: "",
      message: "",
      urgency: "normal"
    });
  };

  const handleQuickHelpClick = (faqType) => {
    setActiveFAQ(activeFAQ === faqType ? null : faqType);
    
    // Pre-fill the form based on the quick help selection
    const quickHelpData = {
      "booking": {
        subject: "How to Book a Session",
        message: "I need help understanding how to book a therapy session. Could you guide me through the process?"
      },
      "technical": {
        subject: "Technical Support Needed",
        message: "I'm experiencing technical issues with the platform. Here's what's happening:"
      },
      "billing": {
        subject: "Billing Question",
        message: "I have a question about my billing or subscription:"
      },
      "privacy": {
        subject: "Privacy Concerns",
        message: "I have concerns about privacy and data security:"
      }
    };

    if (quickHelpData[faqType]) {
      setFormData(prev => ({
        ...prev,
        subject: quickHelpData[faqType].subject,
        message: quickHelpData[faqType].message
      }));
    }
  };

  const emergencyContacts = [
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis counseling"
    },
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 confidential support"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse"
    }
  ];

  const faqContent = {
    "booking": {
      title: "How to Book a Session",
      content: "To book a therapy session:\n\n1. Go to the 'Therapists' page\n2. Browse available therapists or take our matching quiz\n3. Click 'Book Session' on a therapist's profile\n4. Choose your preferred date and time\n5. Select session type (video, phone, or in-person)\n6. Confirm your booking\n\nYou'll receive a confirmation email with session details."
    },
    "technical": {
      title: "Technical Support",
      content: "Common solutions:\n\n• Clear your browser cache and cookies\n• Try a different browser (Chrome, Firefox, Safari)\n• Check your internet connection\n• Update your browser to the latest version\n• Ensure your camera/microphone permissions are enabled\n\nIf issues persist, please describe your problem in the message above."
    },
    "billing": {
      title: "Billing & Payments",
      content: "Billing information:\n\n• Sessions are billed after completion\n• We accept major credit cards and HSA/FSA cards\n• Cancel anytime - no long-term contracts\n• Insurance may cover sessions (check with provider)\n• Receipts are provided for insurance reimbursement\n\nFor specific billing questions, please provide details above."
    },
    "privacy": {
      title: "Privacy & Security",
      content: "Your privacy is our priority:\n\n• All sessions are encrypted and confidential\n• We comply with HIPAA privacy standards\n• Your data is never sold to third parties\n• You can download or delete your data anytime\n• Therapists are bound by strict confidentiality agreements\n\nFor specific privacy concerns, please elaborate above."
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="therapy-hero text-center">
        <h1 className="hero-title">Get in Touch</h1>
        <p className="hero-subtitle">
          We're here to support you. Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="therapy-card">
            <h3 className="section-title">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Urgency</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Need support</option>
                    <option value="high">High - Urgent matter</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ minHeight: "150px" }}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-therapy">
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Content Display */}
          {activeFAQ && (
            <div className="therapy-card mt-6">
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start",
                marginBottom: "var(--space-4)"
              }}>
                <h4 style={{ 
                  fontSize: "var(--text-lg)", 
                  fontWeight: "600", 
                  color: "var(--therapy-primary)",
                  margin: 0
                }}>
                  {faqContent[activeFAQ].title}
                </h4>
                <button 
                  onClick={() => setActiveFAQ(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "var(--text-xl)",
                    cursor: "pointer",
                    color: "var(--gray-500)"
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ 
                backgroundColor: "var(--gray-50)", 
                padding: "var(--space-4)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--gray-200)"
              }}>
                <pre style={{ 
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  fontSize: "var(--text-sm)",
                  color: "var(--gray-700)",
                  lineHeight: "1.6",
                  margin: 0
                }}>
                  {faqContent[activeFAQ].content}
                </pre>
              </div>
              <div style={{ 
                marginTop: "var(--space-4)",
                padding: "var(--space-3)",
                backgroundColor: "var(--therapy-soft)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--therapy-calm)"
              }}>
                <p style={{ 
                  fontSize: "var(--text-sm)", 
                  color: "var(--therapy-primary)",
                  margin: 0,
                  fontWeight: "600"
                }}>
                  💡 This information has been pre-filled in the form above. Feel free to edit or add more details!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Emergency Support */}
          <div className="therapy-card" style={{ 
            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
            border: "2px solid #f59e0b"
          }}>
            <div className="text-center mb-4">
              <div style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-2)" }}>🆘</div>
              <h3 style={{ 
                fontSize: "var(--text-xl)", 
                fontWeight: "700", 
                color: "#d97706",
                marginBottom: "var(--space-2)"
              }}>
                Emergency Support
              </h3>
              <p style={{ color: "#92400e", fontSize: "var(--text-sm)" }}>
                Available 24/7 for immediate help
              </p>
            </div>
            
            <div style={{ 
              background: "rgba(255, 255, 255, 0.7)", 
              padding: "var(--space-4)",
              borderRadius: "var(--radius)",
              marginBottom: "var(--space-3)"
            }}>
              {emergencyContacts.map((contact, index) => (
                <div key={index} style={{ marginBottom: "var(--space-3)", paddingBottom: "var(--space-3)", borderBottom: index < emergencyContacts.length - 1 ? "1px solid #fbbf24" : "none" }}>
                  <div style={{ fontWeight: "600", color: "#d97706", marginBottom: "var(--space-1)" }}>
                    {contact.name}
                  </div>
                  <div style={{ color: "#92400e", fontSize: "var(--text-sm)", fontWeight: "600" }}>
                    {contact.number}
                  </div>
                  <div style={{ color: "#92400e", fontSize: "var(--text-xs)" }}>
                    {contact.description}
                  </div>
                </div>
              ))}
            </div>
            
            <p style={{ 
              fontSize: "var(--text-xs)", 
              color: "#92400e", 
              fontStyle: "italic",
              textAlign: "center"
            }}>
              If you're in immediate danger, please call your local emergency services.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="therapy-card">
            <h3 className="section-title">Other Ways to Reach Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--therapy-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--therapy-primary)",
                  fontSize: "var(--text-lg)",
                  flexShrink: 0
                }}>
                  📧
                </div>
                <div>
                  <h4 style={{ fontWeight: "600", color: "var(--gray-800)", marginBottom: "var(--space-1)" }}>
                    Email Support
                  </h4>
                  <p style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>
                    support@serenica.com
                  </p>
                  <p style={{ color: "var(--gray-500)", fontSize: "var(--text-xs)" }}>
                    Response within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--therapy-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--therapy-primary)",
                  fontSize: "var(--text-lg)",
                  flexShrink: 0
                }}>
                  💬
                </div>
                <div>
                  <h4 style={{ fontWeight: "600", color: "var(--gray-800)", marginBottom: "var(--space-1)" }}>
                    Live Chat
                  </h4>
                  <p style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>
                    Available Mon-Fri, 9AM-6PM
                  </p>
                  <p style={{ color: "var(--gray-500)", fontSize: "var(--text-xs)" }}>
                    Quick answers to your questions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--therapy-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--therapy-primary)",
                  fontSize: "var(--text-lg)",
                  flexShrink: 0
                }}>
                  📞
                </div>
                <div>
                  <h4 style={{ fontWeight: "600", color: "var(--gray-800)", marginBottom: "var(--space-1)" }}>
                    Phone Support
                  </h4>
                  <p style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>
                    1-800-SERENICA
                  </p>
                  <p style={{ color: "var(--gray-500)", fontSize: "var(--text-xs)" }}>
                    Mon-Fri, 8AM-8PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="therapy-card">
            <h3 className="section-title">Quick Help</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickHelpClick("booking")}
                className="btn btn-secondary w-full text-left justify-start"
              >
                How to book a session?
              </button>
              <button 
                onClick={() => handleQuickHelpClick("technical")}
                className="btn btn-secondary w-full text-left justify-start"
              >
                Technical support
              </button>
              <button 
                onClick={() => handleQuickHelpClick("billing")}
                className="btn btn-secondary w-full text-left justify-start"
              >
                Billing questions
              </button>
              <button 
                onClick={() => handleQuickHelpClick("privacy")}
                className="btn btn-secondary w-full text-left justify-start"
              >
                Privacy concerns
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;