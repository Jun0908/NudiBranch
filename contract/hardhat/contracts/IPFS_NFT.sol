// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ipfsNFT is ERC721, Ownable {
    // Mapping from token ID to IPFS CID
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("myNFT", "NFT") Ownable(msg.sender) {}

    // Function to mint a new NFT with a specified IPFS CID
    function safeMint(address to, uint256 tokenId, string memory cid) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, cid);
    }

    // Internal function to set the token URI for a given token
    function _setTokenURI(uint256 tokenId, string memory cid) internal {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = cid;
    }

    // Override the tokenURI function to return the IPFS CID
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");

        string memory cid = _tokenURIs[tokenId];
        return bytes(cid).length > 0 ? string(abi.encodePacked("ipfs://", cid)) : "";
    }
}