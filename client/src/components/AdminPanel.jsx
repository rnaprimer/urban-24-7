import React, { useState, useEffect } from 'react';
import { getProfessionals, createProfessional, deleteProfessional } from '../api';
import ProfessionalCard from './ProfessionalCard';

const AdminPanel = () => {
    const [professionals, setProfessionals] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        phone: '',
        email: '',
        price: '',
        location: '',
        experience: '',
        description: ''
    });

    useEffect(() => {
        fetchProfessionals();
    }, []);

    const fetchProfessionals = async () => {
        try {
            const res = await getProfessionals();
            setProfessionals(res.data);
        } catch (error) {
            console.error('Error fetching professionals:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProfessional(formData);
            setFormData({
                name: '',
                category: '',
                phone: '',
                email: '',
                price: '',
                location: '',
                experience: '',
                description: ''
            });
            fetchProfessionals();
            alert('Professional added successfully!');
        } catch (error) {
            console.error('Error creating professional:', error);
            alert('Error creating professional');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this professional?')) {
            try {
                await deleteProfessional(id);
                fetchProfessionals();
            } catch (error) {
                console.error('Error deleting professional:', error);
            }
        }
    };

    return (
        <div>
            <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                <h2 style={{ marginBottom: '2rem' }}>Add New Professional</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input required name="name" className="input" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input required name="category" className="input" value={formData.category} onChange={handleChange} placeholder="e.g. Plumber" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input name="phone" className="input" value={formData.phone} onChange={handleChange} placeholder="e.g. 555-0123" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" className="input" value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input name="price" className="input" value={formData.price} onChange={handleChange} placeholder="e.g. $50/hr" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input name="location" className="input" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY" />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Experience</label>
                            <input name="experience" className="input" value={formData.experience} onChange={handleChange} placeholder="e.g. 10 years" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" className="input" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe services..." />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Add Professional</button>
                </form>
            </div>

            <h2 style={{ marginBottom: '2rem' }}>Manage Professionals</h2>
            <div className="grid">
                {professionals.map(p => (
                    <ProfessionalCard key={p.id} professional={p} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
