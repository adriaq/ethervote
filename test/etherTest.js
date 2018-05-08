const Ethervote = artifacts.require('./Ethervote.sol')

contract('Ethervote', function (accounts) {
	var ethervote

    var owner_address = accounts[0]
    var voter_1 = accounts[1]
    var voter_2 = accounts[2]

	beforeEach('setup contract for each test', async function () {
     ethervote = await Ethervote.new("Test 1", 300)
	})

    //accounts[0] es sempre el owner
    it('has an owner', async function() {
    	assert.equal(await ethervote.owner(), owner_address)
    })


    it('add voter', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var res = await ethervote.getNumberOfVoters()  
        assert.equal(res, 1);
    })


    it('has privilege', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 2)
    })


    it('has changed privilege', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var priv_1 = await ethervote.getPrivilege(voter_1)
        assert.equal(priv_1, 2)

        await ethervote.changePrivilege(voter_1, 1, {from: owner_address})
        var priv_2 = await ethervote.getPrivilege(voter_1)
        assert.equal(priv_2, 1)
    })


    it('has deleted user', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 2)

        await ethervote.deleteVoter(voter_1, {from: owner_address})
        priv = await ethervote.getPrivilege(voter_1)
        assert.equal(priv, 0)
    })


    //Returns of 'newProposal' and 'addOption' functions returning tx info instead of int

    it('create proposal', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var id = await ethervote.newProposal("proposal_test_1", "First proposal test description", {from: voter_1})

        var res = await ethervote.getNumberOfProposals()
        assert.equal(res, 1)
    })

    
    it('add options to proposal', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        var id = await ethervote.newProposal("proposal_with_options", "First proposal with 1 option", {from: voter_1})

        var num_option_1 = await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        var num_option_2 = await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        var res = await ethervote.getNumberOfOptions(1)
        assert.equal(res, 2)
    })


    it('vote', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        await ethervote.addVoter(voter_2, 1, {from: owner_address})

        var id = await ethervote.newProposal("proposal_voting", "First proposal test voting", {from: voter_1})
        var num_option_1 = await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        var num_option_2 = await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        var res = await ethervote.getNumberOfOptions(1)
        assert.equal(res, 2)

        await ethervote.vote(1, 1, {from: voter_2})

        var v = await ethervote.getNumberOfVotes(1, 1)
        assert.equal(v, 1)
    })

})