# 起動方法

`server`フォルダ直下に`.env`ファイルを作成する

```bash
touch .env
```

Geminiの`API_KEY`を取得

# 参考URL
[https://www.youtube.com/watch?v=glZ-wvB90qk](https://www.youtube.com/watch?v=glZ-wvB90qk)

HOST_URLはReactで`npm start`した際にアクセスするURL
下記のような形式で記入

```
API_KEY=*************
HOST_URL=http://localhost:3000
```

入力が完了したら`server`のディレクトリ直下で以下のコマンドを実行

```bash
node app.js
```
