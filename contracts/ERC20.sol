// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import './IERC20.sol';

contract ERC20 is IERC20{
    
    string _name;
    string _symbol;
    uint _totalSupply;
    mapping (address => uint) balances;
    mapping (address => mapping(address => uint)) allowances;


    function name() external view returns(string memory) {
        return _name;        
    }

    function symbol() external view returns(string memory) {
        return _symbol;        
    }

    function totalSupply() external view returns(uint) {
        return _totalSupply;        
    }

    function balanceOf(address who) external view returns (uint256){
        return balances[who];
    }

    function allowance(address owner, address spender) external view returns (uint){
        return allowances[owner][spender];
    }

    function transfer(address to, uint value) external returns (bool){
        require(value > 0 ,"ERROR: VALUE IS ZERO!");
        require(value > 0 ,"ERROR: VALUE IS ZERO!");
        require(balances[msg.sender] >= value ,"ERROR: INSUFFICIENT BALANCE!");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender,to,value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool){
        require(value > 0 ,"ERROR: VALUE IS ZERO!");
        allowances[msg.sender][spender]=value;
        emit Approval(msg.sender,spender,value);
        return true;
    }

    function transferFrom(address from, address to, uint value) external returns (bool){
        require(balances[from] >= value , "ERROR: INSUFFICIENT BALANCE!");
        require(value > 0 ,"ERROR: VALUE IS ZERO!");
        require(allowances[from][msg.sender] >= value ,"ERROR: NOT ALLOWED!");
        balances[from] -= value;
        balances[to] += value;
        allowances[from][msg.sender] -= value;
        emit Transfer(from,to,value);
        return true;
    }

}