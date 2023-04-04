# 第1回のサンプルコード

## 環境立ち上げ

初回は npm パッケージのインストールをお願いします。

```shell
npm install
```

## サンプルコードの実行

### `npm run exec:parse`

`/src/parse.ts`が実行されます。

`safeParse`メソッドによるデータ検証に合格した場合の検証結果を表示するサンプルです。

### `npm run exec:trim-example`

`/src/trim-example.ts`が実行されます。

前後に空白を含む文字列データを、`trim`メソッドがどのように加工するのかを確かめるサンプルです。

### `npm run exec:error-format`

`/src/error-format.ts`が実行されます。

検証に合格しなかった場合に返されるエラーオブジェクトを、`format`メソッドで整形して表示するサンプルです。

### `npm run exec:error-flatten`

`/src/error-flatten.ts`が実行されます。

検証に合格しなかった場合に返されるエラーオブジェクトを、`flatten`メソッドで整形して表示するサンプルです。

### `npm run exec:error-issues`

`/src/error-issues.ts`が実行されます。

検証に合格しなかった場合に返されるエラーの詳細情報を、`issues`プロパティで取得し、表示するサンプルです。

### `npm run exec:error-issues-parse`

`/src/error-issues-parse.ts`が実行されます。

`issues`プロパティで取得したエラーの詳細情報を解析し、エラー発生箇所とエラーメッセージを一覧化するサンプルです。
