const axios = require("axios");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256"); 

const INFURA_PROJECT_ID = '0fc13704a96e4e9f96485db15c4c3a84'; 
const BLOCK_NUMBER = 7044789; 

function decimalToHex(blockNumber) {
    return "0x" + blockNumber.toString(16);
}

async function fetchTransactionHashes(blockNumber) {
    const hexBlockNumber = decimalToHex(blockNumber);
    const url = `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`;
    const payload = {
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [hexBlockNumber, true],
        id: 1
    };

    try {
        const response = await axios.post(url, payload);
        const blockData = response.data.result;

        if (!blockData) {
            console.log("Block not found");
            return null;
        }

        const transactionHashes = blockData.transactions.map(tx => tx.hash);
        console.log("Transaction Hashes:", transactionHashes);

        return transactionHashes;
    } catch (error) {
        console.error("Error fetching block data:", error);
        return null;
    }
}

function generateMerkleTreeAndProof(transactionHashes, targetTransactionHash) {
 
    const leaves = transactionHashes.map(tx => Buffer.from(tx.slice(2), 'hex'));

    const merkleTree = new MerkleTree(leaves, keccak256, { hashLeaves: true, sortPairs: true });

  
    const merkleRoot = merkleTree.getRoot().toString('hex');
    console.log("Merkle Root:", `0x${merkleRoot}`);

   
    console.log("Merkle Tree Levels:");
    merkleTree.getLayers().forEach((layer, index) => {
        console.log(`Layer ${index}:`, layer.map(x => '0x' + x.toString('hex')));
    });

    const targetLeaf = Buffer.from(targetTransactionHash.slice(2), 'hex');
    const proof = merkleTree.getProof(targetLeaf).map(x => '0x' + x.data.toString('hex'));

    if (proof.length === 0) {
        console.warn("Warning: No proof generated. Verify the transaction hash and tree structure.");
    } else {
        console.log("Merkle Proof for the transaction:", proof);
    }

    return {
        merkleRoot: `0x${merkleRoot}`,
        proof
    };
}

async function main() {

    const transactionHashes = await fetchTransactionHashes(BLOCK_NUMBER);

    if (!transactionHashes || transactionHashes.length === 0) {
        console.log("No transactions found in the specified block.");
        return;
    }


    const targetTransactionHash = transactionHashes[0];
    console.log("Target Transaction Hash:", targetTransactionHash);

  
    const { merkleRoot, proof } = generateMerkleTreeAndProof(transactionHashes, targetTransactionHash);

    console.log("Merkle Root:", merkleRoot);
    console.log("Merkle Proof:", proof);
}

main();
