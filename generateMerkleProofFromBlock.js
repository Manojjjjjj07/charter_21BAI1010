const Web3 = require('web3').default;
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('crypto-js/sha3');

const INFURA_PROJECT_ID = '0fc13704a96e4e9f96485db15c4c3a84';
const web3 = new Web3(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);

const BLOCK_NUMBER = 7044789;

async function fetchTransactionHashes(blockNumber) {
    try {
        const block = await web3.eth.getBlock(blockNumber, true);
        if (!block) {
            console.log("Block not found");
            return null;
        }

        const transactionHashes = block.transactions.map(tx => tx.hash);
        console.log("Transaction Hashes:", transactionHashes);

        return transactionHashes;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }
}

function generateMerkleTreeAndProof(transactionHashes, targetTransactionHash) {
    const leaves = transactionHashes.map(tx => Buffer.from(tx.slice(2), 'hex'));
    const merkleTree = new MerkleTree(leaves, keccak256, { hashLeaves: true, sortPairs: true });

    const merkleRoot = merkleTree.getRoot().toString('hex');
    console.log("Merkle Root:", `0x${merkleRoot}`);

    const targetLeaf = Buffer.from(targetTransactionHash.slice(2), 'hex');
    const proof = merkleTree.getProof(targetLeaf).map(x => '0x' + x.data.toString('hex'));
    console.log("Merkle Proof for the transaction:", proof);

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
