/*
* app_v2_bindCert.js
*
* */
let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let Web3 = require('web3');     //引入web3.js
let getSensitiveData = require('./controller/getWechatAppIdController');

// let appId = "wx0e88c5996198a2f4";    // 此appid无法获取unionID
// let appSecret = "2e9a2be7fd9c54222a5a7bde94ac1e89";
let appId = "wxc1d05bb93e18391d";
let appSecret = "1f2fab3c591b6e8fe1006aa49c15c00c";

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
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getCert",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes"
                },
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
            "constant": false,
            "inputs": [
                {
                    "name": "_certName",
                    "type": "bytes"
                },
                {
                    "name": "_certMeaning",
                    "type": "bytes"
                },
                {
                    "name": "_isCouple",
                    "type": "bytes"
                }
            ],
            "name": "addCert",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
    ]
;

let contractAddress = "0x196669e9e6af48e3375bfa22cc51f140d301d5e5";	    // 合约地址
let certContract = new web3.eth.Contract(abi,contractAddress, options);   // 调用web3 去获取到合约的对象

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
app.post("/addCert",function(req,resp){
    console.log('addCert body', req.body);
    
    let params = {
        certName: web3.utils.utf8ToHex(req.body.certName.toString()),  // 参数 utf8 转 hex 再提交
        certMeaning: web3.utils.utf8ToHex(req.body.certMeaning.toString()),
        isCouple: web3.utils.utf8ToHex(req.body.isCouple.toString()),
    };
    
    console.log(req.body.isCouple, params.isCouple);
    
    certContract.methods.addCert(params.certName, params.certMeaning, params.isCouple)
        .send(options, function(error,result){
            console.log('result', error, result);    //返回32字节的交易哈希值
            resp.send(result);
        })
});
app.get("/getCertIdList",function(req,resp){
    // resp.send(certList);
    certContract.methods.getCertIdList().call(function(error,result){
        console.log('IdList：', result);
        resp.send(result);
    });
});
app.post("/getCert",function(req,resp){
    console.log(req.body);
    let certId = parseInt(req.body.certId);
    
    if (req.body.certId) {
        certContract.methods.getCert(certId).call(function(error,result){
            // 返回的 result：{0: certName, 1: certMeaning}
            // console.log(result);
            let certObj = {
                certId: 0,
                certName: '',
                certMeaning: '',
                isCouple: '',
            };
            try {
                if (result[0] !== null) {
                    certObj.certId = certId;
                    certObj.certName = web3.utils.hexToUtf8(result[0]);
                    certObj.certMeaning = web3.utils.hexToUtf8(result[1]);
                    certObj.isCouple = web3.utils.hexToUtf8(result[2]);
                    resp.send({status: 'success', message: "", certObj: certObj});
                } else {
                    resp.send({ status: 'error', message: 'Something failed! result is null' });
                }
            } catch (e) {
                resp.send({ status: 'error', message: 'catch Something failed! result is null' });
            }
            
        });
    } else {
        resp.send({ status: 'error', message: 'certId is required' });
    }
    
});
app.post("/getCertList",function(req,resp){
    certContract.methods.getCertIdList().call(function(error,result){
        console.log('IdList：', result);
        let certIdList = result;
        let CertList = [];
        let CertListTmp = [];
        if (certIdList.length > 0) {
            try {
                certIdList.forEach(function (certId, index) {
                    certContract.methods.getCert(certId).call(function(error,result){
                        // 返回的 result：{0: certName, 1: certMeaning}
                        console.log('result', result);
                        let certObj = {
                            certId: 0,
                            certName: '',
                            certMeaning: '',
                            isCouple: '',
                        };
                        try {
                        certObj.certId = certId;
                        certObj.certName = web3.utils.hexToUtf8(result[0]);
                        certObj.certMeaning = web3.utils.hexToUtf8(result[1]);
                        certObj.isCouple = web3.utils.hexToUtf8(result[2]);
                        CertListTmp.push(certObj);
                        } catch (e) {
                            resp.send({ status: 'error', message: 'catch Something failed!' });
                        }
            
                        if (CertListTmp.length === certIdList.length) {
                            CertList = CertListTmp.sort(compareByCertId('certId'));
                            resp.send({status: 'success', message: "", CertList: CertList});
                        }
                    });
        
                });
            } catch(e) {
                resp.send({ status: 'error', message: 'catch Something failed!' });
            }
        } else {
            resp.send({status: 'success', message: "", CertList: CertList});
    
        }
    });
    
});
/* endregion certificate api */




/* region wechat app api */
let ssKey = {};
app.post("/storageCode", function (req, resp) {
    console.log(req.body);
    if (req.body.code) {
        request('https://api.weixin.qq.com/sns/jscode2session?appid='+ appId + '&secret=' + appSecret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
            , function (error, response, body) {
                console.log('storageCode ', body);
                let bodyObj = JSON.parse(body);
                if (!error && response.statusCode === 200) {
                    if (bodyObj.errcode) {
                        // request({
                        //     url: '/getUnionId',
                        //     method: 'POST',
                        //     json: true,
                        //     body: {}
                        //
                        // }, function (error, response, body) {
                        //
                        // });
                        resp.send({status: 'error', message: bodyObj.errmsg, err: bodyObj});
                    } else {
                        ssKey = {session_key: bodyObj.session_key, openid: bodyObj.openid, unionId: bodyObj.unionId};
                        console.log('storageCode success', bodyObj.unionid);
                        resp.send({status: 'success', message: "storageCode success", unionId: bodyObj.unionid});
                    }
                } else {
                    resp.send({status: 'error', message: error});
                }
            })
    } else {
        resp.send({status: 'error', message: 'invalid code'});
    }
});
app.post("/getUnionId", function (req, resp) {
    // console.log(req.body);
    let result = {};
    let sensitiveData = {};
    console.log('ssKey: '+ssKey.session_key+';  encryptedData: '+req.body.encryptedData+';  iv: '+ req.body.iv);
    if (ssKey.session_key && req.body.encryptedData && req.body.iv) {
        /* 偶尔会有buffer出错，未知原因 */
        sensitiveData = getSensitiveData(appId, ssKey.session_key, req.body.encryptedData, req.body.iv);
        console.log('sensitiveData', sensitiveData);
        result = {status: 'success', message: 'sensitiveData success', unionId: sensitiveData.unionId};
        // try {
        //     sensitiveData = getSensitiveData(appId, ssKey.session_key, req.body.encryptedData, req.body.iv);
        //     console.log('sensitiveData', sensitiveData);
        //     result = {status: 'success', message: 'sensitiveData success'};
        // } catch(e) {
        //     result = {status: 'error', message: '请求失败'};
        // }
    } else {
        result = {status: 'error', message: '请求参数错误'};
    }
    console.log(result);
    resp.send(result);
});
/* endregion wechat app api */


app.post("/bindCert", function (req, resp) {
    console.log(req.body);
    let inviterUnionId = req.body.inviterUnionId;
    let invitedUnionId = req.body.invitedUnionId;
    let certId = req.body.certId;
    let isCouple = req.body.isCouple;
    
    let result = {};
    if (inviterUnionId !== invitedUnionId) {
        
        
        
        
        
        
        resp.send({ status: 'success', message: ''});
    } else {
        resp.send({ status: 'error', message: '请分享给好友绑定证件'});
    }
    
    
    
    
    
    console.log(result);
    resp.send(result);
});






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






