import React from 'react';

const CollateralInput = ({
  depositAmount,
  xrpBalance,
  changeDeposit,
  mintAmount,
  setMintAmount,
  maxDepositHandler,
  requestDeposit,
  requestMint,
  userPosition,
  requestWithdrawal,
  repayStable
}) => {
  return (
    <div className="border border-blue-100 rounded-lg p-6 bg-white">
    <>
    {/* {true ? 
        <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
            <li class="w-full">
                <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
                  Deposit
                </a>
            </li>
            <li class="w-full">
                <a href="#" class="inline-block w-full p-2 bg-white rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
                  Mint
                </a>
            </li>
        </ul>
        :
        <ul class="text-sm font-medium text-center text-gray-400 divide-x divide-blue-200 border border-blue-300 rounded-lg flex dark:divide-blue-700 dark:text-blue-400">
        <li class="w-full">
            <a href="#" class="inline-block w-full p-2 text-gray bg-white rounded-l-lg focus:ring-1 focus:ring-blue-300 active focus:outline-none dark:bg-blue-700 dark:text-white">
              Deposit
            </a>
        </li>
        <li class="w-full">
            <a href="#" class="inline-block w-full p-2 text-blue-600 bg-blue-100 rounded-r-lg hover:text-blue-700 hover:bg-blue-50 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-blue-800 dark:hover:bg-blue-700">
              Mint
            </a>
        </li>
        </ul>
        } */}

        <div className="relative">
          <div className="font-semibold pb-3">Collateral</div>
          <div className="pb-3">Deposited : {userPosition.transInk} XRP</div>
          <input
            type="number"
            value={depositAmount}
            onChange={e => changeDeposit(e)}
            className="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={xrpBalance}
            required
          />
          <button
            onClick={maxDepositHandler}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Max
          </button>
        </div>

        {userPosition.ink === 0 ?
          <>
            <button
                onClick={requestDeposit}
                style={{ width: '100%', height: '50px' }}
                type="submit"
                className="mt-5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
                    Deposit XRP
                </span>
            </button>
          </>
          :
          <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={requestDeposit}
            style={{ flex: 1, height: '50px' }}
            type="submit"
            className="mt-5 text-sm font-medium text-blue-500 bg-white rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Deposit XRP</span>
          </button>
          <button
            onClick={requestWithdrawal}
            style={{ flex: 1, height: '50px' }}
            type="submit"
            className="mt-5 text-sm font-medium text-blue-500 bg-white rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Withdraw XRP</span>
          </button>
        </div>
        }

        <div className="pt-5">
            <hr/>
        </div>
        
        <div className="relative">
          <div className="mt-3 font-semibold pb-3">Mint</div>
          <div className="pb-3">Minted : {userPosition.transArt} XSD</div>
          <input
            type="number"
            value={mintAmount}
            onChange={e => setMintAmount(e.target.value)}
            className="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'0'}
            required
          />
          {/* <button
            onClick={maxDepositHandler}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Max
          </button> */}

          
        </div>

        

        {userPosition.art === 0 ? 
          userPosition.ink === 0 ? 
          <button
          style={{ width: '100%', height: '50px' }}
          type="submit"
          className="mt-5 text-sm font-medium text-white bg-gray-300 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
                Add Collateral
            </span>
          </button>
          :
          <button
              onClick={requestMint}
              style={{ width: '100%', height: '50px' }}
              type="submit"
              className="mt-5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
                  Mint XSD
              </span>
          </button>
          :
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
                onClick={requestMint}
                style={{ width: '100%', height: '50px' }}
                type="submit"
                className="mt-5 text-sm font-medium text-blue-500 bg-white rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
                    Mint XSD
                </span>
            </button>
            <button
                onClick={repayStable}
                style={{ width: '100%', height: '50px' }}
                type="submit"
                className="mt-5 text-sm font-medium text-blue-500 bg-white rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                <span style={{ width: '30px', fontWeight: '700', fontSize: '15px' }}>
                    Repay XSD
                </span>
            </button>
          </div>

        }
      </>
    </div>
  );
};

export default CollateralInput;