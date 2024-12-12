const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Estimating gas with account:", deployer.address);

  // Get the current gas price and convert to ether
  const gasPrice = await ethers.provider.getGasPrice();
  const gasPriceInEther = ethers.utils.formatUnits(gasPrice, "ether");
  console.log("Current gas price:", gasPriceInEther, "ETH");

  const NerdleCoin = await ethers.getContractFactory("NerdleCoin");
  const name = "NerdleCoin";
  const symbol = "NRC";
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens

  // Estimate the gas for deployment
  const estimatedGas = await NerdleCoin.signer.estimateGas(NerdleCoin.getDeployTransaction(name, symbol, initialSupply));
  console.log("Estimated gas for deployment:", estimatedGas.toString());

  // Convert the estimated gas into ether for clearer understanding
  const estimatedGasInEther = ethers.utils.formatUnits(estimatedGas.mul(gasPrice), "ether");
  console.log("Estimated transaction cost for deployment:", estimatedGasInEther, "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
