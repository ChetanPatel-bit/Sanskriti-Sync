import React, { useState } from 'react';
import CulturalMap from './CulturalMap';
import SubmissionForm from './SubmissionForm';
import CultureQuest from './CultureQuest';

function App() {
  const [submissionsCount, setSubmissionsCount] = useState(1);

  const handleNewSubmission = () => {
    setSubmissionsCount(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #ea580c', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#9a3412', margin: 0 }}>SANSKRITI SYNC</h1>
        <p style={{ color: '#666', margin: '5px 0 0 0' }}>Preserving India's Living Heritage | SIH 2026 Prototype</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
        <section>
          <h2>Interactive Cultural Map</h2>
          <CulturalMap />
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <SubmissionForm onSubmissionSuccess={handleNewSubmission} />
          <CultureQuest submissionCount={submissionsCount} />
        </section>
      </main>
    </div>
  );
}

export default App;