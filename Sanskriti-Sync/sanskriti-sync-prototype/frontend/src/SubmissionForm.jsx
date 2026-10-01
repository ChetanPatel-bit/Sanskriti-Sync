import React, { useState } from 'react';
import axios from 'axios';

export default function SubmissionForm({ onSubmissionSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'FOLK_ART',
        description: '',
        cultural_significance: '',
        state: '',
        district: '',
        latitude: '',
        longitude: '',
        preservation_status: 'ACTIVE'
    });

    const [statusMsg, setStatusMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare payload with numerical coordinates
        const payload = {
            ...formData,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
        };

        axios.post('http://127.0.0.1:8000/api/submit/', payload)
            .then(res => {
                setStatusMsg('Submission sent! It is now pending human moderation.');
                setFormData({
                    title: '', category: 'FOLK_ART', description: '',
                    cultural_significance: '', state: '', district: '',
                    latitude: '', longitude: '', preservation_status: 'ACTIVE'
                });
                if (onSubmissionSuccess) onSubmissionSuccess();
            })
            .catch(err => {
                console.error("Submission error:", err);
                setStatusMsg('Failed to submit. Check mandatory fields.');
            });
    };

    return (
        <div style={{ background: '#fcf8f2', padding: '20px', borderRadius: '12px', border: '1px solid #e2d9cd' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#9a3412' }}>Document Living Heritage</h3>
            {statusMsg && <p style={{ fontWeight: 'bold', color: '#ea580c' }}>{statusMsg}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Title of Practice *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                            <option value="FOLK_ART">Folk Art</option>
                            <option value="PERFORMANCE">Folk Performance</option>
                            <option value="FESTIVAL">Festival</option>
                            <option value="FOOD">Traditional Food</option>
                            <option value="CRAFT">Craft & Technique</option>
                            <option value="LANGUAGE">Dialect / Oral Story</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Preservation Status</label>
                        <select name="preservation_status" value={formData.preservation_status} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                            <option value="ACTIVE">Actively Practised</option>
                            <option value="DECLINING">Declining</option>
                            <option value="RARE">Rare</option>
                            <option value="ENDANGERED">Endangered</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>State *</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>District *</label>
                        <input type="text" name="district" value={formData.district} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Latitude (e.g., 20.59) *</label>
                        <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Longitude (e.g., 78.96) *</label>
                        <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" style={{ width: '100%', padding: '8px' }}></textarea>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold' }}>Cultural Significance *</label>
                    <textarea name="cultural_significance" value={formData.cultural_significance} onChange={handleChange} required rows="2" style={{ width: '100%', padding: '8px' }}></textarea>
                </div>

                <button type="submit" style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Submit for Moderation
                </button>
            </form>
        </div>
    );
}