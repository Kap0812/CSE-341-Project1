require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for data import...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Read and parse the JSON data
    const dataPath = path.join(__dirname, '../data/contacts.json');
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Clear existing data
    await Contact.deleteMany();
    console.log('Existing data cleared...');

    // Import new data
    await Contact.insertMany(contacts);
    console.log('Data imported successfully...');

    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();