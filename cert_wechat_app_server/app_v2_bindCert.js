let express = require('express');
let bodyParser = require('body-parser');
let Web3 = require('web3');     //引入web3.js

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


/* web3 init */
let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.68:8545"));
// let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.53:4444"));

let coinbase = "0xb247e2b628caa0e34cbd27f84bffd4ebe8158f99";
/*
let fromAddress;
web3.eth.getCoinbase()
    .then(function(coinbase) {
        fromAddress = coinbase;
        console.log(fromAddress);
    });
*/
let options = {
    from: coinbase,
    gas: 500000,
    // gasPrice: 3800000000000,
};

let abi =
    [
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
                },
                {
                    "name": "_bindTime",
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
                    "name": "_certName",
                    "type": "bytes"
                },
                {
                    "name": "_certMeaning",
                    "type": "bytes"
                }
            ],
            "name": "addCertBytes",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getCert",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
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
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
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
                    "name": "_inviterId",
                    "type": "uint256"
                }
            ],
            "name": "getCertBindByInviter",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
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
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getCertBytes",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes"
                },
                {
                    "name": "",
                    "type": "bytes"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCertBytesIdList",
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
        }
    ]
;

let contractAddress = "0x6f26b391ebbfc38659f4c15fa8af1883e483d846";	    // 合约地址
let certContract = new web3.eth.Contract(abi,contractAddress, options);   //调用web3 去获取到合约的对象

let unlockAccount = function () {
    let unlock = new Promise(function (resolve, reject) {
        
        if (!reject)  {
            resolve();
        } else {
            reject();
        }
    });
};

/* region common api */
// getPastLogs
app.get("/getPastLogs",function(req,resp){
    let options = {fromBlock: 0, toBlock: 'latest', address: coinbase};
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
app.post("/addCertBytes",function(req,resp){
    console.log('addCertBytes body', req.body);
    
    let params = {
        certName: web3.utils.utf8ToHex(req.body.certName),  // 参数 utf8 转 hex 再提交
        certMeaning: web3.utils.utf8ToHex(req.body.certMeaning),
    };
    
    certContract.methods.addCertBytes(params.certName, params.certMeaning)
        .send(options, function(error,result){
            console.log('result', error, result);    //返回32字节的交易哈希值
            resp.send(result);
        })
});
app.get("/getCertBytesIdList",function(req,resp){
    // resp.send(certList);
    certContract.methods.getCertBytesIdList().call(function(error,result){
        console.log('IdList：', '\n'+result);
        resp.send(result);
    });
});
app.post("/getCertBytes",function(req,resp){
    console.log(req.body);
    let certId = parseInt(req.body.certId);
    
    if (req.body.certId) {
        certContract.methods.getCertBytes(certId).call(function(error,result){
            // 返回的 result：{0: certName, 1: certMeaning}
            // console.log(result);
            let certObj = {
                certId: 0,
                certName: '',
                certMeaning: '',
            };
            try {
                if (result[0] !== null) {
                    certObj.certId = certId;
                    certObj.certName = web3.utils.hexToUtf8(result[0]);
                    certObj.certMeaning = web3.utils.hexToUtf8(result[1]);
                    resp.send({status: 'success', certObj: certObj});
                } else {
                    resp.send({ status: 'error', error: 'Something failed! result is null' });
                }
            } catch (e) {
                resp.send({ status: 'error', error: 'catch Something failed! result is null' });
            }
            
        });
    } else {
        resp.send({ status: 'error', error: 'certId is required' });
    }
    
});
app.post("/getCertBytesList",function(req,resp){
    certContract.methods.getCertBytesIdList().call(function(error,result){
        // console.log('IdList：', '\n'+result);
        let certIdList = result;
        let certBytesList = [];
        let certBytesListTmp = [];
        certIdList.forEach(function (certId, index) {
            certContract.methods.getCertBytes(certId).call(function(error,result){
                // 返回的 result：{0: certName, 1: certMeaning}
                // console.log(result);
                let certObj = {
                    certId: 0,
                    certName: '',
                    certMeaning: '',
                };
                try {
                    certObj.certId = certId;
                    certObj.certName = web3.utils.hexToUtf8(result[0]);
                    certObj.certMeaning = web3.utils.hexToUtf8(result[1]);
                    certBytesListTmp.push(certObj);
                } catch (e) {
                    resp.send({ status: 'error', error: 'catch Something failed!' });
                }
    
                if (certBytesListTmp.length === certIdList.length) {
                    certBytesList = certBytesListTmp.sort(compareByCertId('certId'));
                    resp.send({status: 'success', certBytesList: certBytesList});
                }
            });
    
        });
        
        
        
        
    });
    
});

/* endregion certificate api */



/* region wechat app controller */

/* endregion wechat app controller */






/* server listener */
let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log(host, port);
});





function getGas() {
    let gasEstimate = web3.eth.estimateGas({
        to: coinbase,
        value: '',
    });
    
    return gasEstimate;
    
}

function compareByCertId(property) {
    return function(obj1,obj2){
        let value1 = obj1[property];
        let value2 = obj2[property];
        // console.log(value1 - value2);
        return value1 - value2;     // 升序
    }
}



