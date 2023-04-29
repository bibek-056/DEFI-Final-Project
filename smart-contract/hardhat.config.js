/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'goreli',
    networks :{
      hardhat: {},
      goreli: {
        url: 'https://rpc.ankr.com/eth_goreli',
        accounts: ['a5ddd7088b51860ef0cee8ef8093172e5ea425b526e779c51bec1735167a7219']
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
