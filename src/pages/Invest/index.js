import 'App.css'; 
import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import React from "react";
import react, {useState, useEffect} from "react";
import {ethers, JsonRpcProvider} from "ethers";
import { useDispatch , useSelector } from 'react-redux';
import { jugAbi, spotAbi, vatAbi, cdpManagerAbi, oracleAbi } from './abis';
import { Address } from "./ContractsAddress"
import { formatUnits } from './util/index';
import Web3 from 'web3';
import { 
  metamaskConnect
  } from 'redux/reducers/WalletActions'

function Invest() {

  const userAccount = useSelector(state => state.account) // 지갑주소
  const [userPosition, setUserPosition] = useState({ink: 0, art: 0, rate: 0, wethCollateral: 0, daiDebt: 0})
  const [protocolSetup, setProtocolSetup] = useState({interest: 0, liquidationLimit: 0, xrpPrice: 0, deposited: 0, issued: 0})
  const [systemStatus, setSystemStatus] = useState({Interest:0, LTV: 0, xrpPrice: 0, deposit: 0, Issued: 0})

  const dispatch = useDispatch();
  const savedAccount = localStorage.getItem('address');

  useEffect(() => {

    protocolStatus()

    if (savedAccount) {
      // savedAccount가 null이 아닐 경우에만 dispatch 실행
      dispatch(metamaskConnect({ account: savedAccount }));
    } else {
      console.log('No account found in localStorage');
      // 혹은 원하는 대로 기본 값을 설정하거나 처리할 수 있음
    }

  }, []);


  useEffect(() => {
    if(userAccount !== ""){
      getBalances()
    }
  }, [userAccount])


  async function protocolStatus() {
    
    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const vat = Address.VatContractAddress;
    const ilk = ethers.encodeBytes32String('WXRP'); // 'WXRP'를 bytes32로 인코딩
    
    const provider = new JsonRpcProvider(providerUrl);
    const vatContract = new ethers.Contract(vat, vatAbi, provider);
    const ilkData = await vatContract.ilks(ilk);
    const totalDebt = await vatContract.debt();

    console.log("Ilk Data:", {
      Art: ilkData[0].toString(),
      rate: ilkData[1].toString(),
      spot: ilkData[2].toString(),
      line: ilkData[3].toString(),
      dust: ilkData[4].toString()
    });

    console.log("Total Debt (RAD):", totalDebt.toString());
    const cdpAddress = Address.CDPManagerContractAddress;    
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);
    const urnAddress = await cdpContract.urns(1);
    const { ink, art } = await vatContract.urns(ilk, urnAddress);

    const oracleContract = new ethers.Contract(Address.oracle, oracleAbi, provider);
    const xrpPrice = await oracleContract.getReferenceDataBulk(["XRP"], ["USD"]);
    console.log("XRP Price:", xrpPrice[0].toString());


    setSystemStatus({
      interest: 4,
      LTV: 66.7,
      xrpPrice: parseFloat(ethers.formatUnits(xrpPrice[0], 18)).toFixed(5),
      deposit: ethers.formatUnits(ink, 18),
      Issued: ethers.formatUnits(ilkData[0], 18)
    })
    
  }

  async function getBalances() {

    const providerUrl = "https://rpc-evm-sidechain.xrpl.org";
    const vatAddress = Address.VatContractAddress
    const cdpAddress = Address.CDPManagerContractAddress    
    const ilk = ethers.encodeBytes32String('WXRP'); // 'WXRP'를 bytes32로 인코딩

    const provider = new JsonRpcProvider(providerUrl);
    const web3 = new Web3();

    const vatContract = new ethers.Contract(vatAddress, vatAbi, provider);
    const cdpContract = new ethers.Contract(cdpAddress, cdpManagerAbi, provider);

    const cdpId = await cdpContract.first(userAccount);
    const urnAddress = await cdpContract.urns(cdpId);
    const { ink, art } = await vatContract.urns(ilk, urnAddress);
    const ilksResponse = await vatContract.ilks(ilk);
    const debtRes = await vatContract.debt();
    const viceRes = await vatContract.vice();

    // formatUnits
    console.log("Ilk Data:", {
      Art: web3.utils.fromWei(ilksResponse[0].toString(), 'ether'),
      rate: formatUnits(ilksResponse[1].toString(), 'ray'),
      spot: formatUnits(ilksResponse[2].toString(), 'ray'),
      line: formatUnits(ilksResponse[3].toString(), 'rad'),
      dust: formatUnits(ilksResponse[4].toString(), 'rad'),
    });

    console.log("ilksResponse[2].toString()", ilksResponse[2].toString())
    console.log("ink", web3.utils.fromWei(ink.toString(), 'ether'));
    console.log("CDP ID:", cdpId.toString());
    console.log("Urn Address:", urnAddress);
    console.log("debtRes",debtRes)
    console.log("viceRes",viceRes)

    setUserPosition({
      ink:ethers.formatUnits(ink, 18),
      art:ethers.formatUnits(art, 18),
    })
}


  return (
    <>
      <div>
        <div>   
          <OverBox>
              <SubTemplateBlockVertical>                
                <Wrappertitle>
                    <Title>Mint XSD</Title>                
                </Wrappertitle>
                <div style={{paddingTop:"20px"}}/>
                  <div className="border border-blue-100 rounded-lg p-6 bg-white">
                  <div className="flex flex-col">
                  <div className="flex items-center">
                      <div className="flex">
                        <div className="relative">
                          <div className="relative mr-1.5 rounded-full bg-white">
                              <img class="w-10 h-10 rounded-full" src={"https://s2.coinmarketcap.com/static/img/coins/200x200/52.png"} alt=""/>
                          
                          </div>
                        </div>
                      </div>
                      <p className="mx-4 text-xl font-bold text-neutral-800">Collateral : XRP</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full pt-5">
                    <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="font-semibold text-left">Interest</p>
                        <p className="text-neutral-600 text-right">{systemStatus.interest}%</p>
                      </div>
                      <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="font-semibold text-left">Loan-To-Value</p>
                        <p className="text-neutral-600 text-right">66.7%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-2 w-full pt-5">
                    <hr />
                    <p>User Status</p>
                    <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="font-semibold text-left">Collateral</p>
                        <p className="text-neutral-600 text-right">{userPosition.ink} XRP</p>
                      </div>
                      <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="font-semibold text-left">Debt</p>
                        <p className="text-neutral-600 text-right">{userPosition.art} XSD</p>
                      </div>
                    </div>
                  </div>


                  <Link to="/detail">
                    <button style={{width:"100%", height:"50px"}} type="submit" class="mt-6 py-2.5 px-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <span style={{width:"30px", fontWeight:"700", fontSize:"15px"}}>
                        Manage
                      </span>
                    </button>

                  </Link>
                </div>
            </SubTemplateBlockVertical>
          </OverBox>
        </div>
      </div>

      <div>
          <OverBox>
              <SubTemplateBlockVertical>                
                  <div className="border border-blue-100 rounded-lg p-6 bg-white">
                  <p className="font-semibold">Protocol Status</p>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-2 w-full pt-5">
                      <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="text-left">XRP Oracle Price</p>
                        <p className="text-neutral-600 text-right">${systemStatus.xrpPrice}</p>
                      </div>
                      <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="text-left">Deposited</p>
                        <p className="text-neutral-600 text-right">{systemStatus.deposit} XRP</p>
                      </div>
                      <div className="grid grid-cols-[1fr_1fr] gap-3">
                        <p className="text-left">Issued</p>
                        <p className="text-neutral-600 text-right">{systemStatus.Issued} XSD</p>
                      </div>
                    </div>
                  </div>
                </div>
                  <div style={{marginTop:"30px"}}></div>
            </SubTemplateBlockVertical>
          </OverBox>
        </div>

    <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="crypto-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                    Connect wallet
                </h3>
            </div>
            <div class="p-6">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>

            </div>
      </div>
    </div>
  </div>
    </>
  );
}

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


const Title = styled.h1`
  font-weight: 600;
  font-size: 25px;
`

const Wrappertitle = styled.div`
  margin: 0px auto 10px auto;
  /* text-align: center; */
  
  /* width: 1136px; */
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
  margin: 10px auto; 
  width: calc(100% - (230px));
  width: -moz-calc(100% - (230px));
  width: -webkit-calc(100% - (230px));
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow: auto;

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
    margin: 30px auto;
    width: 350px;
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

export default Invest;

