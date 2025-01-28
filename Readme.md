# X1Coin Project

A comprehensive blockchain ecosystem featuring X1Coin ERC-20 token implementation with distribution, vesting, and staking mechanisms.

## Overview

X1Coin serves as the backbone of the X1 ecosystem, powering multiple platforms including X1Cart (NFT marketplace), X1Flex (fitness platform), X1Bid (auction platform), and X1 Racing Game.

## Smart Contract Architecture

### Token Distribution
- Total Supply: 1,000,000,000 X1C
- Public Sale: 50% (500M X1C)
- Team & Advisors: 30% (300M X1C, 6-month lock)
- Community Development: 20% (200M X1C)

### Features
- ERC-20 Token Implementation
- Automated Token Distribution System
- Team Token Vesting with 6-month cliff
- Staking System with 10% Annual Rewards
- 30-day Minimum Staking Period

## Project Structure

```
x1coin-project/
├── contracts/
│   ├── X1Coin.sol
│   ├── TokenDistributor.sol
│   ├── TeamVesting.sol
│   └── StakingContract.sol
├── test/
│   ├── X1Coin.test.js
│   ├── Distribution.test.js
│   └── Staking.test.js
├── scripts/
│   └── deploy.js
└── hardhat.config.js
```

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/x1coin-project.git
cd x1coin-project

# Install dependencies
yarn install

# Compile contracts
yarn compile

# Run tests
yarn test

# Deploy contracts
yarn deploy
```

## Security Features

- OpenZeppelin's secure contract implementations
- Reentrancy Guard for staking operations
- Time-locked team token vesting
- Ownable pattern for access control
- Comprehensive security testing

## Test Coverage

```bash
yarn coverage
```

Current coverage metrics:
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

## Contract Details

### X1Coin (ERC-20)
- Standard ERC-20 implementation
- Fixed supply of 1 billion tokens
- 18 decimal places

### TokenDistributor
- Handles initial token distribution
- Creates vesting contract for team allocation
- Manages community and public sale distributions

### TeamVesting
- 6-month lock period for team tokens
- One-time token release after cliff
- Ownership verification for withdrawals

### StakingContract
- Flexible staking mechanism
- 10% annual reward calculation
- 30-day minimum staking period
- Protected against reentrancy attacks

## Configuration

Create `.env` file:
```env
PRIVATE_KEY=your_private_key
SEPOLIA_URL=your_sepolia_url
ETHERSCAN_API_KEY=your_etherscan_key
```

## Development Commands

```bash
# Compile contracts
yarn compile

# Run tests
yarn test

# Generate coverage report
yarn coverage

# Deploy to local network
yarn deploy

# Deploy to testnet
yarn deploy:sepolia
```

## Testing

Run comprehensive test suite:
```bash
yarn test
```

Individual test files:
```bash
yarn test test/X1Coin.test.js
yarn test test/Distribution.test.js
yarn test test/Staking.test.js
```

## Deployment

1. Set up environment variables in `.env`
2. Deploy contracts:
```bash
# Local deployment
yarn deploy

# Testnet deployment
yarn deploy:sepolia
```

## Security Considerations

- All functions implement reentrancy protection
- Time-locked mechanisms for team tokens
- Owner-only access for critical functions
- Comprehensive input validation

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -am 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Contact

Project Link: [https://github.com/garvitjain1857/x1coin-project](https://github.com/garvitjain1857/x1coin-project)