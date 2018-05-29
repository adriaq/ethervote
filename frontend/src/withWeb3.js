import React, {Component} from 'react'
import getWeb3 from './getWeb3'

const withWeb3 = PassedComponent => class extends Component {
    state = { web3: null };

    async componentDidMount () {
        try {
            const web3 = await getWeb3();
            this.setState({ web3 });
        } catch (error) {
            alert(`Failed to load web3.`);
            console.log(error);
        }
    }

    render () {
        const { web3 } = this.state;
        const Loading = <div>Loading Web3</div>;
        return web3 ? <Loading /> : <PassedComponent web3={web3} />
    }
}

export default withWeb3;