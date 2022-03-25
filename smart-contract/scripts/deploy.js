const { ethers } = require('hardhat')

const main = async () => {
  const tinderFactory = await ethers.getContractFactory('TinderERC721')
  const TinderContract = await tinderFactory.deploy()

  console.log('TINDER CONTRACT ADDRESS:', TinderContract.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log('Error in deploying Contract >> ', error)
    process.exit(1)
  })
