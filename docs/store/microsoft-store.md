# Microsoft Store 提出資料

## アプリ情報

| 項目 | 内容 |
|------|------|
| アプリ名 | 朝会ジェネレーター |
| アプリ名（英語） | Asakai Generator - Morning Meeting Tool |
| パッケージID | toukanno.AsakaiGenerator |
| バージョン | 1.0.0 |
| カテゴリ | ビジネス > プロジェクト管理 |
| 対応OS | Windows 10 (1607) 以降 |
| アーキテクチャ | x64, arm64 |
| 言語 | 日本語, 英語 |
| 価格 | 無料 |

---

## ストア掲載文（日本語）

### アプリ名

朝会ジェネレーター

### 短い説明（Short Description）

チームの朝会（デイリーミーティング）をスムーズに進めるためのタイマー＆アジェンダ管理ツール

### 詳細説明（Description）

「朝会ジェネレーター」は、チームのデイリーミーティング（朝会）を効率的に運営するためのデスクトップアプリです。

**主な機能:**

📋 アジェンダタイマー
- 体調チェック、アイスブレイク、振り返り、タスク共有など、朝会の標準的な議題を自動管理
- 議題ごとのタイマーで時間超過を防止
- 一時停止・スキップ・リセット対応
- 残り30秒で警告表示

🧊 アイスブレイク
- 20種類以上のお題からランダム生成
- シャッフルアニメーションで盛り上がる

🔀 発表順シャッフル
- メンバー名を入力するだけで、ランダムな発表順を決定
- Fisher-Yates アルゴリズムによる公平なシャッフル

**こんな方におすすめ:**
- リモートワークでの朝会を効率化したい方
- 朝会がダラダラ長引いてしまう方
- チームのコミュニケーションを活性化したい方
- スクラムのデイリースタンドアップを実践している方

**特徴:**
- 軽量・高速起動
- インターネット接続不要（完全オフライン動作）
- ダークテーマで目に優しいUI
- 合計所要時間の自動計算

### 新機能（What's New）

v1.0.0 初回リリース
- アジェンダタイマー機能
- アイスブレイクお題生成機能
- 発表順シャッフル機能
- 一時停止/再開コントロール
- タイマーリセットバグ修正

---

## ストア掲載文（英語）

### App Name

Asakai Generator - Morning Meeting Tool

### Short Description

A timer and agenda management tool to run smooth daily standups and morning meetings.

### Description

Asakai Generator helps your team run efficient daily standups and morning meetings.

**Key Features:**

📋 Agenda Timer
- Pre-configured agenda items: health check, icebreaker, review, task sharing, Q&A, announcements
- Per-item countdown timer to keep meetings on track
- Pause, skip, and reset controls
- 30-second warning with visual alert

🧊 Icebreaker
- Random topic generator with 20+ fun prompts
- Shuffle animation for team engagement

🔀 Speaker Order Shuffle
- Enter team member names and get a randomized speaking order
- Fair shuffle using Fisher-Yates algorithm

**Perfect for:**
- Remote teams running daily standups
- Scrum teams practicing daily scrums
- Teams looking to improve meeting efficiency
- Anyone who wants to add fun icebreakers to meetings

**Features:**
- Lightweight and fast startup
- Works completely offline
- Dark theme UI
- Automatic total time calculation

### What's New

v1.0.0 Initial Release
- Agenda timer with per-item countdown
- Icebreaker topic generator
- Speaker order shuffle
- Pause/resume controls

---

## 必要な画像アセット

### ストアロゴ / アイコン

| アセット | サイズ | 用途 |
|---------|--------|------|
| StoreLogo.png | 50×50 | パッケージ内ロゴ |
| Square44x44Logo.png | 44×44 | タスクバーアイコン |
| Square150x150Logo.png | 150×150 | スタートメニュータイル |
| Wide310x150Logo.png | 310×150 | ワイドタイル |
| Square310x310Logo.png | 310×310 | ラージタイル |
| SplashScreen.png | 620×300 | スプラッシュスクリーン |

### ストアスクリーンショット（必須: 最低1枚、推奨4枚）

| No. | 内容 | サイズ |
|-----|------|--------|
| 1 | アジェンダ一覧画面（メイン画面） | 1366×768 以上 |
| 2 | タイマー動作中の画面 | 1366×768 以上 |
| 3 | アイスブレイクお題表示画面 | 1366×768 以上 |
| 4 | シャッフル結果表示画面 | 1366×768 以上 |

---

## Partner Center 設定

### 必須アカウント設定

1. **Microsoft Partner Center** にサインアップ（$19 一回限り）
   - https://partner.microsoft.com/dashboard
2. **アプリ名を予約**: 「朝会ジェネレーター」
3. **Identity Name を取得**: Partner Center が自動生成する `identityName` を `package.json` の `appx.identityName` に反映

### パッケージ提出手順

```bash
# 1. MSIX パッケージ生成
cd packages/desktop
npm run build:msix

# 2. 生成物を確認
ls release/*.appx

# 3. Partner Center にアップロード
# - https://partner.microsoft.com/dashboard にログイン
# - アプリ → 新しいアプリ → パッケージをアップロード
# - .appx ファイルをドラッグ＆ドロップ
```

### 審査のポイント

- **プライバシーポリシー**: データ収集なし（完全オフライン）→ 簡易版で OK
- **年齢区分**: 全年齢
- **暗号化**: なし（ITAR/EAR 対象外）
- **アクセシビリティ**: 基本的なキーボード操作対応
- **審査期間**: 通常 1〜3 営業日

---

## プライバシーポリシー（掲載用）

### 日本語

朝会ジェネレーターは、ユーザーの個人情報を一切収集・送信しません。
すべてのデータはお使いのデバイス上でのみ処理され、外部サーバーへの通信は行いません。
入力されたメンバー名はアプリ終了時に破棄され、保存されません。

### English

Asakai Generator does not collect, store, or transmit any personal information.
All data is processed locally on your device with no external server communication.
Member names entered in the app are discarded when the app is closed and are not persisted.

---

## サポート情報

| 項目 | 内容 |
|------|------|
| サポートURL | https://github.com/toukanno/asakai-app/issues |
| プライバシーポリシーURL | （GitHub Pages or README に掲載） |
| 開発者メール | （Partner Center 登録時に設定） |
