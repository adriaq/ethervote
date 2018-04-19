const Ethervote = artifacts.require('./Ethervote.sol')

contract('Ethervote', function ([owner, donor]) {
	let ethervote;

	beforeEach('setup contract for each test', async function () {
        ethervote = await Ethervote.new("Test 1", 5)
	})

    it('has an owner', async function() {
    	assert.equal(await ethervote.owner(), owner)
    })

    it('create proposal', async function() {
    	await ethervote.newProposal("proposal_test_1", "First proposal test description", 300, owner, "yes")
    	assert.equal(ethervote.proposals.size(), 1)
    })

    it('add voter', async function() {
    	await ethervote.addVoter(owner, 2)
    	//assert.equals(ethervote.census.size(), 1)
    	


    	assert.equal(ethervote.getPrivilege(ethervote.owner()), null)
    })
})