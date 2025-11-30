require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" }); // Load vars from the parent folder

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        sepolia: {
            // This looks for RPC_URL in your .env file
            url: process.env.RPC_URL || "https://rpc.sepolia.org",
            // This looks for your MetaMask key in .env
            accounts: process.env.RELAYER_PRIVATE_KEY ? [process.env.RELAYER_PRIVATE_KEY] : [],
        },
    },
};