// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract GoodContract {
    mapping(address => uint256) public balances;

    function addBalance() public payable{
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0,"You cannot take any ether out");
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent,"Transfer Failed!");

        balances[msg.sender] = 0;
    }
}