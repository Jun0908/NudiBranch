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

<img width="556" alt="スクリーンショット 2024-11-14 13 54 38" src="https://github.com/user-attachments/assets/7d7bdd6c-86bc-4669-b946-dd83c8c33e97">


**2.Text to Image with LLM Mint**

We implemented a system where each LLM can be minted as an NFT, allowing NFT holders to access text-to-image prompt capabilities. The text-to-image generation is powered by Hyperbolic, a decentralized GPU network, ensuring robust, distributed processing for high-quality image creation. The generated images are stored securely on Storacha by Protocol Labs, ensuring decentralized and reliable storage. Each image is then minted as a unique NFT, creating a seamless ecosystem where users can generate, store, and own digital content with blockchain-backed authenticity and provenance.

<img width="624" alt="スクリーンショット 2024-11-14 13 50 47" src="https://github.com/user-attachments/assets/11acdf60-3da0-407f-a183-0b6eb394b710">


### Development

**IPFSNFT.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0xd644eeb2217d02f167e8865fff55079fc140e971](https://sepolia.etherscan.io/address/0xd644eeb2217d02f167e8865fff55079fc140e971)|
| Bitkub Testnet    | [0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214](https://testnet.airdao.io/explorer/address/0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214/)|
| Flare Testnet   | [0x677ab31a9d777eedbc88ce2198dce8de9378e78f](https://explorer.testnet.rootstock.io/address/0x677ab31a9d777eedbc88ce2198dce8de9378e78f?__ctab=general )|
| Flow Testnet    | [0x677aB31a9D777eEdbc88CE2198dcE8de9378E78f](https://explorer-holesky.morphl2.io/tx/0x926a111655a1c856fb46053e95689cc1fe5c3c038257d30d33bb40d11624b9cc)
| Polygon Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|
| Scroll Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|


**SendToken.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x93abb166684852043b3884474853a726b1295469](https://sepolia.etherscan.io/address/0x93abb166684852043b3884474853a726b1295469)|
| Bitkub Testnet    | [0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214](https://testnet.airdao.io/explorer/address/0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214/)|
| Flare Testnet   | [0x677ab31a9d777eedbc88ce2198dce8de9378e78f](https://explorer.testnet.rootstock.io/address/0x677ab31a9d777eedbc88ce2198dce8de9378e78f?__ctab=general )|
| Flow Testnet    | [0x677aB31a9D777eEdbc88CE2198dcE8de9378E78f](https://explorer-holesky.morphl2.io/tx/0x926a111655a1c856fb46053e95689cc1fe5c3c038257d30d33bb40d11624b9cc)
| Polygon Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|
| Scroll Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|

**Whitelist.sol Contracts**

| contract                   |                                                                                                                   contract address |
| :------------------------- | ---------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum Sepolia    | [0x934061130559f53ff6b57f5e54884d1245e09f41](https://sepolia.etherscan.io/address/0x934061130559f53ff6b57f5e54884d1245e09f41)|
| Bitkub Testnet    | [0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214](https://testnet.airdao.io/explorer/address/0xDDae9FBB31943679BFD6F301F8c3D7100e5d6214/)|
| Flare Testnet   | [0x677ab31a9d777eedbc88ce2198dce8de9378e78f](https://explorer.testnet.rootstock.io/address/0x677ab31a9d777eedbc88ce2198dce8de9378e78f?__ctab=general )|
| Flow Testnet    | [0x677aB31a9D777eEdbc88CE2198dcE8de9378E78f](https://explorer-holesky.morphl2.io/tx/0x926a111655a1c856fb46053e95689cc1fe5c3c038257d30d33bb40d11624b9cc)
| Polygon Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|
| Scroll Testnet   | [0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf](https://sepolia.lineascan.build/address/0xb764f3cea872ae3995c3eb0c6e533d6aa6c490bf#code)|


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
| Demo Movie      |                                      [Nudibranch-demo](https://youtu.be/zmENJzrxZRw)|
| Pitch Doc    |   [Nudibranch-presentation](https://www.canva.com/design/DAGVtA0iy08/Sz0p5ehf7WcXCwoIdE_ZVg/edit?utm_content=DAGVtA0iy08&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) |
| Demo Site     |                                 [Nudibranch-demo](https://eth-sg.vercel.app/)| 


### References
- Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?🦜" Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 610-623.

- Wu, S., Dredze, M., & Yimam, S. M. (2021). "Multilingual Models in the Wild: Navigating Non-English Data with Pretrained Language Models." Proceedings of the 16th Conference of the European Chapter of the Association for Computational Linguistics, 699-709.

- Boston Consulting Group (2021). "The Economic and Business Risks of AI Bias: A Global Perspective."

- Raji, I. D., & Buolamwini, J. (2019). "Actionable Auditing: Investigating the Impact of Publicly Naming Biased Performance Results of Commercial AI Products." Proceedings of the 2019 AAAI/ACM Conference on AI, Ethics, and Society, 429-435.

