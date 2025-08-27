import React, { useState } from "react";
import { Upload, FileText, Download, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function App() {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState("");
  const [convertedFile, setConvertedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const conversionOptions = [
    { value: "pdf-to-word", label: "PDF to Word", icon: "📄➜📝", ext: ".docx" },
    { value: "word-to-pdf", label: "Word to PDF", icon: "📝➜📄", ext: ".pdf" },
    { value: "odt-to-pdf", label: "ODT to PDF", icon: "📋➜📄", ext: ".pdf" },
    { value: "odt-to-word", label: "ODT to Word", icon: "📋➜📝", ext: ".docx" }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setConvertedFile(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setConvertedFile(null);
    }
  };

  const handleConversion = async () => {
    if (!file || !conversionType) {
      return;
    }
    
    setIsConverting(true);
    
    // Simulate conversion delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedOption = conversionOptions.find(opt => opt.value === conversionType);
    const fakeFile = new Blob(["This is a converted file."], {
      type: "application/octet-stream",
    });
    
    let fileName = file.name.split(".")[0] + selectedOption.ext;
    setConvertedFile({ blob: fakeFile, name: fileName });
    setIsConverting(false);
  };

  const handleDownload = () => {
    if (!convertedFile) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(convertedFile.blob);
    link.download = convertedFile.name;
    link.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-5">
          {/* Header */}
          <div className="text-center mb-5 pt-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-lg" 
                 style={{ width: '64px', height: '64px', background: 'linear-gradient(45deg, #6366f1, #8b5cf6)' }}>
              <Zap size={32} color="white" />
            </div>
            <h1 className="display-4 fw-bold mb-3 text-white">
              File Converter Pro
            </h1>
            <p className="lead text-white-50">Transform your documents instantly with professional quality</p>
          </div>

          {/* Main Card */}
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">
              <div className="card shadow-lg border-0" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                {/* Progress Bar */}
                <div className="progress" style={{ height: '6px', borderRadius: '0' }}>
                  <div 
                    className="progress-bar"
                    style={{ 
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      width: !file ? '0%' : !conversionType ? '33%' : convertedFile ? '100%' : '66%',
                      transition: 'width 0.5s ease'
                    }}
                  ></div>
                </div>

                <div className="card-body p-5">
                  {/* File Upload Section */}
                  <div className="mb-5">
                    <label className="form-label fw-semibold text-dark mb-3">
                      <strong>Step 1: Upload Your File</strong>
                    </label>
                    <div
                      className={`border border-2 border-dashed rounded-4 p-5 text-center position-relative ${
                        dragActive ? 'border-primary bg-primary bg-opacity-10' : 
                        file ? 'border-success bg-success bg-opacity-10' : 'border-secondary'
                      }`}
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        minHeight: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      <input
                        id="fileInput"
                        type="file"
                        className="position-absolute w-100 h-100 opacity-0"
                        style={{ cursor: 'pointer', top: 0, left: 0 }}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.odt"
                      />
                      
                      {file ? (
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center justify-content-center rounded-circle me-4 bg-success bg-opacity-25" 
                               style={{ width: '48px', height: '48px' }}>
                            <FileText size={24} className="text-success" />
                          </div>
                          <div className="text-start">
                            <h6 className="mb-1 fw-semibold text-dark">{file.name}</h6>
                            <small className="text-muted">{formatFileSize(file.size)}</small>
                          </div>
                          <CheckCircle size={24} className="text-success ms-4" />
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3 bg-primary bg-opacity-25" 
                               style={{ width: '64px', height: '64px' }}>
                            <Upload size={32} className="text-primary" />
                          </div>
                          <h5 className="fw-semibold text-dark mb-2">
                            Drop your file here or click to browse
                          </h5>
                          <small className="text-muted">
                            Supports PDF, Word, and ODT files up to 10MB
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conversion Type Selection */}
                  <div className="mb-5">
                    <label className="form-label fw-semibold text-dark mb-3">
                      <strong>Step 2: Choose Conversion Type</strong>
                    </label>
                    <div className="row g-3">
                      {conversionOptions.map((option) => (
                        <div key={option.value} className="col-md-6">
                          <div
                            className={`card h-100 border-2 ${
                              conversionType === option.value
                                ? 'border-primary bg-primary bg-opacity-10'
                                : 'border-light'
                            }`}
                            style={{ 
                              cursor: 'pointer', 
                              transition: 'all 0.2s ease',
                              borderRadius: '12px'
                            }}
                            onClick={() => setConversionType(option.value)}
                            onMouseEnter={(e) => {
                              if (conversionType !== option.value) {
                                e.target.classList.add('border-primary', 'shadow-sm');
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (conversionType !== option.value) {
                                e.target.classList.remove('border-primary', 'shadow-sm');
                              }
                            }}
                          >
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <span className="me-3 fs-4">{option.icon}</span>
                                  <span className="fw-semibold">{option.label}</span>
                                </div>
                                {conversionType === option.value && (
                                  <CheckCircle size={20} className="text-primary" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center">
                    <button
                      className={`btn btn-lg px-4 py-3 fw-semibold d-flex align-items-center ${
                        !file || !conversionType || isConverting
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                      style={{
                        borderRadius: '12px',
                        background: !file || !conversionType || isConverting ? undefined : 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        transform: 'scale(1)',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={handleConversion}
                      disabled={!file || !conversionType || isConverting}
                      onMouseEnter={(e) => {
                        if (!(!file || !conversionType || isConverting)) {
                          e.target.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {isConverting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Converting...
                        </>
                      ) : (
                        <>
                          <Zap size={20} className="me-2" />
                          Convert File
                          <ArrowRight size={16} className="ms-2" />
                        </>
                      )}
                    </button>

                    {convertedFile && (
                      <button
                        className="btn btn-success btn-lg px-4 py-3 fw-semibold d-flex align-items-center animate__animated animate__fadeIn"
                        style={{
                          borderRadius: '12px',
                          background: 'linear-gradient(45deg, #10b981, #059669)',
                          border: 'none',
                          transform: 'scale(1)',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={handleDownload}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        <Download size={20} className="me-2" />
                        Download {convertedFile.name}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="row g-4 mt-5">
            <div className="col-md-4">
              <div className="text-center text-white p-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-white bg-opacity-25" 
                     style={{ width: '48px', height: '48px' }}>
                  <Zap size={24} className="text-white" />
                </div>
                <h5 className="fw-semibold mb-2">Lightning Fast</h5>
                <p className="text-white-50 small mb-0">Convert your files in seconds with our optimized processing engine</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center text-white p-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-white bg-opacity-25" 
                     style={{ width: '48px', height: '48px' }}>
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h5 className="fw-semibold mb-2">High Quality</h5>
                <p className="text-white-50 small mb-0">Maintain perfect formatting and layout in every conversion</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center text-white p-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-white bg-opacity-25" 
                     style={{ width: '48px', height: '48px' }}>
                  <FileText size={24} className="text-white" />
                </div>
                <h5 className="fw-semibold mb-2">Multiple Formats</h5>
                <p className="text-white-50 small mb-0">Support for PDF, Word, ODT and many more file formats</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate__fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .card:hover {
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
        
        .btn:not(:disabled):hover {
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
        }
      `}</style>
     
{/* Footer */}
{/* Footer */}
{/* Footer */}



    </>
  );
}

export default App;