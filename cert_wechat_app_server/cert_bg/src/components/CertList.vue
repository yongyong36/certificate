<template>
  <div>
    <!-- Cert Form -->
    <h1>Cert Form</h1>

    <div class="col">
      <h3>set cert</h3>
      <label for="cert_name">cert_name</label>
      <input type="text" name="certName" id="cert_name" value="silly" v-model="cert.certName"><br>

      <label for="cert_meaning">cert_meaning</label>
      <input type="text" name="certMeaning" id="cert_meaning" value="傻证" v-model="cert.certMeaning"><br>

      <label></label>
      <button @click="addCert()">addCert</button>
    </div>

    <div class="col">
      <h3>set cert bytes</h3>
      <label for="cert_bytes_name">cert_name</label>
      <input type="text" name="certName" id="cert_bytes_name" value="silly" v-model="certBytes.certName"><br>

      <label for="cert_bytes_meaning">cert_meaning</label>
      <input type="text" name="certMeaning" id="cert_bytes_meaning" value="傻证" v-model="certBytes.certMeaning"><br>

      <label></label>
      <button @click="addCertBytes()">addCertBytes</button>
    </div>
    <br>
    <br>

    <!--<h3>get cert</h3>-->
    <!--<label for="cert_meaning">cert_meaning</label>-->
    <!--<input type="text" name="certId" id="cert_id" value="1" v-model="certId"><br>-->
    <!--<label></label>-->
    <!--<button @click="getCert()">getCert</button>-->

    <br>


    <hr>
    <!-- transaction -->
    <h1>Transaction</h1>
    <button @click="getPastLogs()">getPastLogs</button>
    <br><br><br><br>


    <!-- Cert List -->
    <hr>
    <h1>Cert List</h1>

    <div class="col">
      <h3>cert</h3>
      <button @click="getCertIdList()">getCertIdList</button>
      <button @click="getCertNameList()">getCertNameList</button>
      <ul>
        <li v-for="cert in cert.list">
          {{cert}}
        </li>
      </ul>
    </div>

    <div class="col">
      <h3>cert bytes</h3>
      <button @click="getCertBytesIdList()">getCertIdList</button>

      <div>
        <button @click="getCertBytes(certBytes.getById)">getCertBytes</button>
        <input type="text" v-model="certBytes.getById">
      </div>
      <ul>
        <li v-for="cert in certBytes.list">
          {{cert}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  // let web3;
  // if (typeof web3 !== 'undefined') {
  //   web3 = new Web3(web3.currentProvider);
  // } else {
  //   web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // }
  let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.68:8545"));
  // let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.53:4444"));
  let coinbase = web3.eth.coinbase;
  let ethAbi = web3.eth.abi;
  let balance = web3.eth.getBalance(coinbase);
  // console.log(ethAbi, web3);
  // console.log(coinbase);

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
  let contractAddress = "0x3a51e5699ef0360d05ab97df4c50e40d8985aa0f";		// 合约地址
  let myContract = web3.eth.contract(abi);
  let certContract = myContract.at(contractAddress);

  let options = {
    from: coinbase,
    gas: 300000,
    // gasPrice: 3800000000000,
  };


  // deploy
/*
  let certractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getCertNameList","outputs":[{"name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_certId","type":"uint256"},{"name":"_inviterId","type":"uint256"},{"name":"_invitedId","type":"uint256"}],"name":"addCertBind","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_msg1","type":"string"},{"name":"_msge2","type":"string"}],"name":"setMsgArr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_invitedId","type":"uint256"}],"name":"getCertBindByInvited","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMsg","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_certName","type":"string"},{"name":"_certMeaning","type":"string"}],"name":"addCert","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_msg","type":"string"}],"name":"setMsg","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMsgArr","outputs":[{"name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCertIdList","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_inviterId","type":"uint256"}],"name":"getCertBindByInviter","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);
  let certContract = certractContract.new(
    {
      from: web3.eth.accounts[0],
      data: '0x60806040526000805534801561001457600080fd5b50610f6f806100246000396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166326a2b75f81146100a85780634053b64b146100d3578063691fcf59146100f55780638f823a1214610115578063b5fdeb2314610142578063c362cbf414610164578063c4784fd414610184578063c4f258b6146101a4578063e01f19b5146101b9578063ead51a55146101db575b600080fd5b3480156100b457600080fd5b506100bd6101fb565b6040516100ca9190610e4f565b60405180910390f35b3480156100df57600080fd5b506100f36100ee366004610d00565b6102d4565b005b34801561010157600080fd5b506100f3610110366004610c79565b610348565b34801561012157600080fd5b50610135610130366004610ce2565b610566565b6040516100ca9190610e82565b34801561014e57600080fd5b50610157610578565b6040516100ca9190610e71565b34801561017057600080fd5b506100f361017f366004610c79565b61060e565b34801561019057600080fd5b506100f361019f366004610c3c565b61086e565b3480156101b057600080fd5b506100bd610885565b3480156101c557600080fd5b506101ce610954565b6040516100ca9190610e60565b3480156101e757600080fd5b506101356101f6366004610ce2565b6109ab565b60606003805480602002602001604051908101604052809291908181526020016000905b828210156102ca5760008481526020908190208301805460408051601f60026000196101006001871615020190941693909304928301859004850281018501909152818152928301828280156102b65780601f1061028b576101008083540402835291602001916102b6565b820191906000526020600020905b81548152906001019060200180831161029957829003601f168201915b50505050508152602001906001019061021f565b5050505090505b90565b604080516060818101835285825260208083018681528385018681526000888152600584528681209551865591516001808701919091559051600295860155855193840186529783528282019687528285018681529581526006909152929092209151825592519381019390935551910155565b815161035b9060099060208501906109bd565b50805161036f90600a9060208401906109bd565b50604080516009805460e06020601f60026000196101006001871615020190941693909304928301819004028401810190945260c08301818152929384939291908401828280156104015780601f106103d657610100808354040283529160200191610401565b820191906000526020600020905b8154815290600101906020018083116103e457829003601f168201915b5050509183525050600a805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529382019392918301828280156104935780601f1061046857610100808354040283529160200191610493565b820191906000526020600020905b81548152906001019060200180831161047657829003601f168201915b505050918352505060408051808201825260038082527f7a7a7a000000000000000000000000000000000000000000000000000000000060208381019190915280850192909252825180840184528181527f78787800000000000000000000000000000000000000000000000000000000008184015283850152825180840184529081527f636363000000000000000000000000000000000000000000000000000000000081830152606084015281519081019091526000815260809091015261056190600b906006610a3b565b505050565b60009081526006602052604090205490565b60088054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106045780601f106105d957610100808354040283529160200191610604565b820191906000526020600020905b8154815290600101906020018083116105e757829003601f168201915b5050505050905090565b604080516060810182526000805480835260208084018781528486018790526001808401855592845282825294909220835181559351805193949361065b939285019291909101906109bd565b50604082015180516106779160028401916020909101906109bd565b50506003546000101590506106af576002805490610699906000198301610a94565b5060038054906106ad906000198301610ab8565b505b6000805460028054600181810183557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace918201939093558154808401909255018290556003805491820180825592528351610731917fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b019060208601906109bd565b5050600380546001810180835560009290925260408051808201909152600a8082527f5f636572745f6e616d650000000000000000000000000000000000000000000060209092019182526107a9927fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0191906109bd565b505060008054815260016020819052604082206004805480840180835591909452815460039094027f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b8101948555828401805492959394610841937f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19c9093019260026101009282161592909202600019011604610adc565b5060028281018054610866928481019291600019610100600183161502011604610adc565b505050505050565b80516108819060089060208401906109bd565b5050565b6060600b805480602002602001604051908101604052809291908181526020016000905b828210156102ca5760008481526020908190208301805460408051601f60026000196101006001871615020190941693909304928301859004850281018501909152818152928301828280156109405780601f1061091557610100808354040283529160200191610940565b820191906000526020600020905b81548152906001019060200180831161092357829003601f168201915b5050505050815260200190600101906108a9565b6060600280548060200260200160405190810160405280929190818152602001828054801561060457602002820191906000526020600020905b81548152602001906001019080831161098e575050505050905090565b60009081526005602052604090205490565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109fe57805160ff1916838001178555610a2b565b82800160010185558215610a2b579182015b82811115610a2b578251825591602001919060010190610a10565b50610a37929150610b51565b5090565b828054828255906000526020600020908101928215610a88579160200282015b82811115610a885782518051610a789184916020909101906109bd565b5091602001919060010190610a5b565b50610a37929150610b6b565b81548183558181111561056157600083815260209020610561918101908301610b51565b81548183558181111561056157600083815260209020610561918101908301610b6b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b155780548555610a2b565b82800160010185558215610a2b57600052602060002091601f016020900482015b82811115610a2b578254825591600101919060010190610b36565b6102d191905b80821115610a375760008155600101610b57565b6102d191905b80821115610a37576000610b858282610b8e565b50600101610b71565b50805460018160011615610100020316600290046000825580601f10610bb45750610bd2565b601f016020900490600052602060002090810190610bd29190610b51565b50565b6000601f82018313610be657600080fd5b8135610bf9610bf482610ebd565b610e96565b91508082526020830160208301858383011115610c1557600080fd5b610c20838284610eef565b50505092915050565b6000610c3582356102d1565b9392505050565b600060208284031215610c4e57600080fd5b813567ffffffffffffffff811115610c6557600080fd5b610c7184828501610bd5565b949350505050565b60008060408385031215610c8c57600080fd5b823567ffffffffffffffff811115610ca357600080fd5b610caf85828601610bd5565b925050602083013567ffffffffffffffff811115610ccc57600080fd5b610cd885828601610bd5565b9150509250929050565b600060208284031215610cf457600080fd5b6000610c718484610c29565b600080600060608486031215610d1557600080fd5b6000610d218686610c29565b9350506020610d3286828701610c29565b9250506040610d4386828701610c29565b9150509250925092565b6000610d5882610eeb565b80845260208401935083602082028501610d7185610ee5565b60005b84811015610da8578383038852610d8c838351610e0b565b9250610d9782610ee5565b602098909801979150600101610d74565b50909695505050505050565b6000610dbf82610eeb565b808452602084019350610dd183610ee5565b60005b82811015610e0157610de7868351610e40565b610df082610ee5565b602096909601959150600101610dd4565b5093949350505050565b6000610e1682610eeb565b808452610e2a816020860160208601610efb565b610e3381610f2b565b9093016020019392505050565b610e49816102d1565b82525050565b60208082528101610c358184610d4d565b60208082528101610c358184610db4565b60208082528101610c358184610e0b565b60208101610e908284610e40565b92915050565b60405181810167ffffffffffffffff81118282101715610eb557600080fd5b604052919050565b600067ffffffffffffffff821115610ed457600080fd5b506020601f91909101601f19160190565b60200190565b5190565b82818337506000910152565b60005b83811015610f16578181015183820152602001610efe565b83811115610f25576000848401525b50505050565b601f01601f1916905600a265627a7a72305820b68e795cc770bc64dc8839d9268d03e0256a521943e5fc53b1e3ca5863fac1fb6c6578706572696d656e74616cf50037',
      gas: '4700000'
    }, function (e, contract){
      console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
        console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
      }
    });
*/

  let blockNumber = web3.eth.blockNumber;
  let blockHash;

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
    let promise = new Promise(function(resolve, reject){
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


  import Vue from 'vue';

  export default {
    name: 'CertList',
    data () {
      return {
        cert: {
          certId: 1,
          certName: 'aaaaa',
          certMeaning: 'aaaaaa',
          list: [],
          idList: [],
          nameList: [],
        },
        certBytes: {
          certId: 1,
          certName: 'aaaaa',
          certMeaning: 'aaaaaa',
          list: [],
          idList: [],
          nameList: [],
          getById: 0,
        },
      }
    },
    http: { headers: {'Content-Type': 'application/x-www-form-urlencoded'} },
    methods: {
      setDataCertList: function() {
        let _this = this;
        if (this.cert.idList.length > 0 && this.cert.nameList.length > 0) {
          _this.cert.list = [];
          this.cert.idList.forEach(function (item, index) {
            _this.cert.list.push({certId: item, certName: _this.cert.nameList[index]});
          });
        }
        // console.log('CertList', this.cert.list);
      },
      addCert: function() {
        console.log(this.cert.certName, this.cert.certMeaning);
        let data = {
          certName: this.cert.certName,
          certMeaning: this.cert.certMeaning,
        };
        // Vue.http.post('http://127.0.0.1:3000/addCert', data, function (err, result) {
        //   console.log(err, result);
        // })
        // Vue.http.post('http://127.0.0.1:3000/addCert', data)
        //   .then((resp) => {
        //     console.log(resp.data);
        //   },(err) => {
        //     console.log(err);
        //   })
        unlockAccount().then(function () {
          console.log('unlock true', certContract);
          certContract.addCert(data.certName, data.certMeaning, options, function(error,result) {
            console.log(error,result);
          });

          // certContract.addCert.sendTransaction(data.certName, data.certMeaning, options, function(error,result) {
          //   console.log(error,result);
          // });
        })
      },
      getCertIdList: function() {
        let _this = this;

/*
        certContract.getCertIdList(options, function(error,result) {
          console.log('IdList：', error,result);
          // _this.cert.idList = result;
        });
*/

/*
        certContract.getCertIdList.call(options, function(error,result) {
          console.log('IdList：', error,result);
            // _this.cert.idList = result;
          });
*/

        Vue.http.get('http://127.0.0.1:3000/getCertIdList')
          .then((resp) => {
            // console.log('IdList：', resp.data);
            // if (resp.data.length > 1) {
            //   resp.data.shift();
            // }
            this.cert.idList = resp.data;
            // console.log('IdList：', this.cert.idList);
          },(err) => {
            console.log(err);
          })
      },
      getCertNameList: function() {
        let _this = this;

        // certContract.getCertNameList(options, function(error,result) {
        //   console.log('NameList：', error,result);
        //   _this.cert.nameList = result;
        //   // if (_this.cert.nameList.length > 1) {
        //   //   _this.cert.nameList.shift();
        //   //   _this.cert.nameList.push(' ');
        //   // }
        // });

        // Vue.http.get('http://127.0.0.1:3000/getCertNameList')
        //   .then((resp) => {
        //     console.log('NameList：', resp);
        //     // if (resp.data.length > 1) {
        //     //   resp.data.shift();
        //     // }
        //     this.cert.nameList = resp.data;
        //     // this.cert.setDataCertList();
        //     // console.log('NameList：', this.cert.nameList);
        //   },(err) => {
        //     console.log('NameList：', err);
        //   })

      },
      getCert: function() {
        let data = {
          // certId: parseInt(this.cert.certId),
          certId: this.cert.certId,
        };
        certContract.getCert(0, options, function(error,result) {
          console.log(error,result);
        });
        // Vue.http.get('http://127.0.0.1:3000/getCert', data)
        //   .then((resp) => {
        //     console.log(resp.data);
        //     this.cert.list = resp.data;
        //   },(err) => {
        //     console.log(err);
        //   });
      },



      addCertBytes: function() {
        // console.log(this.certBytes.certName, this.certBytes.certMeaning);
        let data = {
          certName: web3.toHex(this.stringToByte(this.certBytes.certName)),
          certMeaning: web3.toHex(this.stringToByte(this.certBytes.certMeaning)),
        };
        // Vue.http.post('http://127.0.0.1:3000/addCert', data, function (err, result) {
        //   console.log(err, result);
        // })
        // Vue.http.post('http://127.0.0.1:3000/addCert', data)
        //   .then((resp) => {
        //     console.log(resp.data);
        //   },(err) => {
        //     console.log(err);
        //   })
        unlockAccount().then(function () {
          console.log('unlock true', data.certName, data.certMeaning); //, certContract
          certContract.addCertBytes(data.certName, data.certMeaning, options, function(error,result) {
            console.log(error,result);
          });

          // certContract.addCert.sendTransaction(data.certName, data.certMeaning, options, function(error,result) {
          //   console.log(error,result);
          // });
        })
      },
      getCertBytesIdList: function() {
        let _this = this;

        /*
                certContract.getCertBytesIdList(options, function(error,result) {
                  console.log('IdList：', error,result);
                  // _this.cert.idList = result;
                });
        */

        /*
                certContract.getCertBytesIdList.call(options, function(error,result) {
                  console.log('IdList：', error,result);
                    // _this.cert.idList = result;
                  });
        */

        Vue.http.get('http://127.0.0.1:3000/getCertBytesIdList')
          .then((resp) => {
            // console.log('IdList：', resp.data);
            // if (resp.data.length > 1) {
            //   resp.data.shift();
            // }
            this.certBytes.idList = resp.data;
            console.log('IdList：', this.certBytes.idList);
          },(err) => {
            console.log(err);
          })
      },
      getCertBytes: function(id) {
        let _this = this;
        let data = {
          // certId: parseInt(this.certBytes.certId),
          certId: id,
        };
        certContract.getCertBytes(data.certId, options, function(error,result) {
          console.log(error,result);
          let certB = {
            id: data.certId,
            name: '',
            meaning: '',
          };
          result.forEach(function (item, index) {
            switch (index) {
              case 0:
                certB.name = _this.byteToString(JSON.parse(web3.toAscii(item))); break;
              case 1:
                certB.meaning = _this.byteToString(JSON.parse(web3.toAscii(item))); break;
              default: break;
            }
          });
          _this.certBytes.list.push(certB);
          console.log(_this.certBytes.list);

        });
        // Vue.http.get('http://127.0.0.1:3000/getCert', data)
        //   .then((resp) => {
        //     console.log(resp.data);
        //     this.certBytes.list = resp.data;
        //   },(err) => {
        //     console.log(err);
        //   });
      },




      getPastLogs: function() {
        Vue.http.get('http://127.0.0.1:3000/getPastLogs')
          .then((resp) => {
            console.log(resp.data);
          },(err) => {
            console.log(err);
          })
      },


      stringToByte: function (str) {
        let bytes = [];
        let len, c;
        len = str.length;
        for (let i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
          } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
          } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
          } else {
            bytes.push(c & 0xFF);
          }
        }
        return bytes;
      },
      byteToString: function (arr) {
        if (typeof arr === 'string') {
          return arr;
        }
        let str = '',
          _arr = arr;
        for (let i = 0; i < _arr.length; i++) {
          let one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
          if (v && one.length === 8) {
            let bytesLength = v[0].length;
            let store = _arr[i].toString(2).slice(7 - bytesLength);
            for (let st = 1; st < bytesLength; st++) {
              store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
          } else {
            str += String.fromCharCode(_arr[i]);
          }
        }
        return str;
      },



    },
    computed: {
      'cert.list': function() {
        let _this = this;
        if (this.cert.idList.length > 0 && this.cert.nameList.length > 0) {
          _this.cert.list = [];
          this.cert.idList.forEach(function (item, index) {
            _this.cert.list.push({certId: item, certName: _this.cert.nameList[index]});
          });
        }
        return this.cert.list;
      }
    },
    created: function() {
      this.getCertIdList();
      // this.getCertNameList();
    },
    watch: {
      // idList: function (val) {
      //   // console.log(val);
      //   this.setDataCertList();
      // },
      // nameList: function (val) {
      //   // console.log(val);
      //   this.setDataCertList();
      // },
    }
  }
</script>

<style scoped>
  * {
    font-family: "Lato","proxima-nova","Helvetica Neue",Arial,sans-serif;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  *:focus {
    outline: none;
  }
  ul, li {

  }
  button {
    padding: 8px 15px;
    margin: 0 5px 10px;
    background-color: #d6d6d6;
    border: none;
    color: #2c3e50;
    cursor: pointer;
  }
  label {
    display: inline-block;
    width: 100px;
    margin: 0 5px 5px 5px;
    text-align: right;
  }
  input {
    padding: 5px 10px;
    margin: 0 5px 10px 5px;
  }
  .col {
    display: inline-block;
    width: 49%;
    vertical-align: top;
  }
</style>



