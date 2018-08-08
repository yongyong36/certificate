let WXBizDataCrypt = require('../lib/WXBizDataCrypt');

function getSensitiveData(appId, sessionKey, encryptedData, iv) {
    console.log('WXBizDataCrypt getSensitiveData: appId: '+appId+';  ssKey: '+sessionKey+';  encryptedData: '+encryptedData+';  iv: '+iv);
    let pc = new WXBizDataCrypt(appId, sessionKey);
    let data = pc.decryptData(encryptedData , iv);
    console.log('WXBizDataCrypt data', data);
    return data;
}

module.exports = getSensitiveData;