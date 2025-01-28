// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract is ReentrancyGuard {
    IERC20 public immutable stakingToken;
    uint256 public constant REWARD_RATE = 10;
    uint256 public constant LOCK_PERIOD = 30 days;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        
        stakes[msg.sender] = Stake({
            amount: amount,
            startTime: block.timestamp
        });
        
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function unstake() external nonReentrant {
        Stake memory userStake = stakes[msg.sender];
        
        require(userStake.amount > 0, "No active stake");
        require(
            block.timestamp >= userStake.startTime + LOCK_PERIOD,
            "Tokens are locked"
        );
        
        uint256 reward = calculateReward(userStake);
        delete stakes[msg.sender];
        
        stakingToken.transfer(msg.sender, userStake.amount);
        stakingToken.transfer(msg.sender, reward);
    }

    function calculateReward(Stake memory userStake) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - userStake.startTime;
        return (userStake.amount * REWARD_RATE * stakingDuration) / (100 * 365 days);
    }
}