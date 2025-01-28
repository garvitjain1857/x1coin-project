const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenDistribution", function () {
    let x1Coin;
    let distributor;
    let owner;
    let publicSale;
    let team;
    let community;
    const TOTAL_SUPPLY = ethers.utils.parseEther("1000000000");

    beforeEach(async () => {
        [owner, publicSale, team, community] = await ethers.getSigners();
        
        const X1Coin = await ethers.getContractFactory("X1Coin");
        x1Coin = await X1Coin.deploy();
        
        const TokenDistributor = await ethers.getContractFactory("TokenDistributor");
        distributor = await TokenDistributor.deploy(
            x1Coin.address,
            publicSale.address,
            team.address,
            community.address
        );
        
        await x1Coin.transfer(distributor.address, TOTAL_SUPPLY);
    });

    it("Should distribute tokens correctly", async () => {
        const publicSaleBalance = await x1Coin.balanceOf(publicSale.address);
        const communityBalance = await x1Coin.balanceOf(community.address);
        
        expect(publicSaleBalance).to.equal(TOTAL_SUPPLY.mul(50).div(100));
        expect(communityBalance).to.equal(TOTAL_SUPPLY.mul(20).div(100));
    });

    it("Should lock team tokens", async () => {
        const vestingAddress = await distributor.teamVesting();
        const teamBalance = await x1Coin.balanceOf(vestingAddress);
        
        expect(teamBalance).to.equal(TOTAL_SUPPLY.mul(30).div(100));
    });
});