require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" }); // Load vars from the parent folder

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    networks: {
        hardhat: {},
    },
};