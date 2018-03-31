pragma solidity ^0.4.4;


contract ethervote {
    address public owner = msg.sender;   #administrador de aquesta instancia, tindra el control
    adress[] private cens;               #conjunt de adreces que podran votar
    uint public creationTime = now;
    struct voter {
        adress id;
        int privilegi;
    }

    function ethervote() {
        owner =
    }
}
