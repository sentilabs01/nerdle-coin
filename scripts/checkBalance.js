async function main() {
    const [deployer] = await ethers.getSigners();

    // Get the balance in wei
    const balance = await deployer.provider.getBalance(deployer.address);

    console.log("Account balance:", balance.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
