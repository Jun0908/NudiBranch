'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [generateOutput, setGenerateOutput] = useState<string | null>(null);
  const [fidOutput, setFidOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAndEvaluate = async () => {
    setLoading(true);
    setGenerateOutput(null);
    setFidOutput(null);
    setError(null);

    try {
      const response = await fetch('/api/trigger', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.details || 'An error occurred');
        return;
      }

      const data = await response.json();
      setGenerateOutput(data.generateOutput);
      setFidOutput(data.fidOutput);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Generate Images and Calculate FID</h1>
      <button onClick={handleGenerateAndEvaluate} disabled={loading}>
        {loading ? 'Processing...' : 'Generate and Evaluate'}
      </button>

      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error</h2>
          <pre>{error}</pre>
        </div>
      )}

      {generateOutput && (
        <div>
          <h2>Image Generation Output</h2>
          <pre>{generateOutput}</pre>
        </div>
      )}

      {fidOutput && (
        <div>
          <h2>FID Calculation Output</h2>
          <pre>{fidOutput}</pre>
        </div>
      )}
    </div>
  );
}
