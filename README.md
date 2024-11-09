# charter_21BAI1010
# Merkle Proof Verification of Blockchain Transactions

## Project Objective

### The goal of this project is to:

1) Fetch transactions from a block on the blockchain and generate a Merkle tree.
2) Store the Merkle root of the block transactions in a smart contract.
3) Verify transaction inclusion by accepting a transaction hash and a Merkle proof as inputs to the contract and returning whether the transaction is part of the stored Merkle tree.

### Features

1) Merkle Root Storage: Allows the contract owner to set a Merkle root representing the transactions of a specified block.
2) Merkle Proof Verification: Accepts a transaction hash and its Merkle proof as inputs and verifies if the transaction is part of the stored Merkle tree.
3) Access Control: Only the contract owner can set the Merkle root, ensuring secure root updates.
4) Frontend Interface: A simple React-based frontend for user interaction with the contract, allowing users to verify transaction inclusion by providing a transaction hash and Merkle proof.

### Project Structure

1) contracts/: Contains the Solidity smart contract for Merkle Proof Verification.
2) migrations/: Truffle migration scripts to deploy the contract on Sepolia.
3) src/: Frontend code for the React interface to interact with the contract.
4) truffle-config.js: Truffle configuration file, including network settings for Sepolia.

### How It Works

Step 1: Fetch Transactions from a Block
    Using a Web3 provider (such as Infura), retrieve all transactions from a specific block number.
    Collect the transaction hashes from the block and use them to construct a Merkle tree.

Step 2: Generate a Merkle Tree and Merkle Proof
    Construct a Merkle tree from the transaction hashes within the block.
    Select one transaction hash and generate a Merkle proof that shows its inclusion in the Merkle tree.
    The Merkle root and the proof are used to verify that the transaction is indeed part of the block.

Step 3: Deploy the Smart Contract for Merkle Verification
    Deploy the Contract: Deploy the smart contract to the Sepolia testnet. This contract has functions to set the Merkle root and verify transaction inclusion.
    Merkle Root Storage: The contract stores the Merkle root of the transactions for a given block. Only the contract owner can set this root.
    Verify Transaction Inclusion: The contract provides a function that takes a transaction hash and Merkle proof as inputs. If the proof is valid, the function returns true, indicating the transaction is included in the stored Merkle tree; otherwise, it returns false.

### Smart Contract Functions

1) setMerkleRoot(bytes32 newMerkleRoot): Allows the owner to set the Merkle root for the specified block’s transactions. This function is restricted to the contract owner.
2) verifyTransaction(bytes32 transactionHash, bytes32[] memory proof): Accepts a transaction hash and Merkle proof as inputs and verifies the inclusion of the transaction in the Merkle tree. Returns true if the transaction is verified, otherwise false.

