
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
// }


let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.68:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.53:4444"));
let coinbase = web3.eth.coinbase;
let ethAbi = web3.eth.abi;
let balance = web3.eth.getBalance(coinbase);
// console.log(ethAbi, web3);
// console.log(coinbase);

let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getCert",
        "outputs": [
            {
                "name": "",
                "type": "string[]"
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
                "name": "_certId",
                "type": "uint256"
            },
            {
                "name": "_inviterId",
                "type": "uint256"
            },
            {
                "name": "_invitedId",
                "type": "uint256"
            }
        ],
        "name": "addCertBind",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_msg1",
                "type": "string"
            },
            {
                "name": "_msge2",
                "type": "string"
            }
        ],
        "name": "setMsgArr",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_invitedId",
                "type": "uint256"
            }
        ],
        "name": "getCertBindByInvited",
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
        "inputs": [],
        "name": "getMsg",
        "outputs": [
            {
                "name": "",
                "type": "string"
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
                "name": "_certName",
                "type": "string"
            },
            {
                "name": "_certMeaning",
                "type": "string"
            }
        ],
        "name": "addCert",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_msg",
                "type": "string"
            }
        ],
        "name": "setMsg",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getMsgArr",
        "outputs": [
            {
                "name": "",
                "type": "string[]"
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
                "name": "_inviterId",
                "type": "uint256"
            }
        ],
        "name": "getCertBindByInviter",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

let contractAddress = "0xc6e3073b2244e7865de868893482d8063da8e0e7";		// 合约地址
let myContract = web3.eth.contract(abi);
let myContractInstance = myContract.at(contractAddress);

let blockNumber = web3.eth.blockNumber;
let blockHash;


function sendTransaction() {
    let msgValue = msg.value;
    unlockAccount().then(function(data) {
        web3.eth.sendTransaction({
            from: coinbase,
            to: contractAddress,
            value: '1000000',
        }, function(err, transactionHash) {
            console.log('sendTransaction', err, transactionHash);
        });
        
    });
}

/*
* getBlock()
* fromBlock: 起始block
* toBlock: 终止block
* address:
* topics: 之后的任何交易，之前的任何交易
* */
function getBlock() {
    // 即时的
    let block = web3.eth.getBlock(blockNumber, true);
    blockHash = block.hash;
    // console.log(blockHash);
    console.log('block.transactions.hash', block.transactions.length, block.transactions[0] ? block.transactions[0].hash : '',
        block.transactions.length > 0 ? block.transactions : '');
    
}

let filter;

function filterFunc() {
    // 不断监听
    
    // let number = web3.eth.getTransactionCount(coinbase);
    // console.log(number);
    // let num = web3.eth.blockNumber;
    // console.log(num);
    
    // let options = {fromBlock: 0, toBlock: 'latest', address: coinbase};
    let options = {toBlock: blockHash};
    // filter = web3.eth.filter('latest');
    // filter = web3.eth.filter('genesis');
    filter = web3.eth.filter(options);
    filter.watch(function(error, result){
        // console.log(error, result);
        if (!error)
            console.log(result);
        let txInfo = web3.eth.getTransaction(result);
        console.log(txInfo);
    });
    // filter.get(function(error, result){
    //     // console.log(error, result);
    //     if (!error)
    //         console.log(result);
    //     let txInfo = web3.eth.getTransaction(result);
    //     console.log(txInfo);
    // });
    
    
    /* not work */
    // web3.eth.filter("latest", function (err, transaction) {
    //     console.log(err, transactions);
    // transactions.forEach(function (tx) {
    // 	let txInfo = web3.eth.getTransaction(tx.transactionHash);
    // 	console.log(txInfo);
    // });
    // });
    
}

function stopWatching() {
    filter.stopWatching();
}


/*
* account
*/
function newAccount () {
    //创建账户
    web3.personal.newAccount("123456",function(error,result){
        console.log(error);
        console.log(result);
    });
}

function getAccounts () {
    web3.eth.getAccounts(function(error,result){
        if(!error){
            console.log(result);
        } else {
            console.log(error);
        }
    });
}

function unlockAccount () {
    let account = coinbase;
    //解锁账户
    let promise = new Promise(function(resolve, reject) {
        web3.personal.unlockAccount(account,"123456",function(error,result){
            if (!error) {
                // console.log(result);
                resolve();
            } else {
                // console.log(error);
                reject();
            }
        });
    });
    return promise;
}

