import Web3 from 'web3'
import { getMyConnectedWallet } from 'src/store/modules/wallet/actions'

const abi = [{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, { indexed: true, internalType: 'address', name: 'spender', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Approve', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, { indexed: true, internalType: 'address', name: 'to', type: 'address' }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { inputs: [{ internalType: 'address[]', name: '_to', type: 'address[]' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'airdrop', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'owner', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address[]', name: 'addrs', type: 'address[]' }], name: 'todrop', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: '_to', type: 'address' }, { internalType: 'uint256', name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }], stateMutability: 'nonpayable', type: 'function' }]
const address = '0x5874Aaa96C7fFe803170b2cFB1657e4Be13cA4a5'

async function airdrop (clientAddress) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const coinContract = new web3.eth.Contract(abi, address, {
    from: clientAddress
  })

  return coinContract.methods.airdrop([clientAddress], '350000000000').send({ from: clientAddress })
    .then(async res => {
    })
    .catch(e => {
      console.log(e)
    })
}

async function getBalance (clientAddress) {
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443')
  const connectedWallet = await getMyConnectedWallet()
  web3.eth.setProvider(connectedWallet.provider)
  const coinContract = new web3.eth.Contract(abi, address, {
    from: clientAddress
  })

  return await coinContract.methods.balanceOf(clientAddress).call()
}

export default {
  getBalance,
  airdrop
}
