const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const env = require("../src/config/env");
const User = require("../src/modules/users/user.model");
const FinancialRecord = require("../src/modules/records/record.model");

async function runSeed() {
  await mongoose.connect(env.MONGODB_URI);

  await Promise.all([User.deleteMany({}), FinancialRecord.deleteMany({})]);

  const defaultPassword = "Password@123";
  const passwordHash = await bcrypt.hash(defaultPassword, env.BCRYPT_SALT_ROUNDS);

  const [admin, analyst, viewer] = await User.create([
    {
      name: "Admin User",
      email: "admin@findash.local",
      passwordHash,
      role: "admin",
      status: "active",
    },
    {
      name: "Analyst User",
      email: "analyst@findash.local",
      passwordHash,
      role: "analyst",
      status: "active",
    },
    {
      name: "Viewer User",
      email: "viewer@findash.local",
      passwordHash,
      role: "viewer",
      status: "active",
    },
  ]);

  const now = new Date();

  await FinancialRecord.insertMany([
    {
      amount: 5000,
      type: "income",
      category: "Salary",
      date: new Date(now.getFullYear(), now.getMonth(), 1),
      notes: "Monthly salary",
      createdBy: admin._id,
    },
    {
      amount: 1200,
      type: "expense",
      category: "Rent",
      date: new Date(now.getFullYear(), now.getMonth(), 2),
      notes: "House rent",
      createdBy: admin._id,
    },
    {
      amount: 450,
      type: "expense",
      category: "Groceries",
      date: new Date(now.getFullYear(), now.getMonth(), 3),
      notes: "Supermarket shopping",
      createdBy: analyst._id,
    },
    {
      amount: 700,
      type: "income",
      category: "Freelance",
      date: new Date(now.getFullYear(), now.getMonth(), 10),
      notes: "Website project",
      createdBy: admin._id,
    },
  ]);

  console.log("Seed completed");
  console.log("Users:");
  console.log("admin@findash.local / Password@123");
  console.log("analyst@findash.local / Password@123");
  console.log("viewer@findash.local / Password@123");
  console.log(`Sample records created by ${admin.name}, ${analyst.name}, ${viewer.name}`);

  await mongoose.disconnect();
}

runSeed().catch(async (error) => {
  console.error("Seed failed", error);
  await mongoose.disconnect();
  process.exit(1);
});
