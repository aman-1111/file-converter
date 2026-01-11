const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const libre = require("libreoffice-convert");

libre.convertAsync = require("util").promisify(libre.convert);

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: uploadDir });

app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { conversionType } = req.body;
    const inputPath = req.file.path;
    const inputExt = path.extname(req.file.originalname).replace(".", "");

    let outputExt;
    if (conversionType === "pdf-to-word") outputExt = "docx";
    else if (conversionType === "word-to-pdf") outputExt = "pdf";
    else if (conversionType === "odt-to-pdf") outputExt = "pdf";
    else if (conversionType === "odt-to-word") outputExt = "docx";
    else throw new Error("Invalid conversion type");

    const fileBuffer = fs.readFileSync(inputPath);

    const convertedBuffer = await libre.convertAsync(
      fileBuffer,
      outputExt,
      undefined
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=converted.${outputExt}`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    res.send(convertedBuffer);

    fs.unlinkSync(inputPath);
  } catch (error) {
    console.error("❌ Conversion error:", error);
    res.status(500).send("Conversion failed");
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
