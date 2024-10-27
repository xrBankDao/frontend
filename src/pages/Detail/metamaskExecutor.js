import Web3 from 'web3';
import Swal from 'sweetalert2'
import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  

const metamaskMintExecutor = async (accountAddress, amount) => {

  // console.log("here")
  const web3 = new Web3(window.ethereum);

  const userAddress = accountAddress
  const wxrpAddress = "0x8049c9E3cE496b47E0fE8aa8EdAEf751cF87e07d";
  const depositAmount = amount

  let transactionInfo = {}

  transactionInfo = await Mint()

  const web3Return = await web3.eth
  .sendTransaction(transactionInfo)
  .once('transactionHash', (transactionHash) => {
    console.log('txHash', transactionHash);
    Toast.fire({
      icon: 'success',
      title: 'tx send',
    })
  })
  .once('receipt', (receipt) => {
      console.log('receipt', receipt);
  })
  .once('error', (error) => {
      console.log('error', error);
      alert("tx fail.");
  }).then((txHash) => {return txHash})
  .catch((error) => console.error(error));

  return web3Return
}

const metamaskDepositExecutor = async (accountAddress, amount) => {

    const web3 = new Web3(window.ethereum);
    let transactionInfo = {}

    transactionInfo = await depositMint(accountAddress,amount)

    const web3Return = await web3.eth
    .sendTransaction(transactionInfo)
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash);
      Toast.fire({
        icon: 'success',
        title: 'tx send',
      })
    })
    .once('receipt', (receipt) => {
        console.log('receipt', receipt);
    })
    .once('error', (error) => {
        console.log('error', error);
        alert("tx fail.");
    }).then((txHash) => {return txHash})
    .catch((error) => console.error(error));

    return web3Return
}


async function Mint() {

  const web3 = new Web3(window.ethereum);
  const addr = "0x358De5535f6B85F18afc2908aEB4f7EEf6376aE0"
  const depositAndMint = "0x3A07a5732e8d933B1648e0daE1BBf8bE694Dad8f";

  const deposit_mint_abi = {
    "inputs": [
        {
            "internalType": "address",
            "name": "usr",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }
    ],
    "name": "exit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}

  const ethAmount = 1

  const transAmount = web3.utils.toWei(ethAmount.toString(), 'ether'); // 이더 단위로 변환

  const data = web3.eth.abi.encodeFunctionCall(deposit_mint_abi, [addr,transAmount]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  return {
      from: addr,
      to: depositAndMint,
      data
  };
  
}


async function depositMint(userAccount, amount) {

  const web3 = new Web3(window.ethereum);
  const addr = userAccount
  const depositAndMint = "0x78eb9cF53BeEab4E628E21ab2C06D59d848Ba383";

  const deposit_mint_abi = {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ethAmount",
                "type": "uint256"
            },
            {
                "internalType": "int256",
                "name": "dink",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "dart",
                "type": "int256"
            }
        ],
        "name": "openAndMintDAI",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }

  const ethAmount = amount

  const transAmount = web3.utils.toWei(ethAmount.toString(), 'ether'); // 이더 단위로 변환
  const dink = new BigNumber("1000000000000000000");
  const dart = new BigNumber("1000000000000000000");

  const data = web3.eth.abi.encodeFunctionCall(deposit_mint_abi, [transAmount,dink,dart]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  console.log("aa", {
    from: addr,
    to: depositAndMint,
    data,
    value: transAmount
}
  )

  return {
      from: addr,
      to: depositAndMint,
      data,
      value: transAmount
  };
  
}

async function wrapXrp(addr, wxrpAddress, amount) {

    const web3 = new Web3(window.ethereum);
    const transAmount = web3.utils.toWei(amount.toString(), 'ether'); // 이더 단위로 변환

    const WXRP_ABI = {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    };

    const data = web3.eth.abi.encodeFunctionCall(WXRP_ABI, []); // 함수 ABI와 빈 배열(입력값이 없으므로)

    return {
        from: addr,
        to: wxrpAddress,
        data,
        value: transAmount,
        gas: 1000000
    };
   
}

export {
    metamaskDepositExecutor,
    metamaskMintExecutor
}