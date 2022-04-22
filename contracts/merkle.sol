// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @dev These functions deal with verification of Merkle Trees proofs.
 *
 * The proofs can be generated using the JavaScript library
 * https://github.com/miguelmota/merkletreejs[merkletreejs].
 * Note: the hashing algorithm should be keccak256 and pair sorting should be enabled.
 *
 * See `test/utils/cryptography/MerkleProof.test.js` for some examples.
 */
contract MerkleProof {

    bytes32 public myMerkle = c7df28b791f2296c961b5b96130ff374dd4de357b70008671968c219333f64cd;
    // c8e0ab0a59aa4116815a0dfb2a833c9b795308ab4516ebc06df3d95e1cc81ecd

    mapping(address => bool) public whiteListClaim;

    function merkleAddNumber(bytes32[] calldata _merkleProf) public {
        require(!(whiteListClaim[msg.sender]), "Address already Claimed");

        bytes32 leaf = keccak256(abi.encode(msg.sender));

        require(MerkleProof.verify(_merkleProf, myMerkle, leaf), "Invalid Leaf");
        
        whiteListClaim[msg.sender] = true;
    }
   
}
