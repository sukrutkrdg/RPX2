// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Oracle için sadece gerekli fonksiyonları tanımlayan arayüz
interface IOracle {
    function setVerificationStatus(
        address _oldAddress, 
        bool _status, 
        uint256 _finalScore
    ) external;
}