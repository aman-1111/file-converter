import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white" style={{ background: "linear-gradient(90deg, #312e81, #581c87)", color: "#e0e7ff" }}>
      <div className="container py-4">
        <div className="row text-center text-md-left align-items-center">

          {/* Left Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">File Converter Pro</h5>
            <p className="mb-0 small">
              Transforming documents with speed and precision.<br />
              © {new Date().getFullYear()} All rights reserved.<br />
              Built by <span className="fw-semibold">Aman Chaurasia</span>
            </p>
          </div>

          {/* Middle Section - Links */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center">
            <ul className="list-unstyled d-flex gap-4 mb-0">
              <li>
                <Link to="/" className="text-white text-decoration-none fw-semibold footer-link">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-white text-decoration-none fw-semibold footer-link">Features</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none fw-semibold footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right Section - Social Icons */}
          <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-3">
            <a href="https://x.com/aman_14366" className="text-white fs-5 footer-icon"><i className="bi bi-twitter-x"></i></a>
            <a href="https://github.com/aman-1111" className="text-white fs-5 footer-icon"><i className="bi bi-github"></i></a>
            <a href="https://www.instagram.com/amanchaurasia._/" className="text-white fs-5 footer-icon"><i className="bi bi-instagram"></i></a>
          </div>

        </div>
      </div>

      {/* Extra CSS for hover effects */}
      <style>{`
        .footer-link:hover {
          text-decoration: underline;
        }
        .footer-icon:hover {
          color: #FFD700; /* golden hover effect */
        }
      `}</style>
    </footer>
  );
}

export default Footer;
