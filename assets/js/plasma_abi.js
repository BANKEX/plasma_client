

window.plasma_abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_plasmaBlockNumber",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock",
        "type": "uint32"
      },
      {
        "name": "_plasmaTransaction",
        "type": "bytes"
      },
      {
        "name": "_merkleProof",
        "type": "bytes"
      }
    ],
    "name": "proveFundingWithoutDeposit",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "operators",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "depositRecords",
    "outputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "status",
        "type": "uint8"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "withdrawStartedTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lastBlockNumber",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "depositRecordsForUser",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "doubleFundingRecords",
    "outputs": [
      {
        "name": "prooved",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_plasmaBlockNumber1",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock1",
        "type": "uint32"
      },
      {
        "name": "_inputNumber1",
        "type": "uint8"
      },
      {
        "name": "_plasmaTransaction1",
        "type": "bytes"
      },
      {
        "name": "_merkleProof1",
        "type": "bytes"
      },
      {
        "name": "_plasmaBlockNumber2",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock2",
        "type": "uint32"
      },
      {
        "name": "_inputNumber2",
        "type": "uint8"
      },
      {
        "name": "_plasmaTransaction2",
        "type": "bytes"
      },
      {
        "name": "_merkleProof2",
        "type": "bytes"
      }
    ],
    "name": "checkActualDoubleSpendProof",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lastEthBlockNumber",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_blockNumber",
        "type": "uint32"
      },
      {
        "name": "_txNumberInBlock",
        "type": "uint32"
      },
      {
        "name": "_outputNumberInTX",
        "type": "uint8"
      }
    ],
    "name": "makeTransactionIndex",
    "outputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "root",
        "type": "bytes32"
      },
      {
        "name": "data",
        "type": "bytes"
      },
      {
        "name": "proof",
        "type": "bytes"
      },
      {
        "name": "convertToMessageHash",
        "type": "bool"
      }
    ],
    "name": "checkProof",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_plasmaBlockNumber1",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock1",
        "type": "uint32"
      },
      {
        "name": "_inputNumber1",
        "type": "uint8"
      },
      {
        "name": "_plasmaTransaction1",
        "type": "bytes"
      },
      {
        "name": "_merkleProof1",
        "type": "bytes"
      },
      {
        "name": "_plasmaBlockNumber2",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock2",
        "type": "uint32"
      },
      {
        "name": "_inputNumber2",
        "type": "uint8"
      },
      {
        "name": "_plasmaTransaction2",
        "type": "bytes"
      },
      {
        "name": "_merkleProof2",
        "type": "bytes"
      }
    ],
    "name": "proveDoubleSpend",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "withdrawRecordsForUser",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_op",
        "type": "address"
      },
      {
        "name": "_status",
        "type": "bool"
      }
    ],
    "name": "setOperator",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "headers",
    "outputs": [
      {
        "name": "blockNumber",
        "type": "uint32"
      },
      {
        "name": "numTransactions",
        "type": "uint32"
      },
      {
        "name": "v",
        "type": "uint8"
      },
      {
        "name": "previousBlockHash",
        "type": "bytes32"
      },
      {
        "name": "merkleRootHash",
        "type": "bytes32"
      },
      {
        "name": "r",
        "type": "bytes32"
      },
      {
        "name": "s",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blockHeaderLength",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fundingWithoutDepositRecords",
    "outputs": [
      {
        "name": "prooved",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_plasmaBlockNumber1",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock1",
        "type": "uint32"
      },
      {
        "name": "_plasmaTransaction1",
        "type": "bytes"
      },
      {
        "name": "_merkleProof1",
        "type": "bytes"
      },
      {
        "name": "_plasmaBlockNumber2",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock2",
        "type": "uint32"
      },
      {
        "name": "_plasmaTransaction2",
        "type": "bytes"
      },
      {
        "name": "_merkleProof2",
        "type": "bytes"
      }
    ],
    "name": "proveDoubleFunding",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "signer1",
        "type": "address"
      },
      {
        "name": "depositIndex1",
        "type": "uint256"
      },
      {
        "name": "transactionIndex1",
        "type": "uint256"
      },
      {
        "name": "signer2",
        "type": "address"
      },
      {
        "name": "depositIndex2",
        "type": "uint256"
      },
      {
        "name": "transactionIndex2",
        "type": "uint256"
      }
    ],
    "name": "checkDoubleFundingFromInternal",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "header",
        "type": "bytes"
      }
    ],
    "name": "submitBlockHeader",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "depositCounterInBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_plasmaBlockNumber",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock",
        "type": "uint32"
      },
      {
        "name": "_inputNumber",
        "type": "uint8"
      },
      {
        "name": "_plasmaTransaction",
        "type": "bytes"
      },
      {
        "name": "_merkleProof",
        "type": "bytes"
      },
      {
        "name": "_withdrawIndex",
        "type": "uint256"
      }
    ],
    "name": "proveSpendAndWithdraw",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "withdrawRecords",
    "outputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "blockNumber",
        "type": "uint32"
      },
      {
        "name": "txNumberInBlock",
        "type": "uint32"
      },
      {
        "name": "outputNumberInTX",
        "type": "uint8"
      },
      {
        "name": "beneficiary",
        "type": "address"
      },
      {
        "name": "isExpress",
        "type": "bool"
      },
      {
        "name": "status",
        "type": "uint8"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "timeStarted",
        "type": "uint256"
      },
      {
        "name": "timeEnded",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "doubleSpendRecords",
    "outputs": [
      {
        "name": "prooved",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deposit",
    "outputs": [
      {
        "name": "idx",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_plasmaBlockNumber",
        "type": "uint32"
      },
      {
        "name": "_plasmaTxNumInBlock",
        "type": "uint32"
      },
      {
        "name": "_plasmaTransaction",
        "type": "bytes"
      },
      {
        "name": "_merkleProof",
        "type": "bytes"
      }
    ],
    "name": "makeWithdrawExpress",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      },
      {
        "name": "withdrawIndex",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "spendAndWithdrawRecords",
    "outputs": [
      {
        "name": "prooved",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_success",
        "type": "bool"
      },
      {
        "indexed": true,
        "name": "_b",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "_signer",
        "type": "address"
      }
    ],
    "name": "Debug",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_1",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_2",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_3",
        "type": "uint256"
      }
    ],
    "name": "DebugUint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_signer",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_r",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "_s",
        "type": "bytes32"
      }
    ],
    "name": "SigEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_signer",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_blockNumber",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_blockHash",
        "type": "bytes32"
      }
    ],
    "name": "HeaderSubmittedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_depositIndex",
        "type": "uint256"
      }
    ],
    "name": "DepositEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_depositIndex",
        "type": "uint256"
      }
    ],
    "name": "DepositWithdrawStartedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_depositIndex",
        "type": "uint256"
      }
    ],
    "name": "DepositWithdrawChallengedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_depositIndex",
        "type": "uint256"
      }
    ],
    "name": "DepositWithdrawCompletedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_blockNumber",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_txNumberInBlock",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_outputNumberInTX",
        "type": "uint8"
      }
    ],
    "name": "WithdrawStartedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_withdrawIndex",
        "type": "uint256"
      }
    ],
    "name": "WithdrawRequestAcceptedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_blockNumber",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_txNumberInBlock",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_outputNumberInTX",
        "type": "uint8"
      }
    ],
    "name": "WithdrawFinalizedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_withdrawTxBlockNumber",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_withdrawTxNumberInBlock",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      }
    ],
    "name": "ExpressWithdrawMadeEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_txIndex1",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_txIndex2",
        "type": "uint256"
      }
    ],
    "name": "DoubleSpendProovedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_txIndex",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_withdrawIndex",
        "type": "uint256"
      }
    ],
    "name": "SpendAndWithdrawProovedEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_txIndex",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_depositIndex",
        "type": "uint256"
      }
    ],
    "name": "FundingWithoutDepositEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_txIndex1",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "_txIndex2",
        "type": "uint256"
      }
    ],
    "name": "DoubleFundingEvent",
    "type": "event"
  }
]