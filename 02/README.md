# 第2回のサンプルコード

## 環境立ち上げ

初回は npm パッケージのインストールをお願いします。

```shell
npm install
```

## サンプルコードの実行

### `npm run exec:horizontal-image`

`/src/horizontal-image.ts`が実行されます。

`/data/images.json`内のそれぞれの画像データにおいて、`width`が`height`よりも大きいかどうかをrefineメソッドを使って検証し、独自のエラー情報を出力するサンプルです。

### `npm run exec:refine-dynamic-message`

`/src/refine-dynamic-message.ts`が実行されます。

refineメソッドを使って、「何文字足りないのか」「何文字超過しているのか」を計算してエラーメッセージで示すサンプルです。
