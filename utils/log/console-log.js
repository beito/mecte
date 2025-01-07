function log(text, jsonObj = null, stringify = false) {
    if(jsonObj && stringify){
        console.log(`${new Date().toLocaleString()}: ${text} ${JSON.stringify(jsonObj)}`);
    }else if(jsonObj){
        console.log(`${new Date().toLocaleString()}: ${text} ${jsonObj}`);
    }else{
        console.log(`${new Date().toLocaleString()}: ${text}`);
    }
}

module.exports = {
    log
};