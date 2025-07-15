import { connectDb } from '../lib/connectDb.js';
import User from '../models/User.js';

const seedUsers = async () => {
  await connectDb();
  
  const users = [
    "Tanu", "Ankit", "Sanat", "Priya", "Ashish",
    "Neha", "Gopal", "Ravi", "Rohan", "Diya"
  ];

  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Insert new users
    const userDocs = users.map(name => ({ name }));
    await User.insertMany(userDocs);
    
    console.log('✅ Database seeded with 10 users');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};

seedUsers();