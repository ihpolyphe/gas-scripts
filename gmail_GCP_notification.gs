var FindSubject = 'subject:(予算の)';
var FindSubject10 = '予算の 10% に達しました';
var FindSubject50 = '予算の 50% に達しました';
 
function getMail(){
 
  //指定した件名のスレッドを検索して取得 
  var myThreads = GmailApp.search(FindSubject, 0, 10); 
  //スレッドからメールを取得し二次元配列に格納
  var myMessages = GmailApp.getMessagesForThreads(myThreads);

 
  for(var i in myMessages){
    for(var j in myMessages[i]){
 
      //スターがないメッセージのみ処理   
      if(!myMessages[i][j].isStarred()){ 
        let strSubject = myMessages[i][j].getSubject();
        Logger.log(strSubject);

        if(strSubject == FindSubject10){
          var c_subject = `予算の10％ に達しました`
          sendToLINE(c_subject);
        }
        else if(strSubject == FindSubject50){
          var c_subject = `予算の50％ に達しました`
          sendToLINE(c_subject);
        }
        //処理済みのメッセージをスターをつける
        myMessages[i][j].star(); 
      }
    }
  }
}