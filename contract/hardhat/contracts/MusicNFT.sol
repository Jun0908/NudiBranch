// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./libraries/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
//import "./libraries/Base64.sol";
import "hardhat/console.sol";

contract MusicNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // MusicNftAttributes 構造体の定義
    struct MusicNftAttributes {
        string name;
        string cid;       // 音楽データのCID
        string musicJson; // 音楽データのJSON文字列
    }

    // すべての音楽NFTを格納する配列
    MusicNftAttributes[] public allMusicNfts;

    // コントラクトのコンストラクタ
    constructor() ERC721("MusicNFT", "MUSIC") {
        console.log("Music NFT Contract is deployed");
    }

    // 音楽NFTをミントする関数
    function mintMusicNFT(string memory name, string memory cid, string memory musicJson) public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        allMusicNfts.push(MusicNftAttributes({name: name, cid: cid, musicJson: musicJson}));

        console.log(
            "Music NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        _tokenIds.increment();
    }

    // トークンURIを返す関数（改善版）
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_tokenId < _tokenIds.current(), "Nonexistent token");
        
        MusicNftAttributes memory currentItem = allMusicNfts[_tokenId];
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "', currentItem.name,
                        '", "description": "A unique Music NFT", "cid": "',
                        currentItem.cid,
                        '", "musicJson": ', currentItem.musicJson, '}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}