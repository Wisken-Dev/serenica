// src/pages/Therapists.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added import

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockTherapists = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Anxiety & Depression",
        experience: "8 years",
        rating: 4.9,
        image: "👩‍⚕️",
        description: "Specialized in CBT and mindfulness-based approaches for anxiety disorders.",
        available: true
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Relationship Counseling",
        experience: "12 years",
        rating: 4.8,
        image: "👨‍⚕️",
        description: "Focuses on couples therapy and family dynamics with a compassionate approach.",
        available: true
      },
      {
        id: 3,
        name: "Dr. Maria Rodriguez",
        specialty: "Trauma & PTSD",
        experience: "10 years",
        rating: 4.9,
        image: "👩‍⚕️",
        description: "EMDR certified therapist with expertise in trauma recovery and resilience building.",
        available: false
      },
      {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Addiction Recovery",
        experience: "15 years",
        rating: 4.7,
        image: "👨‍⚕️",
        description: "Specializes in substance abuse and behavioral addiction treatments.",
        available: true
      },
      {
        id: 5,
        name: "Dr. Emily Parker",
        specialty: "Child & Adolescent",
        experience: "6 years",
        rating: 4.8,
        image: "👩‍⚕️",
        description: "Play therapy and adolescent counseling with family involvement.",
        available: true
      },
      {
        id: 6,
        name: "Dr. Robert Kim",
        specialty: "Anxiety & Depression",
        experience: "9 years",
        rating: 4.9,
        image: "👨‍⚕️",
        description: "Integrative therapy combining traditional and modern approaches.",
        available: true
      }
    ];

    setTimeout(() => {
      setTherapists(mockTherapists);
      setIsLoading(false);
    }, 1000);
  }, []);

  const specialties = ["all", "Anxiety & Depression", "Relationship Counseling", "Trauma & PTSD", "Addiction Recovery", "Child & Adolescent"];

  const filteredTherapists = selectedSpecialty === "all" 
    ? therapists 
    : therapists.filter(therapist => therapist.specialty === selectedSpecialty);

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ color: "var(--gray-600)" }}>Loading therapists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="therapy-hero text-center">
        <h1 className="hero-title">Find Your Therapist</h1>
        <p className="hero-subtitle">
          Connect with licensed mental health professionals who can help you on your journey
        </p>
      </div>

      {/* Filters */}
      <div className="therapy-card mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="section-title" style={{ marginBottom: "0" }}>Specialties</h3>
            <p style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>
              Filter by area of expertise
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <button
                key={specialty}
                className={`btn ${selectedSpecialty === specialty ? 'btn-therapy' : 'btn-secondary'}`}
                onClick={() => setSelectedSpecialty(specialty)}
                style={{ 
                  fontSize: "var(--text-sm)",
                  padding: "var(--space-2) var(--space-4)",
                  textTransform: "capitalize"
                }}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Therapists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map(therapist => (
          <div key={therapist.id} className="therapy-card">
            <div className="text-center mb-4">
              <div 
                className="text-4xl mb-3" 
                style={{ 
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {therapist.image}
              </div>
              <h3 className="section-title" style={{ marginBottom: "var(--space-2)", fontSize: "var(--text-xl)" }}>
                {therapist.name}
              </h3>
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: "var(--gray-100)",
                  color: "var(--therapy-primary)"
                }}
              >
                {therapist.specialty}
              </span>
            </div>

            <div style={{ marginBottom: "var(--space-4)" }}>
              <p style={{ color: "var(--gray-600)", lineHeight: "1.6" }}>
                {therapist.description}
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div style={{ color: "var(--gray-600)", fontSize: "var(--text-sm)" }}>
                ⭐ {therapist.rating} • {therapist.experience}
              </div>
              <div style={{ 
                fontSize: "var(--text-sm)",
                fontWeight: "600",
                color: therapist.available ? "var(--therapy-secondary)" : "var(--danger)"
              }}>
                {therapist.available ? "✅ Available" : "❌ Busy"}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-therapy flex-1">
                View Profile
              </button>
              <button 
                className="btn btn-calm flex-1"
                disabled={!therapist.available}
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTherapists.length === 0 && (
        <div className="therapy-card text-center">
          <div className="error-container">
            <div className="error-icon">🔍</div>
            <h3 style={{ color: "var(--gray-700)", marginBottom: "var(--space-2)" }}>
              No therapists found
            </h3>
            <p style={{ color: "var(--gray-600)" }}>
              Try selecting a different specialty or check back later for new therapists.
            </p>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="therapy-card mt-8">
        <div className="text-center">
          <h3 className="section-title">Need Help Choosing?</h3>
          <p style={{ color: "var(--gray-600)", marginBottom: "var(--space-4)" }}>
            Our matching system can help you find the perfect therapist for your needs
          </p>
          <Link to="/quiz" className="btn btn-therapy"> {/* Changed from button to Link */}
            Take Matching Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Therapists;