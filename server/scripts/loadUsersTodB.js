const mongoose = require('mongoose');
const User = require('../models/user-model'); // Import the User model you defined
const USERS = require('../data/users');
async function loadLocalUsersToDatabase() {
  try {
    for (const userData of USERS) {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        // If the user exists in the database, you can update the user's data
        // For example:
        // existingUser.userName = userData.userName;
        // existingUser.save();
        console.log(
          `User ${userData.userName} already exists in the database.`
        );
      } else {
        const user = new User(userData);
        await user.save();
        console.log(`User ${user.userName} has been saved to the database.`);
      }
    }
  } catch (err) {
    console.error('Error loading users to the database:', err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = { loadLocalUsersToDatabase };
