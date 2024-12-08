const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying NerdleCoin with account:", deployer.address);

  // Check current gas price and convert to ether
  const gasPrice = await ethers.provider.getGasPrice();
  const gasPriceInEther = ethers.utils.formatUnits(gasPrice, "ether");
  console.log("Current gas price:", gasPriceInEther, "ETH");

  const NerdleCoin = await ethers.getContractFactory("NerdleCoin");
  const name = "NerdleCoin";
  const symbol = "NRC";
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens

  // Estimate the gas for contract deployment
  const estimatedGas = await NerdleCoin.signer.estimateGas(NerdleCoin.getDeployTransaction(name, symbol, initialSupply));
  console.log("Estimated gas for deployment:", estimatedGas.toString());

  // Check deployer's balance
  const balance = await deployer.getBalance();
  const balanceInEther = ethers.utils.formatUnits(balance, "ether");
  console.log("Account balance:", balanceInEther, "ETH");

  // Calculate the total cost for deployment (gas price * gas limit)
  const totalCost = estimatedGas.mul(gasPrice);
  const totalCostInEther = ethers.utils.formatUnits(totalCost, "ether");
  console.log("Estimated transaction cost:", totalCostInEther, "ETH");

  // Check if balance is sufficient
  if (balance.lt(totalCost)) {
    console.log("Insufficient funds to deploy contract.");
  } else {
    console.log("Sufficient funds, deploying contract...");
    const contract = await NerdleCoin.deploy(name, symbol, initialSupply);
    console.log("Contract deployed at:", contract.address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

