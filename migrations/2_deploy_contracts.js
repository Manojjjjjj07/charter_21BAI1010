const MerkleProofVerification = artifacts.require("MerkleProofVerification");

module.exports = function (deployer) {
    deployer.deploy(MerkleProofVerification);
};
