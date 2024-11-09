import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MerkleProofVerification from './MerkleProofVerification.json';

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [transactionHash, setTransactionHash] = useState("");
    const [merkleProof, setMerkleProof] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                setWeb3(web3);

                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);

                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
                const contract = new web3.eth.Contract(
                    MerkleProofVerification.abi,
                    contractAddress
                );
                setContract(contract);
            } else {
                alert("Please install MetaMask to use this application.");
            }
        };

        initWeb3();
    }, []);

    const verifyTransaction = async () => {
        if (contract && transactionHash && merkleProof) {
            try {
                const proofArray = merkleProof.split(',').map(item => item.trim());
                const result = await contract.methods
                    .verifyTransaction(transactionHash, proofArray)
                    .call();
                setVerificationResult(result ? "Transaction is verified!" : "Transaction not found.");
            } catch (error) {
                console.error("Verification failed:", error);
                setVerificationResult("Error during verification. Check console for details.");
            }
        } else {
            setVerificationResult("Please enter a transaction hash and Merkle proof.");
        }
    };

    return (
        <div className="App">
            <h1>Merkle Proof Verification</h1>
            <p>Connected Account: {account}</p>

            <div>
                <label>Transaction Hash:</label>
                <input
                    type="text"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                />
            </div>

            <div>
                <label>Merkle Proof (comma-separated):</label>
                <input
                    type="text"
                    value={merkleProof}
                    onChange={(e) => setMerkleProof(e.target.value)}
                />
            </div>

            <button onClick={verifyTransaction}>Verify Transaction</button>

            {verificationResult && (
                <p>Verification Result: {verificationResult}</p>
            )}
        </div>
    );
};

export default App;
