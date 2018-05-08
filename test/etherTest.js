const Ethervote = artifacts.require('./Ethervote.sol')

contract('Ethervote', function (accounts) {
	var ethervote

    var owner_address = accounts[0]
    var voter_1 = accounts[1]
    var voter_2 = accounts[2]
    var voter_3 = accounts[3]
    var voter_4 = accounts[4]
    var voter_5 = accounts[5]
    var voter_6 = accounts[6]

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


    it('create proposal', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})

        //voter_1 createa a new proposal
        await ethervote.newProposal("proposal_test_1", "First proposal test description", {from: voter_1})

        var res = await ethervote.getNumberOfProposals()
        assert.equal(res, 1)
    })

    
    it('add options to proposal', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})

        //voter_1 creates a new proposal
        await ethervote.newProposal("proposal_with_options", "First proposal with 1 option", {from: voter_1})

        //voter_1 adds 'yes' and 'no' options to the proposal
        await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        //1 is the ID of the proposal -> to be changed
        var res = await ethervote.getNumberOfOptions(1)
        assert.equal(res, 2)
    })


    it('vote', async function() {
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        await ethervote.addVoter(voter_2, 1, {from: owner_address})

        //voter_1 creates a new proposal and add 2 options 
        await ethervote.newProposal("proposal_voting", "First proposal test voting", {from: voter_1})
        await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        //voter_2 votes for the first option (yes)
        await ethervote.vote(1, 1, {from: voter_2})

        //1 is the ID of the proposal -> to be changed
        var v = await ethervote.getNumberOfVotes(1, 1)
        assert.equal(v, 1)
    })

    it('more voting', async function() {
        //admin adds voters
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        await ethervote.addVoter(voter_2, 1, {from: owner_address})
        await ethervote.addVoter(voter_3, 1, {from: owner_address})
        await ethervote.addVoter(voter_4, 1, {from: owner_address})
        await ethervote.addVoter(voter_5, 1, {from: owner_address})

        //voter_1 creates a new proposal and add 2 options 
        await ethervote.newProposal("proposal_voting", "First proposal test voting", {from: voter_1})
        await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        //Here voters start to vote
        await ethervote.vote(1, 1, {from: voter_1}) 
        await ethervote.vote(1, 2, {from: voter_2})
        await ethervote.vote(1, 2, {from: voter_3})
        await ethervote.vote(1, 1, {from: voter_4})
        await ethervote.vote(1, 2, {from: voter_5})     

        //Print results
        var res_1 = await ethervote.getNumberOfVotes(1, 1)
        var res_2 = await ethervote.getNumberOfVotes(1, 2)
        assert.equal(res_1, 2)
        assert.equal(res_2, 3)
    })

    it('lets try to break things', async function() {
        //admin adds voters
        await ethervote.addVoter(voter_1, 2, {from: owner_address})
        await ethervote.addVoter(voter_2, 1, {from: owner_address})
        await ethervote.addVoter(voter_3, 1, {from: owner_address})
        await ethervote.addVoter(voter_4, 1, {from: owner_address})
        await ethervote.addVoter(voter_5, 1, {from: owner_address})
        //If the following line is not commented test will fail
        //await ethervote.addVoter(voter_6, 1, {from: voter_1})

        //voter_2 can't add options. He's not the proposal's creator
        await ethervote.newProposal("proposal_voting", "First proposal test voting", {from: voter_1})
        //If the following line is not commented test will fail
        //await ethervote.addOption(1, "Yes", "If you agree", {from: voter_2})
        await ethervote.addOption(1, "Yes", "If you agree", {from: voter_1})
        await ethervote.addOption(1, "No", "If you don't agree", {from: voter_1})

        //Proving if 2 options added correctly
        var num_of_options = await ethervote.getNumberOfOptions(1)
        assert.equal(num_of_options, 2)

        await ethervote.vote(1, 1, {from: voter_1})
        await ethervote.vote(1, 1, {from: voter_1})
        await ethervote.vote(1, 2, {from: voter_1})
        await ethervote.vote(1, 2, {from: voter_2})
        await ethervote.vote(1, 2, {from: voter_3})
        await ethervote.vote(1, 1, {from: voter_4})
        await ethervote.vote(1, 2, {from: voter_5})

        //Print results
        var res_1 = await ethervote.getNumberOfVotes(1, 1)
        var res_2 = await ethervote.getNumberOfVotes(1, 2)
        assert.equal(res_1, 2)
        assert.equal(res_2, 3)
    })














})