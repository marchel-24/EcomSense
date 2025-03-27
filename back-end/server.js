require('dotenv').config();
const express = require('express');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');
const chatRoutes = require('./routes/chatRoutes')

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/accounts', accountRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
