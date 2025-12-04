import React, { useState, useEffect } from 'react';
import { getProfessionals, getCategories } from '../api';
import ProfessionalCard from './ProfessionalCard';

const ProfessionalList = () => {
    const [professionals, setProfessionals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProfessionals();
    }, [search, selectedCategory]);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProfessionals = async () => {
        try {
            const res = await getProfessionals({ q: search, category: selectedCategory });
            setProfessionals(res.data);
        } catch (error) {
            console.error('Error fetching professionals:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="search-container">
                <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Find the Perfect Professional</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search by name, description, or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 3 }}
                    />
                    <select
                        className="input"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{ flex: 1 }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid">
                    {professionals.map(p => (
                        <ProfessionalCard key={p.id} professional={p} />
                    ))}
                </div>
            )}

            {!loading && professionals.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>No professionals found.</p>
            )}
        </div>
    );
};

export default ProfessionalList;
