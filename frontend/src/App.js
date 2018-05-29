import React from 'react'
import withWeb3 from './withWeb3'
import Ethervote from './Ethervote'

const App = ({ web3 }) =>
    <Ethervote/>

export default withWeb3(App);