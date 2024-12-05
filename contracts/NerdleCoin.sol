// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NerdleCoin is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 1_000_000 * 10**18;
    uint256 private constant MAX_SUPPLY = 100_000_000 * 10**18;

    constructor() ERC20("NerdleCoin", "NERD") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum supply");
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}