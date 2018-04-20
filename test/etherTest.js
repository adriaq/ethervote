const Ethervote = artifacts.require('./Ethervote.sol')

contract('Ethervote', function (accounts) {
	let ethervote

    let owner_address = accounts[0]
    let voter_1 = accounts[1]

	beforeEach('setup contract for each test', async function () {
     ethervote = await Ethervote.new("Test 1", 5)
	})

    //accounts[0] es sempre el owner
    it('has an owner', async function() {
    	assert.equal(await ethervote.owner(), accounts[0])
    })

    it('add voter', async function() {
        await ethervote.addVoter(accounts[1], 2, {from: owner_address})  
    })

    it('has privilege', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        let priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 2)
    })

    /****************************************************************************************/
    //Getting error in assertion: "return {} when expected 2"

    it('has changed privilege', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        let priv_1 = await ethervote.getPrivilege(voter_1)
        assert.equal(priv_1, 2)

        await ethervote.changePrivilege(voter_1, 1, {from: owner_address})
        let priv_2 = await ethervote.getPrivilege(voter_1)
        assert.equal(priv_2, 1)
    })

    it('has deleted user', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        let priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 2)

        await ethervote.deleteVoter(voter_1, {from: owner_address})
        priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 0)
    })
    /****************************************************************************************/


    it('create proposal', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        await ethervote.newProposal("proposal_test_1", "First proposal test description", 
            300, voter_1, "yes", {from: voter_1})
    })

    
})