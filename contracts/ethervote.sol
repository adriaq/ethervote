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
    int private n_proposals;
    uint public creationTime;                  //Quan es va crear el contracte
    string public name;                        //Nom de la organització
    uint public defaultVotingTime;                    //Temps per defecte de les votacions
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
    constructor(string _name, uint _defaultVotingTime) public  {
      owner = msg.sender;
      n_proposals = 0;
      creationTime = now;
      name = _name;
      defaultVotingTime = _defaultVotingTime;
     }
    //L'esdeveniment saltara amb el resultat de si s'ha afegit be o no el votant. Una adreça 0 significa que hi ha hagut algun error
    //event addVoterResult(address _voter);

    //Afegir votant
    function addVoter(address _voter, int _privilege) onlyOwner public returns(bool) {
      if((_privilege >= 1) &&
        (_privilege <=3) &&
        (census[_voter].privilege == 0)){
            census[_voter] = Voter({privilege: _privilege});
            voters.push(_voter);
            return true;
            //emit addVoterResult(_voter);
      }
      return false;
      //emit addVoterResult(address(0));
    }

    function getPrivilege(address _voter) public view returns (int){
      return census[_voter].privilege;
    }

    function changePrivilege(address _voter, int _privilege) onlyOwner public returns(bool) {
      census[_voter].privilege = _privilege;
      return true;
    }

    function deleteVoter(address _voter) public onlyOwner {
        census[_voter].privilege = 0;
    }

    function getNumberOfVoters() public view returns (int){
        return int(voters.length);
    }
    function newProposal(string _name, string _description) canCreate(msg.sender) public returns(int) {
        if( (bytes(_name).length > 0) &&
            (bytes(_description).length > 0)
        ){
            int proposalID = ++n_proposals;
            proposals[proposalID].creator = _creator;
            proposals[proposalID].name = _name;
            proposals[proposalID].description = _description;
            proposals[proposalID].creator = msg.sender;
            proposals[proposalID].votingDeadline = now + defaultVotingTime;
            proposals[proposalID].exists = true;
            return proposalID;
        } else return -1;
    }

    function addOption(int _proposalID, string _name, string _description) public onlyCreator(msg.sender) returns(int)  {
        if( (bytes(_name).length > 0) && //si el nom no esta buit
            (proposals[_proposalID].exists) //si la proposal existeix
        ){

            int n_option = ++proposals[_proposalID].n_options;
            proposals[_proposalID].options[n_option].name = _name;
            proposals[_proposalID].options[n_option].description  = _description;
            return n_option;
        } else return -1;
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
    function hasEnded(int _proposalID) public view returns(bool) {
      if(proposals[_proposalID].exists){
          return now > proposals[_proposalID].votingDeadline;
      }
    }
      function getNumberOfProposals() public view returns (int) {
        return n_proposals;
      }

    function vote(int _proposalID, int _option) public canVote(msg.sender) returns(bool){
        if(proposals[_proposalID].exists &&
           proposals[_proposalID].options[_option].exists &&
           (now < proposals[_proposalID].votingDeadline)
       ) {
           if(!hasVoted(msg.sender,_proposalID)) {
               proposals[_proposalID].options[_option].votes.push(msg.sender);
           }
       }
    }

    function hasVoted(address _voter, int _proposalID) public view canVote(_voter) returns(bool) {
        if (proposals[_proposalID].exists) {
            int n_options = getNumberOfOptions(_proposalID);
            int n_votes;
            bool voted = false;
            for (int opt=0; opt < n_options; ++opt) {
                n_votes = getNumberOfVotes(_proposalID,opt);
                for (int i=0; i < n_votes; ++i) {
                    if(proposals[_proposalID].options[opt].votes[uint(i)] == _voter) voted = true;
                }
            }
            return voted;
        }
    }

}
