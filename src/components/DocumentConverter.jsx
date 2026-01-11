import React, { useState } from "react";
import { Upload, FileText, Download, Zap, CheckCircle, ArrowRight } from "lucide-react";

function DocumentConverter() {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState("");
  const [convertedFile, setConvertedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ✅ ONLY REAL & STABLE CONVERSIONS
  const conversionOptions = [
    {
      value: "word-to-pdf",
      label: "Word to PDF",
      icon: "📝➜📄",
      ext: ".pdf"
    },
    {
      value: "odt-to-pdf",
      label: "ODT to PDF",
      icon: "📋➜📄",
      ext: ".pdf"
    },
    {
      value: "odt-to-word",
      label: "ODT to Word",
      icon: "📋➜📝",
      ext: ".docx"
    }
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setConvertedFile(null);
    }
  };

  const handleConversion = async () => {
    if (!file || !conversionType) return;

    try {
      setIsConverting(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("conversionType", conversionType);

      const res = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const selected = conversionOptions.find(opt => opt.value === conversionType);

      setConvertedFile({
        blob,
        name: file.name.split(".")[0] + selected.ext
      });

    } catch (err) {
      alert("Conversion failed. Please try again.");
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedFile) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(convertedFile.blob);
    link.download = convertedFile.name;
    link.click();
  };

  const formatFileSize = (bytes) => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="min-vh-100" style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
        <div className="container py-5">

          {/* Header */}
          <div className="text-center text-white mb-5">
            <Zap size={40} />
            <h1 className="fw-bold mt-3">File Converter Pro</h1>
            <p className="text-white-50">
              Fast & reliable offline document conversion
            </p>
          </div>

          {/* Main Card */}
          <div className="card shadow-lg p-5 rounded-4">

            {/* Upload */}
            <h5>Step 1: Upload File</h5>
            <div
              className={`border border-2 border-dashed rounded p-4 text-center mb-4 ${
                dragActive ? "border-primary" : "border-secondary"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
              style={{ cursor: "pointer" }}
            >
              <input
                id="fileInput"
                type="file"
                hidden
                accept=".doc,.docx,.odt"
                onChange={handleFileChange}
              />

              {file ? (
                <>
                  <FileText size={30} />
                  <p className="fw-semibold mt-2">{file.name}</p>
                  <small>{formatFileSize(file.size)}</small>
                </>
              ) : (
                <>
                  <Upload size={30} />
                  <p className="mt-2">Click or drag file here</p>
                </>
              )}
            </div>

            {/* Conversion Options */}
            <h5>Step 2: Conversion Type</h5>
            <div className="row g-3 mb-4">
              {conversionOptions.map(option => (
                <div className="col-md-6" key={option.value}>
                  <div
                    className={`card p-3 ${
                      conversionType === option.value ? "border-primary" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setConversionType(option.value)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{option.icon} {option.label}</span>
                      {conversionType === option.value && (
                        <CheckCircle className="text-primary" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="d-flex gap-3">
              <button
                className="btn btn-primary"
                disabled={!file || !conversionType || isConverting}
                onClick={handleConversion}
              >
                {isConverting ? "Converting..." : "Convert File"}
                <ArrowRight size={16} className="ms-2" />
              </button>

              {convertedFile && (
                <button className="btn btn-success" onClick={handleDownload}>
                  <Download size={16} className="me-2" />
                  Download
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentConverter;
