//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

contract Whitelist {
    // The address that can operate addAddressToWhitelist function
    address public owner;

    // Create a mapping of whitelistedAddresses
    // if an address is whitelisted, we would set it to true, it is false by default for all other addresses.
    mapping(address => bool) private _isWhitelisted;

    //Event: record the addresses added to the whitelist
    event AddToWhitelist(address indexed account);
    //Event: record whitelisted excluded addresses
    event RemoveFromWhitelist(address indexed account);

    // Setting the initial whitelisted addresses
    // Setting the address that can operate addAddressToWhitelist function
    // User will put the value at the time of deployment
    constructor(address[] memory initialAddresses) {
        owner =msg.sender;
        for (uint256 i = 0; i < initialAddresses.length; i++) {
            addToWhitelist(initialAddresses[i]);
        }
    }

    /**
        addToWhitelist - This function adds the address of the sender to the
        whitelist
     */

    function addToWhitelist(address _address) public {
        // Check if the user is the owner
        require(owner == msg.sender, "Caller is not the owner");
        // Check if the user has already been whitelisted
        require(!_isWhitelisted[_address], "Address already whitelisted");
        // Add the address which called the function to the whitelistedAddress array
        _isWhitelisted[_address] = true;
        // Triggers AddToWhitelist event
        emit AddToWhitelist(_address);
    }

    /**
        removeFromWhitelist - This function removes the address of the sender to the
        whitelist
     */

    function removeFromWhitelist(address _address) public {
        // Check if the user is the owner
        require(owner == msg.sender, "Caller is not the owner");
        // Check if the user has not already been whitelisted
        require(_isWhitelisted[_address], "Address not in whitelist");
        // Remove the address which called the function to the whitelistedAddress array
        _isWhitelisted[_address] = false;
        // Triggers RemoveFromWhitelist event
        emit RemoveFromWhitelist(_address);
    }

    /**
        whitelistedAddresses - This function gives feedback on whether the input address belongs to the whitelist
     */

    function whitelistedAddresses(address _address) public view returns (bool) {
        return _isWhitelisted[_address];
    }
}