const sendToLINE=(message)=>{
  var token = PropertiesService.getScriptProperties().getProperty("LINE_token");
  const options = {
    "method": "post",
    "payload": `message=${message}`,
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
};

const sendToLINE_MA=(message)=>{
  var token = PropertiesService.getScriptProperties().getProperty("LINE_token_for_MA");
  const options = {
    "method": "post",
    "payload": `message=${message}`,
    "headers": {
      "Authorization": `Bearer ${token}`
    }
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
};
