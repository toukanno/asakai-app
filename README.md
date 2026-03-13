# 朝会ジェネレーター (Asakai Generator)

チームの朝会をサポートするiOSアプリです。

## 機能

- **ファシリテーター選出**: メンバーからランダムにファシリテーターを選出
- **話題ジェネレーター**: 4つのカテゴリ（アイスブレイク・仕事・楽しい話題・成長）からランダムに話題を生成
- **メンバー管理**: チームメンバーの追加・削除

## 技術スタック

- React Native (Expo)
- TypeScript
- AsyncStorage (データ永続化)
- React Navigation (タブナビゲーション)

## セットアップ

```bash
npm install
npx expo start --ios
```

## ビルド (iOS)

```bash
npx expo prebuild --platform ios
npx expo run:ios
```
