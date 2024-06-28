require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});