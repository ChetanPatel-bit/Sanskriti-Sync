import React from 'react';

export default function CultureQuest({ submissionCount = 1 }) {
    const badges = [
        { title: "First Chronicler", desc: "Submitted 1 verified tradition", unlocked: submissionCount >= 1, icon: "📜" },
        { title: "Heritage Guardian", desc: "Submitted 3 verified traditions", unlocked: submissionCount >= 3, icon: "🛡️" },
        { title: "Master Archivalist", desc: "Submitted 5 verified traditions", unlocked: submissionCount >= 5, icon: "👑" },
    ];

    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#9a3412' }}>Culture Quest</h3>
            <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#666' }}>Engage in active living cultural preservation.</p>
            
            <div style={{ display: 'grid', gap: '10px' }}>
                {badges.map((badge, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: badge.unlocked ? '#f0fdf4' : '#f9fafb',
                        border: badge.unlocked ? '1fr solid #bbf7d0' : '1px solid #e5e7eb',
                        opacity: badge.unlocked ? 1 : 0.6
                    }}>
                        <span style={{ fontSize: '24px' }}>{badge.icon}</span>
                        <div>
                            <strong style={{ display: 'block', fontSize: '14px', color: badge.unlocked ? '#166534' : '#374151' }}>
                                {badge.title} {badge.unlocked ? '✓' : '(Locked)'}
                            </strong>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>{badge.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}