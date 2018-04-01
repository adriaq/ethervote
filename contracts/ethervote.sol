pragma solidity ^0.4.4;


contract ethervote {
  //Data structures
  struct Voter {
      int privilege;      //Privilegi: 0 usuari no valid, 1 pot votar, 2 pot crear votacions
  }
  struct Proposal{
    int proposalID;
    address creator;
    string name;
    string description;
    uint votingDeadline;
  }
  //fi Data structures
    // Variables Globals
    address public owner;   //administrador de aquesta instancia, tindra el control
    mapping(address => Voter) private census;               //conjunt de adreces que podran votar
    Proposal[] proposals;
    uint public creationTime;
    string public name;
    uint defaultVotingTime;
    //Fi Variables Globals





    //Modifiers
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier canVote(address _voter) {
        require(census[_voter].privilege >= 1);
        _;
    }
    modifier canCreate(address _voter) {
      require(census[_voter].privilege >=2);
      _;
    }
    //Creadora
    function ethervote(string _name, uint _defaultVotingTime) public {
      owner = msg.sender;
      creationTime = now;
      name = _name;
      defaultVotingTime = _defaultVotingTime;
     }
    //L'esdeveniment saltara amb el resultat de si s'ha afegit be o no el votant. Una adreça 0 significa que hi ha hagut algun error
    event addVoterResult(address _voter);

    //Afegir votant
    function addVoter(address _voter, int _privilege) onlyOwner public {
      if((_privilege >= 1) && (_privilege <=3)) {
        Voter storage new_voter;
        new_voter.privilege = _privilege;
        census[_voter] = new_voter;
        emit addVoterResult(_voter);
      }
      emit addVoterResult(address(0));
    }

    function getPrivilege(address _voter) public returns (int){
      return census[_voter].privilege;
    }

    event changePrivilegeResult(bool);
    function changePrivilege(address _voter, int _privilege) onlyOwner public {
      census[_voter].privilege = _privilege;
      emit changePrivilegeResult(true);
    }

    event deleteVoterResult(bool);
    function deleteVoter(address _voter) onlyOwner public {
        census[_voter].privilege = 0;
        emit deleteVoterResult(true);
    }

    function newProposal(string _name, string _description, uint _votingTime, address _creator) canCreate(_creator) public {
      uint proposalID = ++proposals.length;
      Proposal storage p;
      p.name = _name;
      p.description = _description;
      p.votingDeadline = now + _votingTime;
      p.creator = _creator;
      proposals[proposalID] = p;
    }
}
