const main_temperature=()=>{
  //気象庁からデータを取得
  const forecastData=getForecastTemperatureData();
  let message="initialize";

  
  //通知メッセージ
  const time = forecastData[1].substr(0,2);
  const timeZome = `${time}-${parseInt(time,10) + 6}`;    
  //気温の通知
  message = `${forecastData[0]}日9時-21時の気温は${forecastData[2]}度です。`;
  
  sendToLINE(message);
};

const getForecastTemperatureData=()=>{
  //気象庁からデータを取得
  const url= "https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json";
  const response=UrlFetchApp.fetch(url);
  const data=JSON.parse(response);
  // check JSON file
  Logger.log(data[0]);

  //気温が保存されているインデックス
  const AreaName = "名古屋";
  const AreaIndex = data[0].timeSeries[2].areas.findIndex(areas=>areas.area.name==AreaName);

  //ほしい時間の気温が格納されている配列の添字を取得（9時-21時）
  var date = new Date();
  date.setDate(date.getDate() + 1);  
  var tomorrow = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd');

  const time = "09:00";
  const searchElement = tomorrow + "T" + time + ":00+09:00";
  const tempsIndex = data[0].timeSeries[2].timeDefines.indexOf(searchElement);

  //降水確率を取得
  const temps = data[0].timeSeries[2].areas[AreaIndex].temps[tempsIndex];


  return [tomorrow, time, temps];
};






