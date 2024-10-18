const { ethers  } = require('hardhat');
const { ZERO_ADDRESS } = require("@openzeppelin/test-helpers/src/constants.js");
const file_utils = require("../fileUtils");


async function main () {

    accounts = await ethers.getSigners();
    owner = accounts[0]
    

    console.log('Deploying Contracts...');

    const contracts_deployed = file_utils.readData(file_utils.deployPath);
    const initConfig = contracts_deployed['InitialDistroConfig']

    // yaka, _treasury, _publicTotalSupplyMax, _perchaseMax1, _perchaseMax2
    
    yakaAddress = contracts_deployed['Yaka']
    treasury = '0x86857c4d0a2c2F5e7fb4716eeA1ea20f6244BB56'
    publicTotalSupplyMax = 4_000_000
    perchaseMax1 = 10_000
    perchaseMax2 = 4_000

    console.log("yakaAddress:%s treasury:%s publicTotalSupplyMax:%d perchaseMax1:%d perchaseMax2:%d", 
      yakaAddress, treasury, publicTotalSupplyMax, perchaseMax1, perchaseMax2);

    data = await ethers.getContractFactory("TokenSale2");
    TokenSale = await data.deploy(yakaAddress, treasury, publicTotalSupplyMax, perchaseMax1, perchaseMax2);
    txDeployed = await TokenSale.deployed();
    console.log("TokenSale: ", TokenSale.address);

    contracts_deployed['TokenSale'] = TokenSale.address;
    file_utils.saveData(file_utils.deployPath, contracts_deployed);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
