// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract X1Coin is ERC20 {
    uint256 private constant TOTAL_SUPPLY = 1_000_000_000 * 1e18;
    
    constructor() ERC20("X1Coin", "X1C") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}