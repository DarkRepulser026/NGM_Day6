const mongoose = require('mongoose');
const { seedDatabase } = require('../utils/seedDatabase');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/NNPTUD-S4');
    await mongoose.connection.dropDatabase();
    await seedDatabase();
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error);
    await mongoose.disconnect().catch(function () {});
    process.exit(1);
  }
}

main();
