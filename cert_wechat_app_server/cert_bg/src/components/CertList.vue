<template>
  <div>
    <div>
      <!-- Cert Form -->
      <h1>Cert Form</h1>

      <label for="cert_name">cert_name</label>
      <input type="text" name="certName" id="cert_name" value="silly" v-model="certName"><br>

      <label for="cert_meaning">cert_meaning</label>
      <input type="text" name="certMeaning" id="cert_meaning" value="傻证" v-model="certMeaning"><br>

      <label></label>
      <button @click="addCertCont()">addCert</button>
      <br>
      <br>

      <label for="cert_meaning">cert_meaning</label>
      <input type="text" name="certId" id="cert_id" value="1" v-model="certId"><br>
      <label></label>
      <button @click="getCertCont()">getCert</button>

    </div>
    <br>


    <hr>
    <!-- transaction -->
    <h1>Transaction</h1>
    <button @click="getPastLogs()">getPastLogs</button>
    <br><br><br><br>


    <!-- Cert List -->
    <hr>
    <h1>Cert List</h1>
    <ul>
      <li v-for="cert in certList">
        {{cert.name}}
      </li>
    </ul>

  </div>
</template>

<script>

  let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  // let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.68:8545"));
  // let web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.53:4444"));
  let coinbase = web3.eth.coinbase;
  let ethAbi = web3.eth.abi;
  let balance = web3.eth.getBalance(coinbase);
  // console.log(ethAbi, web3);
  // console.log(coinbase);

  let abi=[
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
        },
      ],
      "name": "addCert",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCert",
      "outputs": [
        {
          "name": "",
          "type": "Cert"
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
          "name": "_msg",
          "type": "string"
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
          "name": "_msg",
          "type": "string"
        }
      ],
      "name": "getCertBindByInviter",
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
      "name": "getCertBindByInvited",
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
    }
  ];
  let contractAddress = "0xf7238b0fc74519b7685a770007e294b0dfc6da99";		// 合约地址
  let myContract = web3.eth.contract(abi);
  let myContractInstance = myContract.at(contractAddress);
  let options = {
    from: coinbase,
  };

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





  import Vue from 'vue';

  export default {
    name: 'CertList',
    data () {
      return {
        certList: [],
        certName: 'aaaaa',
        certMeaning: 'aaaaaa',
        certId: 1,
      }
    },
    http: { headers: {'Content-Type': 'application/x-www-form-urlencoded'} },
    methods: {
      getCertList: function() {
        Vue.http.get('http://127.0.0.1:3000/getCertList')
          .then((resp) => {
            console.log(resp.data);
            this.certList = resp.data;
          },(err) => {
            console.log(err);
          })
      },
      addCertCont: function() {
        console.log(this.certName, this.certMeaning);
        let data = {
          certName: this.certName,
          certMeaning: this.certMeaning,
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
          myContractInstance.addCert([data.certName, data.certMeaning], options, function(error,result) {
            console.log(error,result);
          });
        })
      },
      getCertCont: function() {
        let data = {
          certId: this.certId,
        };
        // Vue.http.get('http://127.0.0.1:3000/getCert', data)
        //   .then((resp) => {
        //     console.log(resp.data);
        //     this.certList = resp.data;
        //   },(err) => {
        //     console.log(err);
        //   })
      },
      getPastLogs: function() {
        Vue.http.get('http://127.0.0.1:3000/getPastLogs')
          .then((resp) => {
            console.log(resp.data);
          },(err) => {
            console.log(err);
          })
      }
    },
    created: function() {
      this.getCertList();
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
  ul, li {

  }
  button {
    padding: 5px 10px;
    margin: 0 5px;
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
</style>
