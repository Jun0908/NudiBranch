// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SecureETHDistributor {
    // Contract owner address
    address public owner;

    // Mapping to track if a user has already claimed their reward
    mapping(address => bool) public hasClaimed;

    // Modifier to restrict functions to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructor to set the owner when deploying the contract
    constructor() {
        owner = msg.sender;
    }

    // Function to allow the owner to deposit ETH into the contract
    function deposit() public payable onlyOwner {}

    // Function for users to claim ETH
    function claimETH() public {
        // Ensure the user has not already claimed ETH
        require(!hasClaimed[msg.sender], "You have already claimed your ETH");

        // Set the amount of ETH to distribute
        uint256 amount = 0.01 ether;
        
        // Ensure the contract has enough ETH balance
        require(address(this).balance >= amount, "Insufficient contract balance");

        // Mark the user as having claimed ETH
        hasClaimed[msg.sender] = true;

        // Transfer the ETH to the user
        payable(msg.sender).transfer(amount);
    }

    // Function to withdraw all ETH from the contract (only owner can do this)
    function withdrawAll() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Function to check the contract's ETH balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to change the contract owner (only owner can do this)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}
