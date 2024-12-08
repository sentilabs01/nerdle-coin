// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NerdleCoin is ERC20, Ownable {
    // Maximum supply of tokens
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100 million tokens (considering 18 decimals)

    // Minting function (only callable by the owner)
    constructor(string memory name, string memory symbol, uint256 _initialSupply)
        ERC20(name, symbol)
    {
        require(_initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        _mint(msg.sender, _initialSupply); // Directly mint to the deployer's address
    }

    // Controlled minting function (only callable by the owner)
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Minting exceeds max supply");
        _mint(to, amount);
    }

    // Burning function (only callable by the owner)
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    // Function to return the current total supply
    function currentSupply() external view returns (uint256) {
        return totalSupply();
    }
}
