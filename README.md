# Ethervote: A blockchain based voting system

Ethervote es una plataforma online que permet crear Organitzacions on diferents usuaris poden crear i votar propostes. Aquest procés d'informació és realitzarà a la Blockchain d'Ethereum gràcies a les característiques que explicarem més endavant.

L'aplicació estarà composada per un frontend escrit en React, el qual farà les crides cap a la Blockchain d'Ethereum. L'interfície que autoritzarà les operacions, proporcionarà una API i mostrarà la wallet del usuari serà Metamask, una extensió del navegador. Al backend trobarem la Blockchain d'Ethereum amb la seva API i un petit servidor Express de NodeJS per emmagatzemar una petita informació persistent com quin hash te el contracte. Anteriorment tot això estarà empaquetat en un contenidor docker preparat per ser executat en plataformes com Kubernetes, però en lúltima versió hem eliminat aquesta opció
## Com executar ethervote
Ethervote esta desenvolupat amb [create-react-app](https://github.com/facebook/create-react-app), per tant fa servir NPM com sistema de paquets i de gestor de workflow. Si és la primera vegada que clones el repository s'ha d'executar:

    npm install
A la carpeta arrel i frontend per instal·lar les dependències.

A la carpeta server s'ha de crear un arxiu amb el següent contingut JSON:


    {"organitzation_name":"","ethervote_address":"","deployed":false}
Que indicarà si el contracte esta instanciat o no.

Les següents comandes estan disponibles:

 - **npm start:** arranca ethervote en *mode development*
 - **npm build:** compila ethervote per poder executar-lo en un servidor web
 - **truffle compile:** compila el Smart Contract
 - **truffle test**: executa els tests del Smart Contract

Recomanem ganache-cli com a eina per desenvolupar el projecte.



 


