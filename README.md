# gas-scripts

GASを使って必要な情報をLINEに通知することができるリポジトリ。

アジェンダは以下。

- GASの設定方法
- スクリプトプロパティの運用方法（LINEトークン）
- 各スクリプトの機能
- はまりどころ


## GASの設定方法

Google driveから設定する。[1分で出来るGoogle Apps Scriptの初期設定](https://for-dummies.net/gas-noobs/one-minute-explanation-of-initial-settings-for-gas/)を参考にする。

GASとGitHubの連携は[ここ](https://tonari-it.com/gas-github-assistant-create/)で設定する。

## スクリプトプロパティの運用方法（LINEトークン）

クラッシックエディタでは公開したくないライントークンなどを保管できたようだが、エディタが変更されることによって保管場所がなくなった。

エディタは新しいほうで運用したいので別scriptにライントークンを管理する。管理方法は以下。

```
//スクリプトプロパティを取得:LINE token 
PropertiesService.getScriptProperties().setProperty("LINE_token","token");
```

## 各スクリプトの機能と使い方

各スクリプトの機能は以下。gmail普段見ないので、重要な通知だけはLINEに転送するscriptを作成。

|script名|機能|
|---|---|
|[get_adobe_stock_notification_mail.gs]|adobe stockからのメールをLINEに転送|
|[get_kinpuri_TV_info.gs]|キンプリの出演情報をyahooテレビガイドから取得してLINEに通知|
|[gmail_GCP_nortification.gs]|GCPの使用量通知をLINEに転送|
|[ScriptPoperty]|LINEトークン管理|
|[sendToLINE.gs]|ライン通知メソッド|
|[weather_info_temperature]|愛知の気温通知|
|[weather_info_to_line.gs]|愛知の降水量通知|

## はまりどころ

1. 動的サイトのスクレイピング

PaserでスクレイピングしようとしてたけどParserでは静的な情報しか取得できない（HTML、CSSなど）。javascriptベースの動的な情報は"PhantomJsCloud"を取得する。使い方は以下を参照。
[GASとPhantomJsCloudで動的なWebページをスクレイピング(Javascriptページに対応)](https://auto-worker.com/blog/?p=1974)

2. Paserの使い方

勉強不足。sliceを使おう。以下参考サイト。

- [Parserを使ってスクレイピングを行う際のコツ（GASライブラリ）](https://rabbitfoot.xyz/gas-scraiping-with-parser/)

- [Google Apps Script(GAS)で文字列を切り出し・抽出(slice,substring,substr)の解説](https://auto-worker.com/blog/?p=594)

