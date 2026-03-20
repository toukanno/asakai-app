# asakai-app

朝会ジェネレーター - Morning Meeting Generator

## 構成

モノレポ構成（npm workspaces）で、デスクトップ版とモバイル版を管理しています。

```
packages/
├── shared/    # 共有データ・ロジック（hooks, types, data）
├── desktop/   # Electron デスクトップアプリ（Windows / Mac / Linux）
└── mobile/    # React Native モバイルアプリ（iOS）
```

## セットアップ

```bash
npm install
```

## デスクトップアプリ（Electron）

```bash
# 開発
npm run dev -w @asakai/desktop

# ビルド
npm run build -w @asakai/desktop
```

## モバイルアプリ（React Native）

```bash
# iOS
cd packages/mobile
npx pod-install
npx react-native run-ios
```
