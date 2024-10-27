import Web3 from 'web3';
import Swal from 'sweetalert2'
import { deposit_mint_abi, mint_abi, open_abi, frob_abi, gemExit_abi, cdpManager_abi, unwrap_abi,move_abi,XsdExit_abi, XsdJoin_abi, cdpAllow_abi, hope_abi, approve_abi } from './abi/abis';
import {Address} from "../ContractsAddress"
import { sendTrax} from "./common/trxHelper"
import {ethers, JsonRpcProvider} from "ethers";

export async function mintEsdTx(){

}

export async function approveXsd(accountAddress, wad) {
    
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const xsdAddress = Address.XSDContractAddress;
  const wadWei = ethers.parseUnits(wad.toString(), 18);

  const data = web3.eth.abi.encodeFunctionCall(approve_abi, [Address.XsdJoinContractAddress, wadWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: xsdAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}



export async function joinXsd(accountAddress, urnAddress, wad) {
    
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const xsdjoinAddress = Address.XsdJoinContractAddress;
  console.log("xsdJoin", xsdjoinAddress)
  const wadWei = ethers.parseUnits(wad.toString(), 18);

  const data = web3.eth.abi.encodeFunctionCall(XsdJoin_abi, [urnAddress, wadWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: xsdjoinAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function hopeVat(accountAddress){

  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const vatManagerAddress = Address.VatContractAddress;
  const xsdJoinAddress = Address.XsdJoinContractAddress

  const data = web3.eth.abi.encodeFunctionCall(hope_abi, [xsdJoinAddress]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: vatManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function allowCdp(cdpId, grantsAccount, grants, accountAddress){

  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const cdpIdInt = Number(cdpId)
  const cdpManagerAddress = Address.CDPManagerContractAddress;

  const data = web3.eth.abi.encodeFunctionCall(cdpAllow_abi, [cdpIdInt, grantsAccount, grants]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function unwrapGemTx(accountAddress, wad){

  const web3 = new Web3(window.ethereum);
  const addr = accountAddress

  const wxrpAddress = Address.wxrpAddress;
  const wadWei = ethers.parseUnits(wad.toString(), 18);

  const data = web3.eth.abi.encodeFunctionCall(unwrap_abi, [wadWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: wxrpAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function fluxGemTx(ilk, cdpId, accountAddress, wad){

  const web3 = new Web3(window.ethereum);
  const addr = accountAddress

  const cdpManagerAddress = Address.CDPManagerContractAddress;
  const wadWei = ethers.parseUnits(wad.toString(), 18);


  const data = web3.eth.abi.encodeFunctionCall(cdpManager_abi, [ilk, cdpId, accountAddress, wadWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function exitGemTx(accountAddress, wad) {
    
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const gemjoinAddress = Address.GemJoinContractAddress;
  const wadWei = ethers.parseUnits(wad.toString(), 18);

  const data = web3.eth.abi.encodeFunctionCall(gemExit_abi, [accountAddress, wadWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: gemjoinAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function frobExit(accountAddress, cdpId, dink, dart){
  
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const cdpIdInt = Number(cdpId)

  const cdpManagerAddress = Address.CDPManagerContractAddress;
  const dinkWei = ethers.parseUnits(dink.toString(), 18);

  console.log("dar", dinkWei)

  const data = web3.eth.abi.encodeFunctionCall(frob_abi, [cdpIdInt, -dinkWei, dart]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function checkCDPPermission(accountAddress) {

  // const web3 = new Web3(window.ethereum);
  // const addr = accountAddress

  // const cdpManagerAddress = Address.CDPManagerContractAddress;

  // // cdpCan ABI (해당 매핑을 조회하는 함수 정의)
  // const cdpCanAbi = {
  //   "constant": true,
  //   "inputs": [
  //     {
  //       "name": "owner",
  //       "type": "address"
  //     },
  //     {
  //       "name": "cdpId",
  //       "type": "uint256"
  //     },
  //     {
  //       "name": "usr",
  //       "type": "address"
  //     }
  //   ],
  //   "name": "cdpCan",
  //   "outputs": [
  //     {
  //       "name": "",
  //       "type": "uint256"
  //     }
  //   ],
  //   "payable": false,
  //   "stateMutability": "view",
  //   "type": "function"
  // };

  // // 함수 호출을 위한 data 생성
  // const data = web3.eth.abi.encodeFunctionCall(cdpCanAbi, [addr, cdpId, usr]);

  // let transactionInfo = {
  //   from: owner, // 트랜잭션을 누가 보낼지 지정
  //   to: cdpManagerAddress, // CDPManagerContractAddress
  //   data
  // };

  // // 트랜잭션을 호출하고 결과를 기다림
  // const result = await web3.eth.call(transactionInfo);

  // // 결과는 uint256이므로, 이를 숫자로 변환 (권한이 있으면 1, 없으면 0)
  // const permission = web3.utils.toBN(result).toNumber();

  // return permission === 1; // 1이면 권한이 있음, 0이면 없음

}

export async function openCDP(accountAddress) { // 처음 담보물 예치하고, 민트할 때 사용하는 함수

  const web3 = new Web3(window.ethereum);
  const addr = accountAddress

  const ilk = ethers.encodeBytes32String('WXRP'); // 'WXRP'를 bytes32로 인코딩
  const cdpManagerAddress = Address.CDPManagerContractAddress;

  const data = web3.eth.abi.encodeFunctionCall(open_abi, [ilk, addr]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}


export async function firstDepositTx(accountAddress, depositAmount) {
   
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const depositAndMint = Address.OneClickContractAddress;

  const kk = 1

  const depositWei = ethers.parseUnits(kk.toString(), 18);
  let dart = 0;
  

  const transDart = 0
  const data = web3.eth.abi.encodeFunctionCall(deposit_mint_abi, [depositWei,depositWei,0]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: depositAndMint,
    data,
    value: depositAmount
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}



export async function depositMint(accountAddress, depositAmount, mintAmount) { // 처음 담보물 예치하고, 민트할 때 사용하는 함수
  
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const depositAndMint = Address.OneClickContractAddress;

  const amount = depositAmount;
  let dart = mintAmount;

  // const transAmount = web3.utils.toWei(depositAmount.toString(), 'ether'); // 이더 단위로 변환
  // const transDink = web3.utils.toWei(dink.toString(), 'ether'); // 이더 단위로 변환
  // const transDart = web3.utils.toWei(dart.toString(), 'ether'); // 이더 단위로 변환
  const transAmount = web3.utils.toWei(amount.toString(), 'ether');
  const transDink = web3.utils.toWei(amount.toString(), 'ether');
  const transDart = web3.utils.toWei(amount.toString(), 'ether');
 
  const data = web3.eth.abi.encodeFunctionCall(deposit_mint_abi, [transAmount,transDink,"0"]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: depositAndMint,
    data,
    value: transAmount
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function frobMint(accountAddress, cdpId, dink, dart){
  
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const cdpIdInt = Number(cdpId)

  const cdpManagerAddress = Address.CDPManagerContractAddress;
  const dartWei = ethers.parseUnits(dart.toString(), 18);


  const data = web3.eth.abi.encodeFunctionCall(frob_abi, [cdpIdInt, dink, dartWei]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

// 입력된 값(value)을 받아서 10^45을 곱함
function calculateRad(value) {
  const multiplier = ethers.toBigInt("1" + "0".repeat(45));  // 10^45
  const result = ethers.toBigInt(value) * multiplier;
  return result;
}


export async function moveXsdTx(cdpId, accountAddress, mintRad){
  
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress
  const cdpIdInt = Number(cdpId)

  const cdpManagerAddress = Address.CDPManagerContractAddress;
  const mintRada = calculateRad(mintRad)
  const radMint = ethers.toBigInt(mintRada.toString());

  const data = web3.eth.abi.encodeFunctionCall(move_abi, [cdpIdInt, accountAddress, radMint]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}

export async function exitXsdTx(accountAddress, mintRad){
  
  const web3 = new Web3(window.ethereum);
  const addr = accountAddress

  const cdpManagerAddress = Address.XsdJoinContractAddress;
  const radMint = ethers.parseUnits(mintRad.toString(), 18);

  const data = web3.eth.abi.encodeFunctionCall(XsdExit_abi, [accountAddress, radMint]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: cdpManagerAddress,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return

}







export async function Mint(userAccount, Amount) {

  const web3 = new Web3(window.ethereum);
  const addr = userAccount
  const depositAndMint = "0x3A07a5732e8d933B1648e0daE1BBf8bE694Dad8f";

  const ethAmount = Amount
  const transAmount = web3.utils.toWei(ethAmount.toString(), 'ether'); // 이더 단위로 변환
  const data = web3.eth.abi.encodeFunctionCall(mint_abi, [addr,transAmount]); // 함수 ABI와 빈 배열(입력값이 없으므로)

  let transactionInfo = {
    from: addr,
    to: depositAndMint,
    data
  };

  const web3Return = await sendTrax(transactionInfo)

  return web3Return
  
}
