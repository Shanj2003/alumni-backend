const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample endpoint
app.get('/admin/stats', (req, res) => {
  res.json({
    upcomingEvents: 2,
    pastEvents: 7,
    studentsCount: 123,
    alumni: ["2020", "2021", "2022"],
    jobs: ["TCS", "Infosys"],
    interviews: ["Amazon", "Meta"],
    tickets: [{ count: 3 }]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
