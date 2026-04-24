# asakai-app

朝会ジェネレーター - Morning Meeting Generator

## 構成

Turborepo + npm workspaces のモノレポ構成。

```
packages/
├── shared/    # 共有データ・ロジック（hooks, types, data）
├── desktop/   # Electron デスクトップアプリ（Windows / Mac / Linux）
├── mobile/    # React Native モバイルアプリ（iOS / Android）
└── web/       # ブラウザ版（Vite SPA + Vercel Functions）
```

## セットアップ

```bash
npm install
```

## コマンド

```bash
# 全パッケージの型チェック
npm run typecheck

# デスクトップ開発
npm run dev -w @asakai/desktop

# デスクトップビルド
npm run build -w @asakai/desktop

# ブラウザ版開発（http://localhost:5173）
npm run dev -w @asakai/web

# ブラウザ版ビルド（packages/web/dist）
npm run build -w @asakai/web
```

## ブラウザ版（Vercel デプロイ）

`packages/web` をルートディレクトリとして Vercel に Import するだけでデプロイできます。詳細は [`packages/web/README.md`](./packages/web/README.md) 参照。AI 機能を使うには `ANTHROPIC_API_KEY` を Vercel の Environment Variables に設定してください。

## モバイル（React Native）

```bash
# iOS（要 macOS + Xcode）
cd packages/mobile
npx pod-install
npx react-native run-ios

# Android
npx react-native run-android
```

## CI

GitHub Actions で push / PR 時に自動実行:
- TypeScript 型チェック（全パッケージ）
- Desktop ビルド（Windows / Mac）
- iOS ビルド（シミュレーター）
