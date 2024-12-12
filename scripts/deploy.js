const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying NerdleCoin with account:", deployer.address);

  // Check current gas price
  const gasPrice = await ethers.provider.getGasPrice();
  const gasPriceInGwei = ethers.utils.formatUnits(gasPrice, "gwei");
  console.log("Current gas price:", gasPriceInGwei, "Gwei");

  // Contract details
  const NerdleCoin = await ethers.getContractFactory("NerdleCoin");
  const name = "NerdleCoin";
  const symbol = "NRC";
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens

  // Estimate the gas required for deployment
  const deployTx = NerdleCoin.getDeployTransaction(name, symbol, initialSupply);
  const estimatedGas = await deployer.estimateGas(deployTx);
  console.log("Estimated gas for deployment:", estimatedGas.toString());

  // Check deployer's balance
  const balance = await deployer.getBalance();
  const balanceInEther = ethers.utils.formatUnits(balance, "ether");
  console.log("Account balance:", balanceInEther, "ETH");

  // Calculate the total deployment cost
  const totalCost = gasPrice.mul(estimatedGas);
  const totalCostInEther = ethers.utils.formatUnits(totalCost, "ether");
  console.log("Estimated deployment cost:", totalCostInEther, "ETH");

  // Check if the deployer has sufficient funds
  if (balance.lt(totalCost)) {
    console.error("Insufficient funds to deploy contract.");
    return;
  }

  // Deploy the contract
  console.log("Sufficient funds, deploying contract...");
  const contract = await NerdleCoin.deploy(name, symbol, initialSupply);
  await contract.deployed();
  console.log("Contract deployed at:", contract.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
