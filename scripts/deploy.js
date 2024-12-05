const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying NerdleCoin with account:", deployer.address);
  
  // Use this method to get balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  const NerdleCoin = await ethers.getContractFactory("NerdleCoin");
  const nerdleCoin = await NerdleCoin.deploy();
  
  await nerdleCoin.deployed();
  
  console.log("NerdleCoin deployed to:", nerdleCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });