import React, { useState } from 'react';
import Navbar from "./components/Navbar";

function MusicGen() {
    const [prompt, setPrompt] = useState('');
    const [jobId, setJobId] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [cid, setCid] = useState('');

    const onSubmitHelloWorld = async () => {
        executeJob({ jobType: 'helloWorld' });
    };

    const onSubmitImageGen = async () => {
        executeJob({ jobType: 'imageGen', prompt });
    };

    const executeJob = async (body: any) => {
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.jobId) {
          setJobId(data.jobId);
        }
    };

    const getImage = async () => {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobType: 'imageGen', prompt: 'あなたのプロンプト' }),
      });
      const data = await response.json();
      if (data.image) {
        setImageSrc(data.image);
      }
    };

    const onSubmitMusicGen = async () => {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobType: 'musicGen', cid: 'あなたのCID' }),
      });
      const data = await response.json();
      if (data.cid) {
        setCid(data.cid);
      }
    };

    const styles: { [key: string]: React.CSSProperties } = {
      container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px'
      },
      inputArea: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px'
      },
      promptInput: {
          width: '300px',
          marginBottom: '10px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
      },
      submitButton: {
          margin: '5px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
      },
      submitButtonHover: {
          backgroundColor: '#0056b3'
      },
      outputArea: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      },
      generatedImage: {
          maxWidth: '100%',
          height: 'auto',
          marginTop: '20px'
      }
  };

  return (
    
    <div style={styles.container}>
       <Navbar />
        <div style={styles.inputArea}>
            <button style={styles.submitButton} onClick={onSubmitHelloWorld}>Excute Job Hello World</button>
            <input 
                style={styles.promptInput}
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter text for image generation"
            />
            <button style={styles.submitButton} onClick={onSubmitImageGen}>Generate Image</button>
        </div>
        {jobId && <p>Job ID: {jobId}</p>}
        <div style={styles.outputArea}>
            {imageSrc && <img src={imageSrc} alt="Generated Image" style={styles.generatedImage}/>}
        </div>
        <div style={styles.inputArea}>
            <button style={styles.submitButton} onClick={onSubmitMusicGen}>Generate Music</button>
            {cid && <p>CID: {cid}</p>}
        </div>
    </div>
  );
}

export default MusicGen;
