// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./IERC20.sol";
import "./Owner.sol";

contract StakingDApp is Owner{
    
    IERC20 nt; // native token

    constructor(address ntAddress) Owner(){
        nt = IERC20(ntAddress);
    }


}