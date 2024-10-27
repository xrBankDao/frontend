import 'App.css'; 
import styled, { keyframes } from 'styled-components';
import react, {useState, useEffect} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Web3 from 'web3';
import {walletConnectModalOpen} from 'redux/reducers/WalletActions'
import CollateralInput from "./component/ControlBoard"
import NoConnection from "./component/NoConnection"
import OpenPosition from "./component/OpenPosition"
import {ethers, JsonRpcProvider} from "ethers";

import {vatAbi, cdpManagerAbi, exitGemAbi} from "./abis"
import {depositMint, Mint, mintEsdTx, openCDP, frobExit, exitGemTx, fluxGemTx, unwrapGemTx,frobMint,moveXsdTx,exitXsdTx, allowCdp, hopeVat, joinXsd, approveXsd} from "./txExecutor/interactions.js"
import {toastTrx} from "./component/toast"
import { Address } from "./ContractsAddress"

function Detail() {

  const dispatch = useDispatch();
  const userAccount = useSelector(state => state.account) // 지갑주소
  const walletProvider = useSelector(state => state.walletProvider)

  const [chainMatch, setChainMatch] = useState(false);
  const [depositAmount, setDepositAmount] = useState(NaN)
  const [mintAmount, setMintAmount] = useState(NaN)
  const [noPoistion, setNoposition] = useState(false)

  const [MaxMintAmount, setMaxMintAmount] = useState(NaN)
  const [isNoposition, setIsNoposition] = useState(true)
  const [xrpBalance, setXrpBalance] = useState(0)
  const [isloading, setIsloading] = useState(false)
  const [userPosition, setUserPosition] = useState({
    ink: 0, 
    art: 0
  })

  const [detailAsset, setDetailAsset] = useState({
    "poolName": "",
    "category": "",
    "contractAddress": "",
    "investedToken": 0,
    "availableToken": 0,
    "tvlToken": 0,
    "tvlKRW": 0,
    "apr": 0
  })

  useEffect(() => { 

    if(userAccount !== "") {
      if(isloading===false){
        updateBalance()
        positionUpdate()
        updateUserStatus()
      }
    }

  }, [isloading])

  useEffect(() => { 

    checkChainNumber()

    if(userAccount !== "") {
      updateBalance()
      positionUpdate()
      updateUserStatus()
    }

  }, [userAccount])

  useEffect(() => { 

    if(userAccount !== ""){
      updateBalance()
      positionUpdate()
    }
  }, [])

  const updateBalance = async () => {
    if(userAccount !== ""){
      window.web3 = new Web3(window.ethereum)
      const weiBalance = await window.web3.eth.getBalance(userAccount)
      console.log("weiBalance", weiBalance)
      setXrpBalance(Number(weiBalance)/1000000000000000000)
    }
  }
  
  const updateUserStatus = async () => {
    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const ilk = ethers.encodeBytes32String('WXRP'); // 'WXRP'를 bytes32로 인코딩
    const vatAddress = Address.VatContractAddress
    const cdpAddress = Address.CDPManagerContractAddress    

    const provider = new JsonRpcProvider(providerUrl);
    const vatContract = new ethers.Contract(vatAddress, vatAbi, provider);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    const cdpId = await cdpContract.first(userAccount);
    const web3 = new Web3();

    if(cdpId !== 0) {
      const urnAddress = await cdpContract.urns(cdpId);
      const { ink, art } = await vatContract.urns(ilk, urnAddress);      
      const transInk = web3.utils.fromWei(ink.toString(), 'ether')
      const transArt = web3.utils.fromWei(art.toString(), 'ether')


      if(Number(ink) !== 0) {
        setIsNoposition(false)
        setUserPosition({transInk,transArt})
      }
    }

  }

  const positionUpdate = async () => {

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);
    console.log("cdpId", cdpId)
    if(cdpId === 0n){
      setNoposition(true)
    }

  }



  const checkChainNumber = async () => {

    try {

      window.web3 = new Web3(window.ethereum)
      const chainId = await window.web3.eth.getChainId()

      if(chainId === 1440002){
        setChainMatch(true)
      } else {
        setChainMatch(false)
      }
      
    } catch (error) {
      
    }
  }

  const Backbutton = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
      navigate(-1);
    };
    return (
      <button onClick={onClickBtn} class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-100 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Return
      </button>
    )
  }

  const openModal = () => {
      dispatch(walletConnectModalOpen())
  }

  const maxDepositHandler = () => {
    setDepositAmount(detailAsset.availableToken)
  }

  const changeDeposit = (e) => {
    setDepositAmount(e.target.value)
    setMaxMintAmount((e.target.value*0.5)*0.5)
  }

  const requestDeposit = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    const cdpId = await cdpContract.first(userAccount);

    const cdpCanCheck = await cdpContract.cdpCan(userAccount,Number(cdpId), Address.OneClickContractAddress);

    console.log("cdpCanCheck", cdpCanCheck)


    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        if(cdpCanCheck === 1n){

          const trxReturn = await depositMint(userAccount, depositAmount || 0, 0)
          toastTrx(trxReturn)
          await updateBalance()
          setIsloading(false)
  
        } else {

          const trxReturnAllow = await allowCdp(Number(cdpId), Address.OneClickContractAddress,1, userAccount)
          toastTrx(trxReturnAllow)
          const trxReturnDeposit = await depositMint(userAccount, depositAmount || 0, 0)
          toastTrx(trxReturnDeposit)
          await updateBalance()
          setIsloading(false)

        }
      } catch (error) {
         
      }
    }
  } 

  const repayStable = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);
    const urnAddress = await cdpContract.urns(cdpId);

    console.log("urnAddress", urnAddress)

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {
      try {
        setIsloading(true)
        const trxReturn = await approveXsd(userAccount, mintAmount || 0);
        toastTrx(trxReturn)
        const trxJoinXsd = await joinXsd(userAccount, urnAddress,  mintAmount || 0);
        toastTrx(trxJoinXsd)
        const frobTx = await frobMint(userAccount, cdpId, 0, -mintAmount || 0)
        toastTrx(frobTx)
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  const requestMint = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await frobMint(userAccount, cdpId, 0, mintAmount || 0)
        toastTrx(trxReturn)
        moveXSD()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  const moveXSD = async () => {
    // const requestMint = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await moveXsdTx(cdpId, userAccount, mintAmount || 0)
        toastTrx(trxReturn)
        exitXSD()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  
  const exitXSD = async () => {   

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.VatContractAddress    

    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);
    const canCheck = await cdpContract.can(userAccount, Address.XsdJoinContractAddress);
    console.log("canCheck", canCheck)

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        if(canCheck === 1n){
          const trxReturn = await exitXsdTx(userAccount, mintAmount || 0)
          toastTrx(trxReturn)
        } else {
          const trxHope = await hopeVat(userAccount);
          toastTrx(trxHope)
          const trxReturn = await exitXsdTx(userAccount, mintAmount || 0)
          toastTrx(trxReturn)
        }
        await updateBalance()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }


  const mintEsd = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await mintEsdTx(userAccount, depositAmount || 0, mintAmount || 0)
        toastTrx(trxReturn)
        await updateBalance()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  const openCDPFunction = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await openCDP(userAccount)
        toastTrx(trxReturn)
        await updateBalance()
        setIsloading(false)
      } catch (error) {
         
      }
    }

  }

  const FirstDeposit = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await depositMint(userAccount, depositAmount || 0, mintAmount || 0)
        toastTrx(trxReturn)
        await updateBalance()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  const requestWithdrawal = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await frobExit(userAccount, cdpId, depositAmount || 0, 0)
        toastTrx(trxReturn)
        fluxGem()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }

  const fluxGem = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const cdpAddress = Address.CDPManagerContractAddress    

    // RPC Provider 설정
    const provider = new JsonRpcProvider(providerUrl);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    // Step 1: Get the first CDP ID for the user
    const cdpId = await cdpContract.first(userAccount);

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const ilk = "0x5758525000000000000000000000000000000000000000000000000000000000"
        const trxReturn = await fluxGemTx(ilk, cdpId, userAccount, depositAmount)
        toastTrx(trxReturn)
        exitGem()
        setIsloading(false)
      } catch (error) {
         
      }
    }

  }


  const exitGem = async () => {
    
    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await exitGemTx(userAccount, depositAmount)
        toastTrx(trxReturn)
        unwrapGem()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  }


  const unwrapGem = async () => {

    window.web3 = new Web3(window.ethereum)
    const chainId = await window.web3.eth.getChainId()

    if(chainId !== 1440002){
      alert("Unsupported Chain!")
    } else {

      try {
        setIsloading(true)
        const trxReturn = await unwrapGemTx(userAccount, depositAmount)
        toastTrx(trxReturn)
        await updateBalance()
        setIsloading(false)
      } catch (error) {
         
      }
    }
  
  
  }

  return (
    <>
    <div>
        <div class="p-4">
          <OverBox>
          <SubTemplateBlockVertical>
          <ManageTitle>
            <Title> Mint XSD</Title>
            <Backbutton class="inline-flex items-center px-4 py-2 text-sm font-medium border border-blue-200 text-center text-blue-500 bg-white rounded-lg hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
          </ManageTitle> 
                
            <div>
            <div style={{marginTop:"20px"}}></div>
              <div class="sm:px-0">        
              <div className="border border-blue-100 rounded-lg p-6 bg-white">
              <div className="flex flex-col gap-2 w-full">
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                    <p className="font-semibold text-left">Interest</p>
                    <p className="text-neutral-600 text-right">4.0%</p>
                  </div>
                  <div className="grid grid-cols-[1fr_1fr] gap-3">
                    <p className="font-semibold text-left">Loan-To-Value</p>
                    <p className="text-neutral-600 text-right">66.7%</p>
                  </div>
                </div>
              </div>      

              <div style={{marginTop:"20px"}}></div>

              {userAccount === "" ?
                <NoConnection openModal={openModal} />
                :
                noPoistion ?
                  <><OpenPosition openCDP={openCDPFunction} /></>
                  :                  
                  <CollateralInput
                    depositAmount={depositAmount}
                    xrpBalance={xrpBalance}
                    changeDeposit={changeDeposit}
                    mintAmount={mintAmount}
                    setMintAmount={setMintAmount}
                    maxDepositHandler={maxDepositHandler}
                    requestDeposit={requestDeposit}
                    requestMint={requestMint}
                    userPosition={userPosition}
                    mintEsd={mintEsd}
                    FirstDeposit={FirstDeposit}
                    requestWithdrawal={requestWithdrawal}
                    repayStable={repayStable}
                  />
              }           
          </div>

          <div style={{marginTop:"30px"}}></div>
          <div class="mt-6"></div>
          </div>
          {!chainMatch ? 
          <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-100 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Unsupported chain. Please switch to xrp evm-devnet in your wallet and restart the page.</span> 
                </div>
                </div>
                :
                <></>
              }
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>

      
      
    
    </>
  );
}


