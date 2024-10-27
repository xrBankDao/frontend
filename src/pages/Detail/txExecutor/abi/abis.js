export const approve_abi = {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }


export const hope_abi = {
    "constant": false,
    "inputs": [
      {
        "name": "usr",
        "type": "address"
      }
    ],
    "name": "hope",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }

export const XsdJoin_abi = {
    "constant": false,
    "inputs": [
      {
        "name": "usr",
        "type": "address"
      },
      {
        "name": "wad",
        "type": "uint256"
      }
    ],
    "name": "join",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }

export const XsdExit_abi = {
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

export const move_abi = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "cdp",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "dst",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "rad",
            "type": "uint256"
        }
    ],
    "name": "move",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}

export const unwrap_abi = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "wad",
            "type": "uint256"
        }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}

export const cdpAllow_abi = {
    "constant": false,
    "inputs": [
      {
        "name": "cdp",
        "type": "uint256"
      },
      {
        "name": "usr",
        "type": "address"
      },
      {
        "name": "ok",
        "type": "uint256"
      }
    ],
    "name": "cdpAllow",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }

export const cdpManager_abi = {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "ilk",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "cdp",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "dst",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "wad",
                "type": "uint256"
            }
        ],
        "name": "flux",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

export const gemExit_abi = {
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

export const frob_abi = {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "cdp",
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
    "name": "frob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}


export const deposit_mint_abi = {
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

export const open_abi = {
    "constant": false,
    "inputs": [
      {
        "name": "ilk",
        "type": "bytes32"
      },
      {
        "name": "usr",
        "type": "address"
      }
    ],
    "name": "open",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }

export const mint_abi = {
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
