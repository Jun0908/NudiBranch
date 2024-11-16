// app/page.tsx
'use client';

import React, { useState } from 'react';
import * as Client from '@web3-storage/w3up-client';

const Home = () => {
  const [client, setClient] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  // メールアドレスの型ガード（メール形式の確認）
  const isValidEmail = (email: string): email is `${string}@${string}` => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // クライアントの初期化、認証、スペースの設定
  const initializeClient = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const clientInstance = await Client.create();
      console.log('Client created:', clientInstance);

      // メールでの認証
      await clientInstance.login(email);
      console.log('Client logged in:', clientInstance);

      // 既存のスペースを確認
      const spaces = await clientInstance.spaces();
      let space;

      if (spaces.length > 0) {
        // 既存のスペースを利用
        space = spaces[0];
        console.log('Using existing space:', space);
      } else {
        // 新しいスペースを作成
        space = await clientInstance.createSpace('my-space');
        console.log('Created new space:', space);
      }

      await clientInstance.setCurrentSpace(space.did());
      console.log('Space set as current:', space);

      setClient(clientInstance);
      alert('Client initialized, logged in, and space set!');
    } catch (error) {
      console.error('Error initializing client or setting space:', error);
    }
  };

  // ファイル選択イベントハンドラ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log('File selected:', e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  // ファイルのアップロード
  const handleUpload = async () => {
    if (client && file) {
      console.log('Attempting to upload file:', file);
      try {
        const cid = await client.uploadFile(file);
        console.log('File uploaded, CID:', cid);
        setCid(cid.toString());
        alert(`File uploaded! CID: ${cid}`);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('Client or file is missing');
      alert('Client not initialized or no file selected.');
    }
  };

  return (
    <div>
      <h1>File Upload with w3up-client</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={initializeClient}>Initialize Client</button>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || !client}>
        Upload File
      </button>
      {cid && (
        <div>
          <p>IPFS CID: {cid}</p>
          <p>
            Gateway URL:{' '}
            <a href={`https://w3s.link/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
              https://w3s.link/ipfs/{cid}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
