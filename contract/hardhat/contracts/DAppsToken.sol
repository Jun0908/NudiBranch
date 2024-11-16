// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DAppsToken {
  // Store the name of the token
  string public name = 'DApp Token';
  // Store the symbol for token exchange
  string public symbol = 'DAPP';
  // Store the total supply of tokens
  uint256 public totalSupply = 1000000000000000000000000; // Supply of 1 million tokens
  uint8 public decimals = 18;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );

  // Use Solidity mapping to store the balance of each account holding tokens
  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor() {
    balanceOf[msg.sender] = totalSupply;
  }

  // Implement a function to allow users to transfer tokens to another account
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  // Implement a function to allow another account to use tokens, such as in a crypto exchange
  // This updates the allowance mapping, showing the amount the account can use
  function approve(
    address _spender,
    uint256 _value
  ) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  // Allow transfer of tokens from another account
  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public returns (bool success) {
    require(_value <= balanceOf[_from]);
    require(_value <= allowance[_from][msg.sender]);
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}