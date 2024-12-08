require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet: {
      url: process.env.INFURA_API_KEY,  // Infura URL
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Private key (make sure to prefix with 0x)
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // Etherscan API key for verification
  },
};
