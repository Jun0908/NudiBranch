import { ethers } from 'ethers';
import MusicNFTABI from "../contracts/ABI/MusicNFT.json";
import { useState, useEffect } from 'react';
import { useNetwork, useSigner } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Navbar from "./components/Navbar";

async function fetchSpectrogramData(cid) {
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
  } catch (error) {
    console.error(`エラーが発生しました: ${error}`);
    return { error: `エラーが発生しました: ${error.message}` };
  }
}

async function downloadData(cid) {
  try {
    const response = await fetch(`https://${cid}.ipfs.nftstorage.link/spectrogram_hex_data.json`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`エラーが発生しました: ${error}`);
    throw new Error(`ダウンロード中にエラーが発生しました: ${error.message}`);
  }
}

function Mint() {
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const [cid, setCid] = useState('');
  const [name, setName] = useState('');
  const [musicJson, setMusicJson] = useState('');
  const [message, setMessage] = useState('');
  const [isCidFetched, setIsCidFetched] = useState(false);

  const contractAddresses = {
    Manta: '0xD767A205Bd71b72919273101dEd72068f49CF51F',
    zkSync: '0xC502e62C2Dc0686044572465A653CdF81Ca15A48'
  };

  useEffect(() => {
    if (chain) {
      console.log(`Connected to ${chain.name} network`);
    }
  }, [chain]);

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

      console.log("ダウンロードしたデータ:", downloadedData);
    } catch (error) {
      console.error('データ取得中にエラーが発生しました:', error);
      setMessage(`エラーが発生しました: ${error.message}`);
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
      const network = await provider.getNetwork();
      const signer = provider.getSigner();

      let contractAddress = '';
      if (network.chainId === 5) {
        contractAddress = contractAddresses.goerli;
      } else if (network.chainId === 11155111) {
        contractAddress = contractAddresses.sepolia;
      } else {
        throw new Error('Unsupported network');
      }

      const contract = new ethers.Contract(contractAddress, MusicNFTABI, signer);
      const transaction = await contract.mintMusicNFT(name, cid, musicJson);
      await transaction.wait();
      setMessage('音楽データのNFTミントが完了しました');
    } catch (error) {
      console.error('NFTミント中にエラーが発生しました:', error);
      setMessage(`NFTミント中にエラーが発生しました: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <ConnectButton />
      <div>
        <button onClick={() => switchNetwork(5)}>Switch to Goerli</button>
        <button onClick={() => switchNetwork(11155111)}>Switch to Sepolia</button>
      </div>
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
