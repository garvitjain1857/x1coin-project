// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TeamVesting is Ownable {
    IERC20 public immutable token;
    uint256 public immutable cliff;
    uint256 public immutable totalAmount;
    uint256 public released;

    constructor(
        address _token,
        address _beneficiary,
        uint256 _cliff
    ) Ownable(_beneficiary) {
        require(_token != address(0), "Invalid token address");
        require(_beneficiary != address(0), "Invalid beneficiary");
        require(_cliff > 0, "Cliff must be positive");
        
        token = IERC20(_token);
        cliff = block.timestamp + _cliff;
        totalAmount = token.balanceOf(address(this));
        
        require(totalAmount > 0, "No tokens allocated");
    }

    function release() external onlyOwner {
        require(block.timestamp >= cliff, "Tokens are locked");
        require(released == 0, "Already released");
        
        released = totalAmount;
        token.transfer(owner(), totalAmount);
    }
}