/**
 * seed.js
 *
 * Clears and repopulates the database with demo data:
 *   - 1 admin
 *   - 1 fleetManager
 *   - 2 customers
 *   - 8 vehicles (Hatchback, Sedan, SUV mix; some unavailable)
 *
 * Prints demo login credentials to the console on completion.
 *
 * Usage:
 *   node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Customer = require('./models/Customer');
const Vehicle  = require('./models/Vehicle');
const Booking  = require('./models/Booking');

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('Error: MONGO_URI environment variable is not defined.');
  process.exit(1);
}

// ─── Demo credentials (plain-text, printed to console) ───────────────────────
const demoUsers = [
  {
    name:          'Alice Admin',
    email:         'admin@driveeasy.com',
    phone:         '555-0001',
    licenseNumber: 'LIC-ADMIN-001',
    password:      'Admin@1234',
    role:          'admin',
  },
  {
    name:          'Frank Fleet',
    email:         'fleet@driveeasy.com',
    phone:         '555-0002',
    licenseNumber: 'LIC-FLEET-002',
    password:      'Fleet@1234',
    role:          'fleetManager',
  },
  {
    name:          'Carol Customer',
    email:         'carol@example.com',
    phone:         '555-0003',
    licenseNumber: 'LIC-CAROL-003',
    password:      'Carol@1234',
    role:          'customer',
  },
  {
    name:          'Dave Driver',
    email:         'dave@example.com',
    phone:         '555-0004',
    licenseNumber: 'LIC-DAVE-004',
    password:      'Dave@1234',
    role:          'customer',
  },
];

// ─── 8 vehicles across all three types ───────────────────────────────────────
const vehicleData = [
  { model: 'Volkswagen Polo',   type: 'Hatchback', pricePerDay: 35, available: true  },
  { model: 'Ford Fiesta',       type: 'Hatchback', pricePerDay: 30, available: false },
  { model: 'Toyota Camry',      type: 'Sedan',     pricePerDay: 55, available: true  },
  { model: 'Honda Civic',       type: 'Sedan',     pricePerDay: 45, available: true  },
  { model: 'BMW 3 Series',      type: 'Sedan',     pricePerDay: 95, available: false },
  { model: 'Toyota RAV4',       type: 'SUV',       pricePerDay: 70, available: true  },
  { model: 'Ford Explorer',     type: 'SUV',       pricePerDay: 85, available: true  },
  { model: 'Chevrolet Tahoe',   type: 'SUV',       pricePerDay: 110, available: false },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✔  Connected to MongoDB\n');

    // Clear existing data
    await Promise.all([
      Customer.deleteMany({}),
      Vehicle.deleteMany({}),
      Booking.deleteMany({}),
    ]);
    console.log('✔  Existing data cleared\n');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const customersToInsert = await Promise.all(
      demoUsers.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, salt),
      }))
    );

    await Customer.insertMany(customersToInsert);
    console.log(`✔  Inserted ${customersToInsert.length} customers\n`);

    await Vehicle.insertMany(vehicleData);
    console.log(`✔  Inserted ${vehicleData.length} vehicles\n`);

    // ── Print demo credentials ───────────────────────────────────────────────
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  DriveEasy — Demo Login Credentials');
    console.log('═══════════════════════════════════════════════════════════');
    demoUsers.forEach((u) => {
      console.log(`  Role        : ${u.role}`);
      console.log(`  Name        : ${u.name}`);
      console.log(`  Email       : ${u.email}`);
      console.log(`  Password    : ${u.password}`);
      console.log(`  License No. : ${u.licenseNumber}`);
      console.log('───────────────────────────────────────────────────────────');
    });
    console.log('');
    console.log('Seed complete.');

    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seed();
