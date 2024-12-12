const { ethers } = require("ethers");
require("dotenv").config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;

async function withdrawETH() {
    const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    try {
        // Get wallet balance
        const balance = await provider.getBalance(wallet.address);
        console.log("Current balance:", ethers.utils.formatEther(balance), "ETH");

        // Estimate gas price
        const gasPrice = await provider.getGasPrice();
        const gasLimit = 53000; // Increased from 21000 to match the error message
        const gasCost = gasPrice.mul(gasLimit);

        // Calculate amount to send (balance minus gas cost)
        const amountToSend = balance.sub(gasCost);

        if (amountToSend.lte(0)) {
            console.log("Insufficient balance to cover gas fees.");
            return;
        }

        // Prepare and send transaction
        const tx = await wallet.sendTransaction({
            to: RECIPIENT_ADDRESS || wallet.address, // Default to own address if not specified
            value: amountToSend,
            gasLimit: gasLimit,
            gasPrice: gasPrice
        });

        console.log("Transaction sent:", tx.hash);

        // Wait for transaction confirmation
        const receipt = await tx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);

    } catch (error) {
        console.error("Withdrawal error:", error);
        console.error("Detailed error message:", error.message);
    }
}

withdrawETH();