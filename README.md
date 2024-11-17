# Nudibranch 

### Overview
The preservation of diverse LLMs (Large Language Models) is essential to ensure technological quality, reduce bias, and maintain broad cultural and linguistic representation. In order to support fair and unbiased model development, it’s crucial to implement robust evaluation methods that encompass both technical and subjective metrics to achieve accurate, multifaceted assessments.

### Problems

The lack of diversity and rigorous evaluation in LLMs is a growing concern. Key data points include:

- **Cultural-Bias**: Up to 35% of AI-generated content may carry cultural biases due to limited datasets, impacting inclusivity across languages and regions.
- **Non-English Content Accuracy**: Over-reliance on homogeneous data has led to 40% of non-English content being inaccurately processed, leaving millions of global users underserved.
- **Economic Impact**: The global economic losses incurred by major corporations due to AI bias and misinterpretation issues are estimated to reach tens of billions of dollars annually. Companies are experiencing approximately $80 billion in annual losses, factoring in the costs of addressing incorrect outputs or interpretations from AI and automation systems, as well as expenses associated with marketing and rebranding efforts aimed at restoring trust.


### Solution – Diverse Model Evaluation through FID and Human Insights

This framework combines objective and subjective metrics to promote high-quality, unbiased LLMs.

**1. Implementing FID for Objective Quality and Diversity Assessment**

FID (Frechet Inception Distance) is a proven metric for assessing the quality of generated content, particularly in GAN applications. It analyzes the distributional similarity between generated and real-world content, identifying quality gaps in LLM outputs. By ensuring diversity across language and cultural dimensions, FID can help meaningfully reduce inaccuracy rates.

**2. Incorporating Human Subjective Evaluation for Fidelity and Alignment**

Combining FID with human evaluations addresses fidelity and alignment issues. Diverse panels of reviewers provide nuanced insights, helping models better align with cultural and contextual expectations. Studies indicate that incorporating human reviews can considerably improve alignment accuracy, ensuring reliable and relevant outputs.

**3. Text-to-Image with LLM Mint for Content Generation and Ownership**

By minting LLMs as NFTs and providing text-to-image generation capabilities, this approach encourages diverse user participation, leverages a decentralized network to reduce bias, and enables the creation and ownership of culturally diverse content.


### Technologies I used

**1.Model Evaluation through FID and Human Insights**

We adopted a method combining FID and human evaluations for LLM assessment. FID was used to objectively assess quality and diversity, and World was utilized to verify human authenticity rather than bots. Finally, reviews were conducted by human evaluators from diverse backgrounds. Tokens were distributed to evaluators to encourage fair and accurate evaluations.

<img width="526" alt="スクリーンショット 2024-11-17 0 15 45" src="https://github.com/user-attachments/assets/1ab667f5-c646-4a8c-8bde-9a0000f7f936">


**2.Text to Image with LLM Mint**

We implemented a system where each LLM can be minted as an NFT, allowing NFT holders to access text-to-image prompt capabilities. The text-to-image generation is powered by Hyperbolic, a decentralized GPU network, ensuring robust, distributed processing for high-quality image creation. The generated images are stored securely on Storacha by Protocol Labs, ensuring decentralized and reliable storage. Each image is then minted as a unique NFT, creating a seamless ecosystem where users can generate, store, and own digital content with blockchain-backed authenticity and provenance.

<img width="624" alt="スクリーンショット 2024-11-17 0 15 25" src="https://github.com/user-attachments/assets/ed41036b-ffa2-4004-9726-34a5291e264d">

### Development

