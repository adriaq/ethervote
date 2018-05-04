pragma solidity ^0.4.4;


contract ethervote {
  //Data structures
  struct Voter {
      int privilege;      //Privilegi: 0 usuari no valid, 1 pot votar, 2 pot crear votacions
  }

  struct Option{
    string name;
    string description;
    bool exists;
    address[] votes;
  }
  struct Proposal{
    address creator;
    string name;
    string description;
    uint votingDeadline;
    bool exists;
    int n_options;
    mapping (int => Option) options;
  }
  //fi Data structures

    // Variables Globals
    address public owner;                      //administrador de aquesta instancia, tindra el control
    mapping(address => Voter) private census;  //conjunt de adreces que podran votar
    address[] private voters;
    mapping (int => Proposal) private proposals;       //conjunt de proposals a votar
    int public n_proposals;
    uint public creationTime;                  //Quan es va crear el contracte
    string public name;                        //Nom de la organització
    uint defaultVotingTime;                    //Temps per defecte de les votacions
    //Fi Variables Globals


    //Modifiers
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier onlyCreator(int _proposalID) {
      require(proposals[_proposalID].creator == msg.sender);
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
    constructor(string _name, uint _defaultVotingTime) public {
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
        voters.push(_voter);
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
    function getNumberOfVoters() public view returns (int){
        return int(voters.length);
    }
    function newProposal(string _name, string _description, uint _votingTime, address _creator) canCreate(_creator) public returns(bool succes) {
        int proposalID = ++n_proposals;
        if( (bytes(_name).length > 0) &&
            (bytes(_description).length > 0) &&
            (_votingTime > 0)
        ){
            proposals[proposalID].creator = _creator;
            proposals[proposalID].name = _name;
            proposals[proposalID].description = _description;
            proposals[proposalID].creator = _creator;
            proposals[proposalID].votingDeadline = now+_votingTime;
            proposals[proposalID].exists = true;
            return true;
        } else return false;
    }

    function addOption(int _proposalID, string _name, string _description) public onlyOwner onlyCreator(_proposalID) returns(bool)  {
        if( (bytes(_name).length > 0) && //si el nom no esta buit
            (proposals[_proposalID].exists) //si la proposal existeix
        ){
            int n_options = proposals[_proposalID].n_options;
            proposals[_proposalID].options[++n_options].name = _name;
            proposals[_proposalID].options[++n_options].description  = _description;
            return true;
        } else return false;
    }
    function getNumberOfOptions(int _proposalID) public view returns(int) {
      if(proposals[_proposalID].exists){
          return proposals[_proposalID].n_options;
      } else return -1;
    }
    function getNumberOfVotes(int _proposalID, int _n_option) public view returns(int){
      if(proposals[_proposalID].exists &&
         proposals[_proposalID].options[_n_option].exists
        ){
          return int(proposals[_proposalID].options[_n_option].votes.length);
      } else return -1;
    }
    function getOptionName(int _proposalID, int _n_option) public view returns(string) {
      if(proposals[_proposalID].exists &&
         proposals[_proposalID].options[_n_option].exists
        ){
          return proposals[_proposalID].options[_n_option].name;
      } else return "";
    }
    function getOptionName(int _proposalID, int _n_option) public view returns(string) {
      if(proposals[_proposalID].exists &&
         proposals[_proposalID].options[_n_option].exists
        ){
          return proposals[_proposalID].options[_n_option].description;
      } else return "";
    }

//    function deleteProposal() public{}
      function getNumberOfProposals() public view returns (int) {
        return n_proposals;
      }
      //function getProposal(int _proposalID) public returns(int, address, string, string, uint){}


//    function vote(int proposalID, string option) public returns(int){}
//    function deleteVote(int proposalID) public{}
//    function getVote(int proposalID) public{}

}
