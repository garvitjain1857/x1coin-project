const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingContract", function () {
    let stakingContract;
    let x1Coin;
    let owner;
    let user;
    const STAKE_AMOUNT = ethers.utils.parseEther("1000");

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();
        
        const X1Coin = await ethers.getContractFactory("X1Coin");
        x1Coin = await X1Coin.deploy();
        
        const StakingContract = await ethers.getContractFactory("StakingContract");
        stakingContract = await StakingContract.deploy(x1Coin.address);
        
        await x1Coin.transfer(user.address, STAKE_AMOUNT);
        await x1Coin.connect(user).approve(stakingContract.address, STAKE_AMOUNT);
    });

    it("Should stake tokens", async () => {
        await stakingContract.connect(user).stake(STAKE_AMOUNT);
        
        const stake = await stakingContract.stakes(user.address);
        expect(stake.amount).to.equal(STAKE_AMOUNT);
    });

    it("Should calculate rewards correctly", async () => {
        await stakingContract.connect(user).stake(STAKE_AMOUNT);
        
        await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60]);
        await ethers.provider.send("evm_mine");
        
        const stake = await stakingContract.stakes(user.address);
        const reward = await stakingContract.calculateReward(stake);
        
        expect(reward).to.equal(STAKE_AMOUNT.mul(10).div(100));
    });

    it("Should not allow early unstaking", async () => {
        await stakingContract.connect(user).stake(STAKE_AMOUNT);
        
        await expect(
            stakingContract.connect(user).unstake()
        ).to.be.revertedWith("Tokens are locked");
    });

    it("Should allow unstaking after lock period", async () => {
        await stakingContract.connect(user).stake(STAKE_AMOUNT);
        
        await ethers.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]);
        await ethers.provider.send("evm_mine");
        
        const balanceBefore = await x1Coin.balanceOf(user.address);
        await stakingContract.connect(user).unstake();
        const balanceAfter = await x1Coin.balanceOf(user.address);
        
        expect(balanceAfter).to.be.gt(balanceBefore);
    });
});