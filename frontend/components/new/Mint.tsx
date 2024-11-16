import { ethers } from 'ethers';
import MusicNFTABI from "../contracts/ABI/MusicNFT.json";
import { useState } from 'react';
import Navbar from "./components/Navbar";

async function fetchSpectrogramData(cid: string) {
  try {
    const response = await fetch('http://127.0.0.1:5000/spectrogram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid })
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`エラーが発生しました: ${error}`);
      return { error: `エラーが発生しました: ${error.message}` };
    }
    return { error: '未知のエラーが発生しました。' };
  }
}

async function downloadData(cid: string) {
  try {
    const response = await fetch(`https://${cid}.ipfs.nftstorage.link/spectrogram_hex_data.json`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`エラーが発生しました: ${error}`);
      throw new Error(`ダウンロード中にエラーが発生しました: ${error.message}`);
    }
    throw new Error('未知のエラーが発生しました。');
  }
}

function Mint() {
  const [cid, setCid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [musicJson, setMusicJson] = useState<string>(''); // 音楽データのJSON状態
  const [message, setMessage] = useState<string>('');
  const [isCidFetched, setIsCidFetched] = useState<boolean>(false);

  // ローカルファイルへの保存機能
  const saveToFile = () => {
    const blob = new Blob([musicJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'music_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    setMessage('');
    try {
      const data = await fetchSpectrogramData(cid);
      if (data.error) {
        setMessage(`CID取得エラー: ${data.error}`);
        setIsCidFetched(false);
        return;
      }
      setMessage(`CID取得に成功しました: ${data.cid}`);
      setIsCidFetched(true);

      const downloadedData = await downloadData(data.cid);
      setMusicJson(JSON.stringify(downloadedData));

      console.log("ダウンロードしたデータ:", downloadedData); // デバッグ用のログ出力
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('データ取得中にエラーが発生しました:', error);
        setMessage(`エラーが発生しました: ${error.message}`);
      } else {
        setMessage('未知のエラーが発生しました。');
      }
    }
  };

  const handleMint = async () => {
    if (!musicJson) {
      console.error("musicJson is not set");
      setMessage("ミントする前に音楽データをロードしてください。");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contractAddress = '0x3495D40A37996684b2CF68B6c6dF812D5998456e';
      const contractABI = MusicNFTABI;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.mintMusicNFT(name, cid, musicJson);
      await transaction.wait();
      setMessage('音楽データのNFTミントが完了しました');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('NFTミント中にエラーが発生しました:', error);
        setMessage(`NFTミント中にエラーが発生しました: ${error.message}`);
      } else {
        setMessage('未知のエラーが発生しました。');
      }
    }
  };

  return (
    <div>
      <Navbar />
      {!isCidFetched && (
        <div>
          <input
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="Enter CID"
          />
          <button onClick={handleSubmit}>CID 取得</button>
        </div>
      )}
      {isCidFetched && (
        <div>
          <button onClick={saveToFile}>ローカルに保存</button>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NFT name"
          />
          <button onClick={handleMint}>ミント</button>
        </div>
      )}
      {message && <div>{message}</div>}
    </div>
  );
}

export default Mint;
