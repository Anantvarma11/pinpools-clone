const hre = require("hardhat");

async function main() {
    const biddingEngine = await hre.ethers.deployContract("CommodityBiddingEngine");

    await biddingEngine.waitForDeployment();

    console.log(
        `CommodityBiddingEngine deployed to ${biddingEngine.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
