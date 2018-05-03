pragma solidity ^0.4.4;


contract ethervote {
  //Data structures
  struct Voter {
      int privilege;      //Privilegi: 0 usuari no valid, 1 pot votar, 2 pot crear votacions
  }

  struct Option{
    string name;
    int votes;
  }
  struct Proposal{
    int proposalID;
    address creator;
    string name;
    string description;
    uint votingDeadline;
    Option[] options;
  }
  //fi Data structures

    // Variables Globals
    address public owner;                      //administrador de aquesta instancia, tindra el control
    mapping(address => Voter) private census;  //conjunt de adreces que podran votar
    Proposal[] proposals;                      //conjunt de proposals a votar
    uint public creationTime;                  //Quan es va crear el contracte
    string public name;                        //Nom de la organització
    uint defaultVotingTime;                    //Temps per defecte de les votacions
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
        census[_voter] = Voter({privilege: _privilege});
        emit addVoterResult(_voter);
      }
      emit addVoterResult(address(0));
    }

    function getPrivilege(address _voter) public view returns (int){
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

    function newProposal(string _name, string _description, uint _votingTime, address _creator, string _options) canCreate(_creator) public returns(bool succes) {
        int proposalID = int(proposals.length);
        if( (bytes(_name).length > 0) &&
            (bytes(_description).length > 0) &&
            (_votingTime > 0) &&
            (census[_creator].privilege >= 2)
            //Falta comprovar options
        ){
            proposals.push(
                Proposal({
                     proposalID: proposalID,
                     creator: _creator,
                     name: _name,
                     description: _description,
                     votingDeadline: now+_votingTime,
                     options: _options
            }));
            return true;
        } else return false;
    }
//    function deleteProposal() public{}
      function getNumberOfProposals() public returns (int) {
        return int(proposals.length);
      }
      //function getProposal(int _proposalID) public returns(int, address, string, string, uint){}


//    function vote(int proposalID, string option) public returns(int){}
//    function deleteVote(int proposalID) public{}
//    function getVote(int proposalID) public{}

}
