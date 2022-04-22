var FindSubject = 'subject:(Adobe Stockに提出した)';
 
function get_adobe_stock_notification_Mail(){
 
  //指定した件名のスレッドを検索して取得 
  var threads = GmailApp.search(FindSubject, 0, 10); 
  //取得したスレッドに対してメッセージを定義し、処理を実行する
  threads.forEach(thread =>{
    const messages = thread.getMessages();
    messages.forEach(message => {
      //本文を取得
      let body = message.getPlainBody();
      //スターなければ内容をLINEに通知し、メッセージにスターをつける
      if(!message.isStarred()){ 
        sendToLINE(body);
        message.star();
      }
    });
  });
  
}
