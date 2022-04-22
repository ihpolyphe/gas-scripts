const main=()=>{
  //気象庁からデータを取得
  const forecastData=getForecastData();
  let message="initialize";

  //降水確率がない場合は終了→ここは後々変えたい
  if(forecastData[2] == null){
    message = `降水確率を取得できませんでした。`;
  }
  //通知メッセージ
  const time = forecastData[1].substr(0,2);
  const timeZome = `${time}-${parseInt(time,10) + 6}`;    
  //降水確率50%未満通知
  const chanceOfRain = 50;
  if(parseInt(forecastData[2],10) < chanceOfRain){
    message = `${forecastData[0]}日${timeZome}時の降水確率は${forecastData[2]}％です。傘なしでも大丈夫でしょう。`;
  }
  else{
    message = `${forecastData[0]}日${timeZome}時の降水確率は${forecastData[2]}％です。傘を持ち歩きましょう。おとなしくおうちで過ごしましょう`;
  
  }
  sendToLINE(message);
};

const test=(forecastData)=>{
  return `${forecastData}の降水確率`;

}

const getForecastData=()=>{
  //気象庁からデータを取得
  const url= "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json";
  const response=UrlFetchApp.fetch(url);
  const data=JSON.parse(response);

  // check JSON file
  Logger.log(data);

  //降水確率が格納されている配列の添字を取得
  const AreaName = "西部";
  const AreaIndex = data[0].timeSeries[1].areas.findIndex(areas=>areas.area.name==AreaName);

  //ほしい時間の降水確率が格納されている配列の添字を取得
  const today = Utilities.formatDate(new Date(), "JST","yyyy-MM-dd");
  const time = "12:00";
  const searchElement = today + "T" + time + ":00+09:00";
  const popsIndex = data[0].timeSeries[1].timeDefines.indexOf(searchElement);

  //降水確率を取得
  const pops = data[0].timeSeries[1].areas[AreaIndex].pops[popsIndex];
  return [today, time, pops];
};




