const axios = require("axios");

const INFURA_PROJECT_ID = '0fc13704a96e4e9f96485db15c4c3a84'; 
const BLOCK_NUMBER = '6B7EB5'; 

async function fetchBlockData() {
    const url = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;
    const payload = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [BLOCK_NUMBER, true],
        id: 1
    };

    try {
        const response = await axios.post(url, payload);
        const blockData = response.data.result;
        console.log("Block Data:", blockData);
    } catch (error) {
        console.error("Error fetching block data:", error);
    }
}

fetchBlockData();
