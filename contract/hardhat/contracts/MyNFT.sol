// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
    }

    function createNFT(string memory imageCID, string memory musicCID) public onlyOwner {
        uint256 newItemId = tokenCounter;
        string memory combinedCID = string(abi.encodePacked(imageCID, ";", musicCID));
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, combinedCID);
        tokenCounter = tokenCounter + 1;
    }
}