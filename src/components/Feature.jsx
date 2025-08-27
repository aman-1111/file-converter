import React from "react";
import { FaBolt, FaLock, FaFileAlt, FaCloudUploadAlt, FaMagic, FaGlobe } from "react-icons/fa";

function Feature({ icon, title, description }) {
  return (
    <div className="col text-center mb-4">
      {/* Icon Container */}
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
        style={{ 
          width: "60px", 
          height: "60px",
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          color: "#ffffff"
        }}
      >
        <span style={{ fontSize: "24px" }}>{icon}</span>
      </div>
      {/* Title */}
      <h5 className="fw-bold" style={{ color: "#312e81" }}>{title}</h5>
      {/* Description */}
      <p style={{ color: "#64748b" }}>{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <FaBolt />,
      title: "Fast & Easy",
      description: "Convert files instantly with just a few clicks – no complicated setup needed."
    },
    {
      icon: <FaFileAlt />,
      title: "Multiple Formats",
      description: "Supports documents, images, audio, and video files across popular formats."
    },
    {
      icon: <FaLock />,
      title: "Secure & Private",
      description: "Your files are safe – we never store or share your uploaded content."
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Online Access",
      description: "Use from any device, anytime, without installing extra software."
    },
    {
      icon: <FaMagic />,
      title: "User-Friendly",
      description: "Clean and simple interface designed for everyone, even beginners."
    },
    {
      icon: <FaGlobe />,
      title: "Free to Use",
      description: "Enjoy powerful file conversions without hidden charges."
    }
  ];

  return (
    <section className="container my-5">
      <h2 
        className="text-center fw-bold mb-4" 
        style={{ 
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        Why Choose Our File Converter?
      </h2>
      <div className="row">
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;