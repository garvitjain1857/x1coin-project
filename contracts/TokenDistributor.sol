// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TeamVesting.sol";

contract TokenDistributor {
    address public immutable publicSale;
    address public immutable community;
    TeamVesting public teamVesting;

    constructor(
        address tokenAddress,
        address _publicSale,
        address _team,
        address _community
    ) {
        publicSale = _publicSale;
        community = _community;
        
        teamVesting = new TeamVesting(
            tokenAddress,
            _team,
            182 days
        );
        
        IERC20 token = IERC20(tokenAddress);
        
        token.transfer(publicSale, 500_000_000 * 1e18);
        token.transfer(address(teamVesting), 300_000_000 * 1e18);
        token.transfer(community, 200_000_000 * 1e18);
    }
}