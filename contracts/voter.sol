// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voter {
    uint numberFor;
    uint numberAgainst;
    function voteFor()  public{
        numberFor += 1;
    }
     function voteAgainst()  public{
        numberAgainst += 1;
    }
    function getFor() public view returns (uint) {
    return numberFor;
    }
  function getAgainst() public view returns (uint) {
    return numberAgainst;
  }
}