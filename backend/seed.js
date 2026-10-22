require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('Error: MONGO_URI environment variable is not defined.');
  process.exit(1);
}

const sampleCars = [
  { make: 'Toyota', model: 'Camry', year: 2022, pricePerDay: 55, available: true },
  { make: 'Honda', model: 'Civic', year: 2021, pricePerDay: 45, available: true },
  { make: 'Ford', model: 'Mustang', year: 2023, pricePerDay: 95, available: true },
  { make: 'BMW', model: '3 Series', year: 2022, pricePerDay: 120, available: true },
  { make: 'Tesla', model: 'Model 3', year: 2023, pricePerDay: 110, available: true },
  { make: 'Chevrolet', model: 'Malibu', year: 2021, pricePerDay: 50, available: true },
];

const seed = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Car.deleteMany({});
    console.log('Existing car records removed');

    const inserted = await Car.insertMany(sampleCars);
    console.log(`Seed complete: ${inserted.length} car records inserted`);

    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seed();
