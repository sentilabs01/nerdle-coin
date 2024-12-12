// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract NerdleCoin is ERC20, Ownable, Pausable {
    // Maximum supply of tokens
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100 million tokens with 18 decimals

    // Constructor to initialize the token
    constructor(
        string memory name,
        string memory symbol,
        uint256 _initialSupply
    ) ERC20(name, symbol) {
        require(
            _initialSupply <= MAX_SUPPLY,
            "Initial supply exceeds max supply"
        );
        _mint(msg.sender, _initialSupply); // Mint initial supply to deployer
    }

    // Controlled minting function (only callable by the owner)
    function mint(address to, uint256 amount) external onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Minting exceeds max supply"
        );
        _mint(to, amount);
    }

    // Burning function (callable by token holders)
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    // Pause the contract (only callable by the owner)
    function pause() external onlyOwner {
        _pause();
    }

    // Unpause the contract (only callable by the owner)
    function unpause() external onlyOwner {
        _unpause();
    }

    // Override to include pause functionality
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    // Explicitly set decimals to 18
    function decimals() public pure override returns (uint8) {
        return 18;
    }

    // Function to return the current total supply (optional but consistent)
    function currentSupply() external view returns (uint256) {
        return totalSupply();
    }
}
