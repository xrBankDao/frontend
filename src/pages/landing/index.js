import styled, { keyframes } from 'styled-components';
import React, { useEffect } from "react";
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi';
import {BiSupport} from 'react-icons/bi'
import { useDispatch , useSelector } from 'react-redux';
import { 
  metamaskConnect
  } from 'redux/reducers/WalletActions'
function Landing() {

  const dispatch = useDispatch();

  const savedAccount = localStorage.getItem('address');

  useEffect(() => {
    if (savedAccount) {
      // savedAccount가 null이 아닐 경우에만 dispatch 실행
      dispatch(metamaskConnect({ account: savedAccount }));
    } else {
      console.log('No account found in localStorage');
      // 혹은 원하는 대로 기본 값을 설정하거나 처리할 수 있음
    }

  }, []);

  return (
    <>
      <div
        className="px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32 bg-gradient-to-r from-green-100 to-blue-200"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >      
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Maximize {' '}
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative">Your Crypto</span>
        </span>{' '} Potential
        <br /> 
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Borrow, Earn, Leverage and more with our stablecoin
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <a
          className="group inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
          variant="solid"
          color="slate"
          href="/mint"
        >
          Mint XSD
        </a>
      </div>
      <div className="mt-20 lg:mt-30">
        <p className="font-display text-base text-slate-900">Support</p>
        <ul role="list" className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
        <li>
            <ul role="list" className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
              <LogoNetwork target="_blank" class="logo-network" href="https://ethereum.org" title="https://ethereum.org" rel="noreferrer">
                <img src="https://seeklogo.com/images/X/xrp-xrp-logo-CBBF77A5CF-seeklogo.com.png" alt="Klaytn" style={{width:"60px", borderRadius:"50%"}}/>
                <span class="logo_label font-normal text-gray-500">XRPL-EVM</span>
            </LogoNetwork>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <FooterContainer>
      <p className="font-display text-base text-slate-900 pb-5 text-white">Community</p>
        <SocialIcons>
          <a href="https://x.com/xrbankDao" target="_blank" rel="noreferrer" title="Follow on Twitter">
            <FaXTwitter size={40} color="white" />
          </a>
          <a href="https://xrbankdao.gitbook.io/xrbankdao" target="_blank" rel="noreferrer" title="Read Documentation">
            <HiDocumentText size={40} color="white" />
          </a>
          <a href="https://tally.so/r/m6vQLO" target="_blank" rel="noreferrer" title="Read Documentation">
            <BiSupport size={40} color="white" />
          </a>
        </SocialIcons>
      </FooterContainer>
    </>
  );
}

// Styled Components for the footer
const FooterContainer = styled.div`
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  text-align: center;
  background-color: black;
  height: 140px;
  color: white;
`;

const FooterTitle = styled.h2`
  font-size: 1.5rem;
  color: #334155;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

// Skeleton animation (unchanged)
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

const LogoNetwork = styled.div`
    display: grid;
    gap: 16px;
    grid-template-rows: 60px 1fr;
    justify-items: center;
    max-width: 135px;
    width: 100%;
    color: inherit;
`;


export default Landing;