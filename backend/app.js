const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5174', // Adjust based on your client URL
  credentials: true,
}));

const { connectDB } = require('./db/mongo.db');


const userRoutes = require('./routes/user.routes');
const aiRoutes = require('./routes/ai.routes');
const plannerRoutes = require('./routes/planner.routes');
const dayWiseRoutes = require('./routes/dayWise.routes');

// Middleware


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/daywise', dayWiseRoutes);


// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
connectDB(mongoURI);



app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;