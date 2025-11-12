// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IOracle.sol";
import "./ReputationNFT.sol";

contract ReputationBridge is Ownable {
    
    struct LinkRecord {
        address newAddress; 
        uint256 linkTimestamp; 
        uint256 reputationScore; 
        bool isVerified; 
        bytes32 proofHash; 
    }

    mapping(address => LinkRecord) public links;

    // Protokol Ayarları
    address public oracleAddress;
    ReputationNFT public nftContract;
    address public feeReceiver;
    uint256 public baseFee;
    uint256 public successFee;

    event LinkRequested(address indexed oldAddress, address indexed newAddress, bytes32 proofHash);
    event LinkVerified(address indexed oldAddress, address indexed newAddress, uint256 finalScore);

    // Constructor: Ownable(msg.sender) eklendi
    constructor(address _nftContractAddress, address _feeReceiver, uint256 _baseFee) Ownable(msg.sender) {
        nftContract = ReputationNFT(_nftContractAddress);
        feeReceiver = _feeReceiver;
        baseFee = _baseFee;
        oracleAddress = msg.sender;
    }
    
    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Yalnizca yetkili Oracle cagirabilir.");
        _;
    }

    function setOracleAddress(address _newOracle) public onlyOwner {
        oracleAddress = _newOracle;
    }
    
    function requestLink(address _oldAddress, bytes32 _proofHash) public payable {
        require(msg.value == baseFee, "Talep ucreti, belirlenen baseFee'ye esit olmalidir.");
        require(links[_oldAddress].newAddress == address(0), "Bu eski adres icin zaten bir talep var.");
        
        links[_oldAddress] = LinkRecord({
            newAddress: msg.sender,
            linkTimestamp: block.timestamp,
            reputationScore: 0,
            isVerified: false,
            proofHash: _proofHash
        });

        (bool sent, ) = payable(feeReceiver).call{value: baseFee}("");
        require(sent, "BaseFee gonderilemedi.");

        emit LinkRequested(_oldAddress, msg.sender, _proofHash);
    }
    
    function setVerificationStatus(address _oldAddress, bool _status, uint256 _finalScore) public onlyOracle {
        LinkRecord storage record = links[_oldAddress];
        require(record.newAddress != address(0), "Talep bulunamadi.");
        require(!record.isVerified, "Bu talep zaten dogrulanmis.");

        record.isVerified = _status;
        record.reputationScore = _finalScore;

        if (_status) {
            nftContract.mintNFT(record.newAddress, _oldAddress, _finalScore);
        }
        
        emit LinkVerified(_oldAddress, record.newAddress, _finalScore);
    }
}