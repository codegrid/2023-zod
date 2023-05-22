# 第4回のサンプルコード

## 環境立ち上げ

初回は npm パッケージのインストールをお願いします。

```shell
npm install
```

## サンプルコードの実行

### `npm run exec:transform`

`/src/transform.ts`が実行されます。

transformメソッドを使ったサンプルです。

Twitter IDを検証するスキーマで、値の先頭に`@`がついていたら、`@`を削除します。

### `npm run exec:transform-pipe`

`/src/transform-pipe.ts`が実行されます。

transformメソッド呼び出し後、pipeメソッド経由でさらなる検証を行うサンプルです。

郵便番号を検証するスキーマで、ハイフンを削除した上で、7文字であることを検証します。

### `npm run exec:transform-refine`

`/src/transform-refine.ts`が実行されます。

transformメソッド呼び出し後、refineメソッドでさらなる検証を行うサンプルです。

郵便番号を検証するスキーマで、ハイフンを削除した上で、7桁の数値であることを検証します。

### `npm run exec:coerce-number`

`/src/coerce-number.ts`が実行されます。

coerceオプションを使ってZodNumberスキーマを定義し、さまざまな値を渡したときにどのような数値に変換されるのか（もしくは、どのような場合に検証失敗となるのか）を確認するサンプルです。

### `npm run exec:coerce-string`

`/src/coerce-string.ts`が実行されます。

coerceオプションを使ってZodStringスキーマを定義し、さまざまな値を渡したときにどのような文字列に変換されるのかを確認するサンプルです。

### `npm run exec:coerce-boolean`

`/src/coerce-boolean.ts`が実行されます。

coerceオプションを使ってZodBooleanスキーマを定義し、さまざまな値を渡したときにどのような真偽値に変換されるのかを確認するサンプルです。

### `npm run coerce-date`

`/src/coerce-date.ts`が実行されます。

coerceオプションを使ってZodDateスキーマを定義し、さまざまな値を渡したときにどのような日付に変換されるのかを確認するサンプルです。

### `npm run exec:tree`

`/src/tree.ts`が実行されます。

z.lazyメソッドを使って、再帰的なオブジェクトのスキーマを定義し、実際に検証を行うサンプルです。

### `npm run exec:tree-effect`

`/src/tree-effect.ts`が実行されます。

z.lazyメソッドを使って、再帰的なオブジェクトのスキーマを定義し、実際に検証を行うサンプルです。

このサンプルでは、transformメソッドを使用し、入力値の型と検証後のデータの型の違いを考慮した実装の例を示しています。
