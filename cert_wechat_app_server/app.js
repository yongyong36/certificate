let express = require('express');
let bodyParser = require('body-parser');
// let qs = require('querystring');
let Web3 = require('web3');     //引入web3.js
// let Eth = require('web3-eth');

let app = express();
// app.configure(function () {
//     app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));
// });
app.use(express.static('page'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method==="OPTIONS")
        // res.send(200);/*让options请求快速返回*/
        res.sendStatus(200);
    else next();
});

/* route */
app.get('/', function(req, res){
    res.sendFile( __dirname + "/page/html/" + "index.html");
});
app.get('/cert', function(req, res){
    res.sendFile( __dirname + "/page/html/" + "cert.html");
});
app.get('/msg', function(req, res){
    res.sendFile( __dirname + "/page/html/" + "msg.html");
});


/* web3 init */
// let web3;
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// }
let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.68:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.53:4444"));

let fromAddress = "0xb247e2b628caa0e34cbd27f84bffd4ebe8158f99";
/*
let fromAddress;
web3.eth.getCoinbase()
    .then(function(coinbase) {
        fromAddress = coinbase;
        console.log(fromAddress);
    });
*/
let options = {
    from: fromAddress,
};

let abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "minter",
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
        "inputs": [],
        "name": "returnBool",
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
        "inputs": [],
        "name": "getCertNameList",
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
        "inputs": [],
        "name": "returnBoolArr",
        "outputs": [
            {
                "name": "",
                "type": "bool[]"
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
        "inputs": [],
        "name": "getCertIdList",
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
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];

let contractAddress = "0xc39333236c9bcd4ace0a9bb0f9fa29272cf86222";	    // 合约地址
let certContract = new web3.eth.Contract(abi,contractAddress, options);   //调用web3 去获取到合约的对象

// let eth = new Eth(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// let balance = web3.eth.getBalance(coinbase);
// console.log(certContract.methods);


/* region common api */
// getPastLogs
app.get("/getPastLogs",function(req,resp){
    let options = {fromBlock: 0, toBlock: 'latest', address: fromAddress};
    web3.eth.getPastLogs(options, function(logs) {
        resp.send(logs);
    });
    
    /*
    , function(logs) {
        resp.send(logs);
    }
    */
});


/* region certificate api */
// certificate
// let certList = [
//     {id: 1, type: 'merry', name: '结婚证', couple: true},
//     {id: 2, type: 'lovers', name: '情侣证', couple: true},
//     {id: 3, type: 'single', name: '狗牌', couple: false},
//     {id: 4, type: 'passerby', name: '路人证', couple: true},
//     {id: 5, type: 'bestie', name: '闺蜜证', couple: true},
//     {id: 6, type: 'bestFriends', name: '死党证', couple: true},
//     {id: 7, type: 'queen', name: '喵星女王', couple: false},
//     {id: 8, type: 'prince', name: '小王子', couple: false},
// ];

// app.get("/getCertList",function(req,resp){
//     // resp.send(certList);
//     certContract.methods.getCertNameList().call(function(error,result){
//         resp.send(result);
//     });
// });
app.get("/getCertIdList",function(req,resp){
    // resp.send(certList);
    certContract.methods.getCertIdList().call(function(error,result){
        console.log('IdList：', '\n'+result);
        resp.send(result);
    });
});
app.get("/getCertNameList",function(req,resp){
    // resp.send(certList);
    
    certContract.methods.getCertNameList().call(options, function(error,result){
        console.log('NameList：', '\n'+error, '\n'+result);
        resp.send(result);
    });
    
    // certContract.methods.getCertNameList().call(options).then(function(error, result){
    //     console.log('NameList：', '\n'+error, '\n'+result);
    // });
    
});


app.post("/addCert",function(req,resp){
    console.log(req.body);
    certContract.methods.addCert(req.body.certName, req.body.certMeaning).send(options, function(error,result){
        console.log('result', error, result);    //返回32字节的交易哈希值
        resp.send(result);
    })
});
app.get("/getCert",function(req,resp){
    console.log(req.body);
    certContract.methods.getCert().call(function(error,result){
        resp.send(result);
    });
});




let unlockAccount = function () {
    let unlock = new Promise(function (resolve, reject) {
        
        if (!reject)  {
            resolve();
        } else {
            reject();
        }
    });
};




/* region message api */
// set
app.post("/setMessage",function(req,resp){
    console.log(req.body);
    let options = {
        from: fromAddress,
    };
    // console.log(certContract.methods.setMsg(req.body.str).encodeABI());
    certContract.methods.setMsg(req.body.str).send(options, function(error,result){
        console.log('result', error, result);    //返回32字节的交易哈希值
        resp.send(result);
    })
    /*.on('receipt', function(receipt) {
        // 交易收据有效时触发 Object
        console.log('receipt',receipt);
    })
    .on('transactionHash', function(hash){
        //交易发送后得到有效交易哈希值时触发 String
        console.log('transactionHash',hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        // 收到确认时触发 Number
        console.log('confirmation',confirmationNumber, receipt);
    })*/;
    
});

// get
app.get("/getMessage",function(req,resp){
    let msg = certContract.methods.getMsg().call(function(error,result){
        console.log(error, result);
        resp.send(result);
    });
    // msg.then(function(result) {
    //     console.log('result', result);
    // });
    // console.log(msg);
    
});


/* server listener */
let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log(host, port);
});




/* bytes string 互转 */
function strToHexCharCode(str) {
    if(str === "")
        return "";
    let hexCharCode = [];
    hexCharCode.push("0x");
    for(let i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}
function hexCharCodeToStr(hexCharCodeStr) {
    let trimedStr = hexCharCodeStr.trim();
    let rawStr = trimedStr.substr(0,2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    let len = rawStr.length;
    if(len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    let curCharCode;
    let resultStr = [];
    for(let i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}










