# Ethervote smart contract documentation
Per mirar aquest document en Atom apreteu control+shift+m
## Estructures internes
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

  ## LListat de funcions

 -  function addVoter(address _voter, int _privilege) onlyOwner public
 - function getPrivilege(address _voter) public view returns (int)
 - function changePrivilege(address _voter, int _privilege) onlyOwner public {
 - function deleteVoter(address _voter) onlyOwner public {
 - function getNumberOfVoters() public view returns (int){
 - function newProposal(string _name, string _description, uint _votingTime, address _creator) canCreate(_creator) public returns(bool succes) {
 - function addOption(int _proposalID, string _name, string _description) public onlyOwner onlyCreator(_proposalID) returns(bool)  {
 - function getNumberOfOptions(int _proposalID) public view returns(int) {
 - function getNumberOfVotes(int _proposalID, int _n_option) public view returns(int){
 - function getOptionName(int _proposalID, int _n_option) public view returns(string) {
 - function hasEnded(int _proposalID) public view returns(bool) {
 - function getNumberOfProposals() public view returns (int) {
 - function vote(int _proposalID, int _option) public canVote(msg.sender) returns(bool){
 - function hasVoted(address _voter, int _proposalID) public view canVote(_voter) returns(bool) {

### function ethervote(string _name, uint _defaultVotingTime) public
 Creadora del smart contract, com a parametres el nom i el temps de votacio que es vulgui deixar per default. Retornara l'adreça del contracte. El que executi aquesta funcio serà l'owner

### function addVoter(address _voter, int _privilege) onlyOwner public
 afegeix votant, com a parametres és una adreça i el privilegi

### function getPrivilege(address _voter) public view returns (int){
 retorna el privilegi de un votant. Si no existeix retorna 0

###  function changePrivilege(address _voter, int _privilege) onlyOwner public {
Canvia el privilegi de un votant, es bastant equivalent a add voter

### function deleteVoter(address _voter) onlyOwner public {
Borra un votant. Nomes l'owner ho pot fer

### function getNumberOfVoters() public view returns (int){
Retorna el numero total de gent que pot votar a la organització

### function newProposal(string _name, string _description) canCreate(_creator) public returns(bool int)
Crea una Proposal nova. Parametres: Nom, descripcio. Nomes els votants amb privilegi ho poden fer. Retorna el numero de proposal. -1 si hi ha algun problema

### function getProposalName(int id) public view returns(string) public  
Retorna el nom de una proposal segons el ID

### function getProposalDescription(int id) public view returns(string) public
Retorna la descriptio de una proposal segons el ID

###  function addOption(int _proposalID, string _name, string _description) public onlyOwner onlyCreator(_proposalID) returns(int)  
Afegeix una opcio a una proposal. retorna el numero de opcio. -1 si error

###  function getNumberOfOptions(int _proposalID) public view returns(int) {
Retorna el numero de opcions de una proposal

### function getName() public view returns(string)  
Retorna el nom de la organització

### function getNumberOfVotes(int _proposalID, int _n_option) public view returns(int){
retorna el numero de vots de una opcio de una proposal

### function getOptionName(int _proposalID, int _n_option) public view returns(string) {
retorna el nom de una opcio de una proposal

###   function getOptionDescription(int _proposalID, int _n_option) public view returns(string)
retorna la descripcio de una poció de una proposal

### function hasEnded(int _proposalID) public view returns(bool) {
retorna si una proposal ha finalitzat

### function getNumberOfProposals() public view returns (int) {
retorna el numero de proposals

### function vote(int _proposalID, int _option) public canVote(msg.sender) returns(bool){
vota en una proposal. Com a parametre proposalID i opcio

### function hasVoted(address _voter, int _proposalID) public view canVote(_voter) returns(bool) {
retorna si un votant ha votat en una proposal
