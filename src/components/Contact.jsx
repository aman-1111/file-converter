import React from "react";

function Contact() {
  return (
    <section className="container mt-5 mb-5 text-center">
      <h2 
        className="mb-4" 
        style={{ 
          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "bold"
        }}
      >
        Contact Us
      </h2>
      <p 
        className="lead" 
        style={{ color: "#64748b" }}
      >
        Have questions, feedback, or suggestions?
        Feel free to reach out to us anytime.
      </p>
      <div className="mt-4">
        <h5 style={{ color: "#312e81" }}>Email Us At:</h5>
        <a
          href="mailto:amanchaurasia@example.com"
          className="px-4 mt-2 btn"
          style={{
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            textDecoration: "none"
          }}
        >
          amanchaurasia@example.com
        </a>
      </div>
    </section>
  );
}

export default Contact;