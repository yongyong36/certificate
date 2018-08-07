let WXBizDataCrypt = require('../lib/WXBizDataCrypt');

function getAppId(appId, sessionKey, encryptedData, iv) {
    let pc = new WXBizDataCrypt(appId, sessionKey);
    let data = pc.decryptData(encryptedData , iv);
    console.log('WXBizDataCrypt data', data);
    return data;
}

module.exports = getAppId;