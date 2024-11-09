const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
    networks: {
        sepolia: {
            provider: () => new HDWalletProvider(
                process.env.PRIVATE_KEY,
                `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
            ),
            network_id: 11155111,           
            gas: 3000000,                   
            gasPrice: 10000000000,          
            timeoutBlocks: 200,             
            networkCheckTimeout: 1000000    
        },
    },
    compilers: {
        solc: {
            version: "0.8.0"                
        }
    }
};
