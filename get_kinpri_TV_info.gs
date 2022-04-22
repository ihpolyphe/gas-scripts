  

function scraping(target_url) {
  // optionsを設定
  var options = {
    url: target_url,
    renderType: "HTML",
    outputAsJson: true
  };
  var pay_load = encodeURIComponent(JSON.stringify(options));
  // API_KEYの呼び出し
  const API_KEY = PropertiesService.getScriptProperties().getProperty("PhantomJsCloud");
  // リクエストを行うURLを設定
  var api_url = "https://phantomjscloud.com/api/browser/v2/"+ API_KEY +"/?request=" + pay_load;
  // 結果を取得
  var response = UrlFetchApp.fetch(api_url).getContentText();
  // JSONデータをパースして、欲しいデータを取得
  var data = JSON.parse(response)["content"]["data"];

  return data;
}

function getKinpuriInfo() {
  var getUrl = "https://tv.yahoo.co.jp/search?q=%EF%BC%AB%EF%BD%89%EF%BD%8E%EF%BD%87%E3%80%80%EF%BC%86%E3%80%80%EF%BC%B0%EF%BD%92%EF%BD%89%EF%BD%8E%EF%BD%83%EF%BD%85"

  // 結果を取得し、確認してみる
  var html = scraping(getUrl);

  // Parserライブラリと正規表現を使って、ほしい情報を取得
  var multi_info = Parser.data(html).from('<li class="programListItem">').to('/li>').iterate();
  //曜日を取得
  var ary = ["日", "月", "火", "水", "木", "金", "土"];
  var week_num = new Date().getDay();
  var week = ary[week_num];
  Logger.log(week);
  
  for(var index in multi_info){
    var span_date = Parser.data(multi_info[index]).from('<span class="scheduleTextWeek">').to('</span>').build();
    if(span_date == ary[week_num] || span_date == ary[week_num + 1 ] || span_date == ary[week_num + 2]  || span_date == ary[week_num + 3] || span_date == ary[week_num + 4]){
      var info_title = Parser.data(multi_info[index]).from('<a class="programListItemTitleLink" data-tracking="{&quot;slk&quot;:&quot;prg_ttl&quot;}').to('/a>').build();
      var extractInfoTitle = info_title.slice(28,-1);
      //Logger.log(info_title);
      Logger.log(extractInfoTitle);
      
      var info_date = Parser.data(multi_info[index]).from('<time class="scheduleText" datetime=').to('>').build();
      //Logger.log(info_title);
      Logger.log(span_date);
      var message = `
番組名:${extractInfoTitle}
放送時間:${info_date}`
      sendToLINE_MA(message);
      //sendToLINE(message);
    }
  }
}