**IPFSNFT.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0xd644eeb2217d02f167e8865fff55079fc140e971](https://sepolia.etherscan.io/address/0xd644eeb2217d02f167e8865fff55079fc140e971)|
| Bitkub Testnet    | [0x67eeb1af00304fb3ab40fa1320b67354ce4d5492011c0cc642887a866b504e8e](https://testnet.bkcscan.com/tx/0x67eeb1af00304fb3ab40fa1320b67354ce4d5492011c0cc642887a866b504e8e)|
| Flare Testnet   | [0x693b50002b5f7fd382882cb9cf23c8fe14af84849998e23854c17d488456d622](https://coston2-explorer.flare.network/tx/0x693b50002b5f7fd382882cb9cf23c8fe14af84849998e23854c17d488456d622)|
| Flow Testnet    | [0xad7a9409d0d28ac57f59b41cf811db9eac47fd9dbf8836d3d3f806a95dcec5f2](https://evm-testnet.flowscan.io/tx/0xad7a9409d0d28ac57f59b41cf811db9eac47fd9dbf8836d3d3f806a95dcec5f2)
| Polygon Amoy   | [0x5f6de723d264bd63e0e2367a05a08bdf9b281ab6729a047ac28d08824545de2b](https://www.oklink.com/amoy/tx/0x5f6de723d264bd63e0e2367a05a08bdf9b281ab6729a047ac28d08824545de2b)|
| Scroll Testnet   | [0xe2a548dacdbc942d659a523fd40335000c80064c](https://sepolia.scrollscan.com/address/0xe2a548dacdbc942d659a523fd40335000c80064c)|


**SendToken.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x93abb166684852043b3884474853a726b1295469](https://sepolia.etherscan.io/address/0x93abb166684852043b3884474853a726b1295469)|
| Bitkub Testnet    | [0x0981fa48b9efe3f9e1fe878ba826c56b7ffd2d624ec252ea7d165f8e34f6a936](https://testnet.bkcscan.com/tx/0x0981fa48b9efe3f9e1fe878ba826c56b7ffd2d624ec252ea7d165f8e34f6a936)|
| Flare Testnet   | [0x677ab31a9d777eedbc88ce2198dce8de9378e78f](https://explorer.testnet.rootstock.io/address/0x677ab31a9d777eedbc88ce2198dce8de9378e78f?__ctab=general )|
| Flow Testnet    | [0x13793c1dfcaf3ae378932b23f7972e722c5af93b371e3a1134d6dbaad2bf8d08](https://evm-testnet.flowscan.io/tx/0x13793c1dfcaf3ae378932b23f7972e722c5af93b371e3a1134d6dbaad2bf8d08)
| Polygon Testnet   | [0xbbd4beabcc11b33f585a0de8fd30c20781c26850f7f67097a74e20d5f79b6219](https://www.oklink.com/amoy/tx/0xbbd4beabcc11b33f585a0de8fd30c20781c26850f7f67097a74e20d5f79b6219)|
| Scroll Testnet   | [0x1440a247071edde7e1016b18126163d805f98c31](https://sepolia.scrollscan.com/address/0x1440a247071edde7e1016b18126163d805f98c31)|

**Whitelist.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x934061130559f53ff6b57f5e54884d1245e09f41](https://sepolia.etherscan.io/address/0x934061130559f53ff6b57f5e54884d1245e09f41)|
| Bitkub Testnet    | [0xbdf24996cb511ef7827063563d3bdd3053e51a790daefb024b53da882487e393](https://testnet.bkcscan.com/tx/0xbdf24996cb511ef7827063563d3bdd3053e51a790daefb024b53da882487e393)|
| Flare Testnet   | [0x677ab31a9d777eedbc88ce2198dce8de9378e78f](https://explorer.testnet.rootstock.io/address/0x677ab31a9d777eedbc88ce2198dce8de9378e78f?__ctab=general )|
| Flow Testnet    | [0x122fb831395c7e47769594d07c723c7aac2bf32a3929588296e4bfde5750dc7e](https://evm-testnet.flowscan.io/tx/0x122fb831395c7e47769594d07c723c7aac2bf32a3929588296e4bfde5750dc7e)
| Polygon Testnet   | [0xe07ec04568e83acf9a8d3565c4b82fa8585f7dc1dbb2379a58aa36af1812928d](https://www.oklink.com/amoy/tx/0xe07ec04568e83acf9a8d3565c4b82fa8585f7dc1dbb2379a58aa36af1812928d)|
| Scroll Testnet   | [0x89e0a255c7f70250fcad3dba5954a90a169b4983](https://sepolia.scrollscan.com/address/0x89e0a255c7f70250fcad3dba5954a90a169b4983)|


**BlockScout**
| contract name                 |                                                                                                                  transaction hash |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| IPFSNFT.sol    | [0x2a2bf65bdd259d4b8fe0f4e0eca70121ae2fd67dde1268b3126cdaf678b896a9](https://eth-sepolia.blockscout.com/tx/0x2a2bf65bdd259d4b8fe0f4e0eca70121ae2fd67dde1268b3126cdaf678b896a9)|
| SendToken.sol    | [0x7c846d4dcb4f972a7ae0c2936e2ffa2beb42cb58819285a29d983aff08aa31e4](https://eth-sepolia.blockscout.com/tx/0x7c846d4dcb4f972a7ae0c2936e2ffa2beb42cb58819285a29d983aff08aa31e4)|
| Whitelist.sol    | [0xb5fa995a391912ba46768c4710cb271e406828ba6124c3f22358ff7c388508d4](https://eth-sepolia.blockscout.com/tx/0xb5fa995a391912ba46768c4710cb271e406828ba6124c3f22358ff7c388508d4)|


### What's next for
- **FineTuning**: Fine-tuning involves reducing bias by incorporating diverse datasets, allowing the model to better represent various cultural and linguistic perspectives, thus improving accuracy and fairness across different contexts.
- **[zkLLM](https://github.com/jvhs0706/zkllm-ccs2024)**: zkLLM (zero-knowledge Language Model) leverages zero-knowledge proofs to ensure privacy-preserving interactions with language models. This approach enables users to verify model responses without exposing sensitive data, enhancing trust and security in AI applications.

We would like to create **the society with decentralized value** by increasing **diverse evaluation criteria**.


### Implementation Status

| Title          |                                                              URL |
| :------------- | ---------------------------------------------------------------: |
| Demo Movie      |                                      [Nudibranch-demo](https://youtu.be/agQj5_Lpucc)|
| Pitch Doc    |   [Nudibranch-presentation](https://www.canva.com/design/DAGVtA0iy08/Sz0p5ehf7WcXCwoIdE_ZVg/edit?utm_content=DAGVtA0iy08&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) |
| Demo Site     |                                 [Nudibranch-demo](https://tpfsg35rib.ap-northeast-1.awsapprunner.com/evaluate-1)| 


### References
- Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?🦜" Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 610-623.

- Wu, S., Dredze, M., & Yimam, S. M. (2021). "Multilingual Models in the Wild: Navigating Non-English Data with Pretrained Language Models." Proceedings of the 16th Conference of the European Chapter of the Association for Computational Linguistics, 699-709.

- Boston Consulting Group (2021). "The Economic and Business Risks of AI Bias: A Global Perspective."

- Raji, I. D., & Buolamwini, J. (2019). "Actionable Auditing: Investigating the Impact of Publicly Naming Biased Performance Results of Commercial AI Products." Proceedings of the 2019 AAAI/ACM Conference on AI, Ethics, and Society, 429-435.

