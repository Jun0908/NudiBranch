'use client';

import { useState } from 'react';
import Navbar from "@/components/header/navbar";

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert('Prompt cannot be empty');
      return;
    }

    setLoading(true);
    setImageSrc(null);

    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Image generation failed');

      const data = await response.json();
      setImageSrc(data.image); // APIがJSONレスポンスの場合
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Image Generator</h1>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt for image generation"
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleGenerateImage}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
        {loading && <p className="text-gray-500 mt-2">Generating your image, please wait...</p>}
        {imageSrc && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Generated Image:</h2>
            <img src={imageSrc} alt="Generated by AI" className="mt-2 rounded shadow" />
          </div>
        )}
      </div>
    </>
  );
}
