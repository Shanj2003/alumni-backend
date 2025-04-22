const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS Middleware: Allow requests only from specific frontend (update for production if needed)
app.use(cors({
  origin: 'http://localhost:4000'  // Change this to your frontend domain if hosted (e.g., on Netlify)
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

  // ✅ Basic field validation
  const { firstName, lastName, email } = studentData;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "Required fields are missing: firstName, lastName, or email." });
  }

  // 🧪 Simulate successful registration (no database yet)
  res.status(200).json({
    message: "🎉 Student registered successfully!",
    student: studentData
  });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ✅ Port setup for local and Railway/Heroku deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
