require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "buildbear",
  networks: {
    buildbear: {
      url: "https://backend.buildbear.io/node/gallant-liskov-53082d"
    }
  }
};
