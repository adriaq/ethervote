import React from 'react'
import withWeb3 from './withWeb3'

const MyComponent = ({ web3 }) =>
  <div>
    <h1>My Dapp</h1>
    <pre>{JSON.stringify(web3, null, 4)}</pre>
  </div>

export default withWeb3(MyComponent)
