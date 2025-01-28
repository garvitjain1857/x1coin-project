const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("X1Coin", function () {
    let x1Coin;
    let owner;
    let user1;
    let user2;
    const TOTAL_SUPPLY = ethers.utils.parseEther("1000000000");

    beforeEach(async () => {
        [owner, user1, user2] = await ethers.getSigners();
        
        const X1Coin = await ethers.getContractFactory("X1Coin");
        x1Coin = await X1Coin.deploy();
    });

    it("Should have correct token properties", async () => {
        expect(await x1Coin.name()).to.equal("X1Coin");
        expect(await x1Coin.symbol()).to.equal("X1C");
        expect(await x1Coin.decimals()).to.equal(18);
        expect(await x1Coin.totalSupply()).to.equal(TOTAL_SUPPLY);
        expect(await x1Coin.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("Should transfer tokens", async () => {
        await x1Coin.transfer(user1.address, 1000);
        expect(await x1Coin.balanceOf(user1.address)).to.equal(1000);
    });
});