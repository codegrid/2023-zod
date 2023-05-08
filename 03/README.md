# 第3回のサンプルコード

## 環境立ち上げ

初回は npm パッケージのインストールをお願いします。

```shell
npm install
```

## サンプルコードの実行

### `npm run exec:union-error-issues`

`/src/union-error-issues.ts`が実行されます。

特定のプロパティの値によって構造が切り替わるデータを`z.union`で表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`issues`プロパティで取得し、表示します。

### `npm run exec:union-error-format`

`/src/union-error-format.ts`が実行されます。

特定のプロパティの値によって構造が切り替わるデータを`z.union`で表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`format`メソッドで整形し、表示します。

### `npm run exec:union-error-flatten`

`/src/union-error-flatten.ts`が実行されます。

特定のプロパティの値によって構造が切り替わるデータを`z.union`で表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`flatten`メソッドで整形し、表示します。

### `npm run exec:union-error-map`

`/src/union-error-map.ts`が実行されます。

`z.union`が返すエラーメッセージを、エラーマップの仕組みを用いてカスタマイズするサンプルです。

検証に合格しなかった場合に返されるエラー情報を`flatten`メソッドで整形し、表示します。

### `npm run exec:discriminated-union-error-issues`

`/src/discriminated-union-error-issues.ts`が実行されます。

特定のプロパティの値によって構造が切り替わるデータを`z.discriminatedUnion`で表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`issues`プロパティで取得し、表示します。

### `npm run exec:same-type-patterns-union`

`/src/same-type-patterns-union.ts`が実行されます。

文字列同士のOR条件を`z.union`で表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`issues`プロパティで取得し、表示します。

### `npm run exec:same-type-patterns-refine`

`/src/same-type-patterns-refine.ts`が実行されます。

文字列同士のOR条件を`refine`メソッドで表現した場合のサンプルです。

検証に合格しなかった場合に返されるエラー情報を`issues`プロパティで取得し、表示します。
