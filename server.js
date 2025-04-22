const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS Middleware: Allow requests from any frontend (dev-safe)
app.use(cors({
  origin: '*', // 🚧 Open for dev. Change to 'http://localhost:3000' later if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ GET: Sample Admin Stats
app.get('/admin/stats', (req, res) => {
  res.json({
    upcomingEvents: 2,
    pastEvents: 7,
    studentsCount: 123,
    alumni: ["2020", "2021", "2022"],
    jobs: ["TCS", "Infosys", "Wipro"],
    interviews: ["Google", "Amazon", "Facebook"],
    tickets: [{ count: 4 }]
  });
});

// ✅ POST: Student Registration
app.post('/student/register', (req, res) => {
  const studentData = req.body;
  console.log("✅ Student data received:", studentData);

  const { firstName, lastName, email } = studentData;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Required fields are missing: firstName, lastName, or email." });
  }

  res.status(200).json({
    message: "🎉 Student registered successfully!",
    student: studentData
  });
});

// ✅ POST: Alumni Registration
app.post('/alumni/register', (req, res) => {
  const alumniData = req.body;
  console.log("✅ Alumni data received:", alumniData);

  const { firstName, lastName, email } = alumniData;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Required fields are missing: firstName, lastName, or email." });
  }

  res.status(200).json({
    message: "🎉 Alumni registered successfully!",
    alumni: alumniData
  });
});

// ✅ POST: Login simulation
app.post('/alumni/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password." });
  }
  res.status(200).json({ message: "✅ Login successful", email });
});

// ✅ GET: Colleges
app.get('/college', (req, res) => {
  res.status(200).json([
    { id: "clg1", name: "ABC College" },
    { id: "clg2", name: "XYZ Institute" },
  ]);
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Port setup for local & cloud platforms
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
