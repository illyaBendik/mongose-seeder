const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  const passwords = [
    process.env.ADMIN1_PASSWORD,
    process.env.ADMIN2_PASSWORD,
    process.env.ADMIN3_PASSWORD,
  ];

  try {
    for (let i = 0; i < passwords.length; i++) {
      const password = passwords[i];
      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({
        username: `user${i + 1}-admin`, // example: user1.admin@gmail.com
        email: `user${i + 1}.admin@gmail.com`,
        password: hashPassword,
      });
    }
    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error setting up admin users:", error);
    process.exit(1);
  }
};

seedDatabase();