const ManageTitle = styled.div`
  width: 460px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`
/* style={{width:"460px", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}> */


const ChartCover = styled.div`
  height: 40px;
  border: 2px solid white;
  border-radius: 10px;
  overflow: hidden;
  /* New code below: */
  display: grid;
  grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr;
  /* grid-template-columns: ${props=> props.a}fr ${props=> props.b}fr ${props=> props.c}fr; */
`

const AppleChart = styled.div`
  background: #111539;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 25px;
`


const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  width: 1136px;
  @media screen and (max-width: 950px){
    width: 100%;
    padding-top: 20px;
    color: black;
  }
  @media screen and (max-width: 500px){
    width: 100%;
    padding-top: 20px;
    /* color: gray; */
  }
`

const OverBox = styled.div`

  position: relative;
  margin: 0px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow: auto;
  padding: 30px;

  @media screen and (max-width: 950px){
    width: calc(100%);
    width: -moz-calc(100%);
    width: -webkit-calc(100%);
    padding: 10px;
  }
`

const SubTemplateBlockVertical = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 0px auto;
    width: 460px;
    /* padding-bottom: 10px; */
    position: relative; 
    /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    /* padding:15px; */
    /* display:flex; */
    /* flex-direction:column; */

    /* padding: 20px 25px !important;
    background: #fff; */

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    /* background-color: rgb(255, 255, 255); */
    background-clip: border-box;
    /* border: 1px solid rgba(0, 0, 0, 0.125); */
    /* border-radius: 0.75rem; */
    /* box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem; */
    /* overflow: visible; */
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;


const SubTemplateBlockSub = styled.div`
     /* width: 900px; */
     /* max-width: 500px; */
    margin: 10px auto;
    width: 1136px;
    padding-bottom: 10px;
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    padding:15px;
    display:flex;
    flex-direction:column;

    padding: 20px 25px !important;

    color: rgba(0, 0, 0, 0.87);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-width: 0px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    border: 0.1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.75rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
    overflow: visible;
    
  @media screen and (max-width: 500px){
      width: 100%;
      /* margin: 10px 10px; */
      font-size: 12px;
    }
`;


const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;


export const ProductSkeleton = styled.div`
  display: inline-block;
  height: ${props => props.height || "20px"};
  width: ${props => props.width || "50%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-top: ${props => props.marginTop || "0"}
`;




export default Detail;

