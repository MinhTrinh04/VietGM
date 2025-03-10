const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

async function createAdmin() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('VGM');
    const users = db.collection('users');
    const adminExists = await users.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await users.insertOne(admin);
    console.log('Admin created successfully:', result);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

createAdmin();
