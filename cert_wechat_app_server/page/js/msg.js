/* region no from node */
function setMsg() {
    let options = {
        from: coinbase,
    };
	let msgValue = msg.value;
	unlockAccount().then(function(data) {
		certContract.setMsg(msgValue, options, function(error,result) {
			console.log(error,result);
		});
	});
}

function getMsg() {
	let result = certContract.getMsg();
	console.log(result);
}


function setMsgArr() {
    let options = {
        from: coinbase,
    };
	let msgValue = msgArr.value;
	unlockAccount().then(function(data) {
		certContract.setMsgArr(msgValue, msgValue, options, function(error,result) {
			console.log(error,result);
		});
	});
}

function getMsgArr() {
    let result = certContract.getMsgArr(function (error,result) {
        console.log(error,result);
    });
}

function returnBool() {
    let result = certContract.returnBool(function (error,result) {
        console.log(error,result);
    });
}

function returnBoolArr() {
    let result = certContract.returnBoolArr(function (error,result) {
        console.log(error,result);
    });
}



/* region from node */
function setMsgNode() {
	let msgNodeValue = msgNode.value;
	$.ajax({
		type:"post",
		data: {
			str: msgNodeValue
        },
		url:"http://127.0.0.1:3000/setMessage",/*url写异域的请求地址*/
		success: function(data){
			console.log(data);
		},
		error: function(err){
            console.log(err);
        }
	});
}

function getMsgNode() {
	$.ajax({
		type:"get",
		url:"http://127.0.0.1:3000/getMessage",/*url写异域的请求地址*/
		success: function(data){
			console.log(data);
		}
	});
}

function getPastLogs() {
    $.ajax({
        type:"get",
        url:"http://127.0.0.1:3000/getPastLogs",/*url写异域的请求地址*/
        success: function(data){
            console.log(data);
        }
    });
}
