const express = require('express');
const cors = require('cors');
const { db, initDb } = require('./db');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

// GET all professionals (with search)
app.get('/api/professionals', (req, res) => {
    const { q, category } = req.query;
    let query = 'SELECT * FROM professionals';
    const params = [];
    const conditions = [];

    if (q) {
        conditions.push('(name LIKE ? OR description LIKE ? OR location LIKE ?)');
        const search = `%${q}%`;
        params.push(search, search, search);
    }

    if (category) {
        conditions.push('category = ?');
        params.push(category);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    try {
        const stmt = db.prepare(query);
        const professionals = stmt.all(...params);
        res.json(professionals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single professional
app.get('/api/professionals/:id', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM professionals WHERE id = ?');
        const professional = stmt.get(req.params.id);
        if (professional) {
            res.json(professional);
        } else {
            res.status(404).json({ error: 'Professional not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create professional
app.post('/api/professionals', (req, res) => {
    const { name, category, phone, email, price, location, experience, description } = req.body;

    if (!name || !category) {
        return res.status(400).json({ error: 'Name and category are required' });
    }

    try {
        const stmt = db.prepare(`
      INSERT INTO professionals (name, category, phone, email, price, location, experience, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
        const info = stmt.run(name, category, phone, email, price, location, experience, description);
        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update professional
app.put('/api/professionals/:id', (req, res) => {
    const { name, category, phone, email, price, location, experience, description } = req.body;
    const { id } = req.params;

    try {
        const stmt = db.prepare(`
      UPDATE professionals 
      SET name = ?, category = ?, phone = ?, email = ?, price = ?, location = ?, experience = ?, description = ?
      WHERE id = ?
    `);
        const info = stmt.run(name, category, phone, email, price, location, experience, description, id);

        if (info.changes > 0) {
            res.json({ id, ...req.body });
        } else {
            res.status(404).json({ error: 'Professional not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE professional
app.delete('/api/professionals/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM professionals WHERE id = ?');
        const info = stmt.run(req.params.id);

        if (info.changes > 0) {
            res.json({ message: 'Deleted successfully' });
        } else {
            res.status(404).json({ error: 'Professional not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get unique categories for filter
app.get('/api/categories', (req, res) => {
    try {
        const stmt = db.prepare('SELECT DISTINCT category FROM professionals ORDER BY category');
        const categories = stmt.all().map(c => c.category);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
