const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'directory.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database
const initDb = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS professionals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      price TEXT,
      location TEXT,
      experience TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.exec(createTableQuery);

  // Seed data if empty
  const count = db.prepare('SELECT count(*) as count FROM professionals').get();
  if (count.count === 0) {
    const insert = db.prepare(`
      INSERT INTO professionals (name, category, phone, email, price, location, experience, description)
      VALUES (@name, @category, @phone, @email, @price, @location, @experience, @description)
    `);

    const seedData = [
      {
        name: 'John Doe',
        category: 'Plumber',
        phone: '555-0101',
        email: 'john@example.com',
        price: '$50/hr',
        location: 'New York, NY',
        experience: '10 years',
        description: 'Expert in leak repairs and pipe installation.'
      },
      {
        name: 'Jane Smith',
        category: 'Electrician',
        phone: '555-0102',
        email: 'jane@example.com',
        price: '$60/hr',
        location: 'Brooklyn, NY',
        experience: '8 years',
        description: 'Residential and commercial electrical services.'
      },
      {
        name: 'Mike Johnson',
        category: 'Carpenter',
        phone: '555-0103',
        email: 'mike@example.com',
        price: '$45/hr',
        location: 'Queens, NY',
        experience: '15 years',
        description: 'Custom furniture and cabinetry.'
      }
    ];

    seedData.forEach(data => insert.run(data));
    console.log('Seed data inserted');
  }
};

module.exports = { db, initDb };
