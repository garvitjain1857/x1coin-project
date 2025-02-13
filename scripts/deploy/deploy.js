require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("dotenv").config();

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },

    networks: {
        hardhat: {
            chainId: 1337
        },
        
        sepolia: {
            url: process.env.SEPOLIA_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            gasPrice: 20000000000
        }
    },

    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },

    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },

    mocha: {
        timeout: 40000
    }
};