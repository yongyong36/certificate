let WXBizDataCrypt = require('../lib/WXBizDataCrypt');

let appId = "wx0e88c5996198a2f4";

function getAppId(sessionKey, encryptedData, iv) {
    let pc = new WXBizDataCrypt(appId, sessionKey);
    let data = pc.decryptData(encryptedData , iv);
    return data;
}

module.exports = getAppId;