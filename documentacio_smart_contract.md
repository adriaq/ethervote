# Ethervote smart contract documentation

##Estructures internes
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

 ## function ethervote(string _name, uint _defaultVotingTime) public
 Creadora del smart contract, com a parametres el nom i el temps de votacio que es vulgui deixar per default. Retornara l'adreça del contracte. El que executi aquesta funcio serà l'owner
 ## function addVoter(address _voter, int _privilege) onlyOwner public
 afegeix votant, com a parametres és una adreça i el privilegi
 ##     function getPrivilege(address _voter) public view returns (int){
 retorna el privilegi de un votant. Si no existeix retorna 0
