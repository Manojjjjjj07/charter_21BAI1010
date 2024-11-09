const MerkleProofVerification = artifacts.require("MerkleProofVerification");

module.exports = async function (deployer) {
    await deployer.deploy(MerkleProofVerification);
};
