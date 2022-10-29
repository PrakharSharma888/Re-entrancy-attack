// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GoodContract is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function addBalance() public payable{
        balances[msg.sender] += msg.value;
    }

// option no. 1 -> using openzeppelin reentrancy guard
    function withdraw() nonReentrant() public {
        require(balances[msg.sender] > 0,"You cannot take any ether out");
        require(sent,"Transfer Failed!");
        // option 2 -> breaking the loop once completed
        balances[msg.sender] = 0;
         (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
    }
}