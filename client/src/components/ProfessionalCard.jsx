import React from 'react';

const ProfessionalCard = ({ professional, onDelete }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{professional.name}</h3>
                <span className="badge">{professional.category}</span>
            </div>

            <p style={{ flex: 1 }}>{professional.description}</p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span>{professional.location}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span>{professional.price}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Exp:</span>
                    <span>{professional.experience}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{professional.phone}</span>
                </div>
            </div>

            {onDelete && (
                <button
                    className="btn btn-danger"
                    style={{ marginTop: '1.5rem', width: '100%' }}
                    onClick={() => onDelete(professional.id)}
                >
                    Delete Professional
                </button>
            )}
        </div>
    );
};

export default ProfessionalCard;
