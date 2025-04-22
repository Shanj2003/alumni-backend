const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS: Allow x-auth & requests from frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Mock token
const MOCK_TOKEN = 'fake-token-123';

// ✅ ADMIN Stats
app.get('/admin/stats', (req, res) => {
  res.json({
    upcomingEvents: 2,
    pastEvents: 7,
    studentsCount: 123,
    alumni: ["2020", "2021", "2022"],
    jobs: ["TCS", "Infosys", "Wipro"],
    interviews: ["Google", "Amazon", "Facebook"],
    tickets: [{ count: 4 }],
  });
});

// ✅ POST: Student Register
app.post('/student/register', (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Missing student details." });
  }
  res.status(200).json({
    message: "🎉 Student registered successfully!",
    student: req.body,
  });
});

// ✅ POST: Alumni Register
app.post('/alumni/register', (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Missing alumni details." });
  }
  res.status(200).json({
    message: "🎉 Alumni registered successfully!",
    alumni: req.body,
  });
});

// ✅ POST: Alumni Login
app.post('/alumni/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: "Missing email or password." });
  }

  res.set('x-auth', MOCK_TOKEN);
  res.status(200).json({ message: "✅ Alumni login successful", email });
});

// ✅ POST: Student Login
app.post('/student/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: "Missing email or password." });
  }

  res.set('x-auth', MOCK_TOKEN);
  res.status(200).json({ message: "✅ Student login successful", email });
});

// ✅ GET: College List
app.get('/college', (req, res) => {
  res.status(200).json([
    { id: "clg1", name: "ABC College" },
    { id: "clg2", name: "XYZ Institute" },
  ]);
});

// ✅ GET: Alumni Stats (Protected)
app.get('/alumni/stats', (req, res) => {
  const token = req.headers['x-auth'];
  if (token !== MOCK_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  res.json({
    totalAlumni: 100,
    locations: ["India", "USA", "Canada"],
    industries: ["IT", "Finance", "Education"]
  });
});

// ✅ GET: Alumni Interviews (Protected)
app.get('/alumni/interviews', (req, res) => {
  const token = req.headers['x-auth'];
  if (token !== MOCK_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  res.json([
    { id: 1, company: "Google", role: "SDE", year: "2023" },
    { id: 2, company: "Amazon", role: "Support", year: "2022" }
  ]);
});

// ✅ GET: Alumni List (Protected)
app.get('/alumni/alumni', (req, res) => {
  const token = req.headers['x-auth'];
  if (token !== MOCK_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  res.json([
    { name: "Alice", batch: "2020", company: "TCS" },
    { name: "Bob", batch: "2021", company: "Wipro" }
  ]);
});

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
