## WaveHack Global 2024

### 📺 Explanation / 説明書き

AI Agentsは、MetaMeプラットフォームにおけるエンゲージメントとコミュニティ活動を活性化するため、高度なAI機能を備えたiNFT（intelligence NFT）を開発します。これにより、メタバース内のインタラクションが豊かになり、ユーザー参加型のコンテンツ生成を促進します。

 [Movie in Loom/ 紹介動画 Loom](https://www.loom.com/share/6d470c31cb374f7f94587d5b7be31d77?sid=c83495ec-9e79-43f2-96cd-7337bb9681b0)
  
### 🔵 How to excute / 実行方法
① Get API / APIの取得

.env.sample を .envに書き換えてください

下記のリンクからAPIを取得してください

  [NEXT_PUBLIC_ALCHEMY_API_KEY](https://www.alchemy.com/)
  
  [NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID](https://web3auth.io/)

  [OPEN_WEATHER_API_KEY](https://hibi-update.org/other/openweathermap-api/)
  
  [OPENAI_API_KEY](https://platform.openai.com/api-keys)

  [CMC_API_KEY](https://coinmarketcap.com/api/)
  

② Starting Docker / Dockerの起動
```bash
docker-compose up
```

③ Starting Frontend /フロントエンドの起動
```bash
# Clone the repository
git clone git@github.com:lodestar3/frontend.git

# Change to the project directory
cd frontend

# Install library
npm install 

# Start the development server
npm run dev
```

### 🤖 Technical Challenges / 技術的挑戦

①ERC6551を用いたNPCのデータ管理

ERC6551に紐づいたNFTがIPFSの画像データの非暗号化や音声や人格のLLMのAPIのアクセス管理を行い、MetaMaskによりNPCのデータ管理ができる。

<img width="390" alt="スクリーンショット 2024-06-25 11 47 35" src="https://github.com/lodestar3/frontend/assets/31527310/8a5d0bfc-afb5-46de-aa94-f2132965c22e">

②LLMを用いた会話システムの構築

LangchainによりAPIの接続やJSONのEmbedding等を行い、NPCの個性を生成する。VoiceBoxによりNPCの音声を選択することができる。

<img width="390" alt="スクリーンショット 2024-06-25 11 50 39" src="https://github.com/lodestar3/frontend/assets/31527310/1261f1ad-8f88-43d4-ac02-75d67a278adb">
