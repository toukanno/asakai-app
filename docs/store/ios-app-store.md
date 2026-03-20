# iOS App Store 提出資料

## アプリ情報

| 項目 | 内容 |
|------|------|
| アプリ名 | 朝会ジェネレーター |
| サブタイトル | チームの朝会をスムーズに |
| Bundle ID | com.toukanno.asakai |
| バージョン | 1.0.0 |
| カテゴリ（プライマリ） | ビジネス |
| カテゴリ（セカンダリ） | 仕事効率化 |
| 対応OS | iOS 15.0 以降 |
| 対応デバイス | iPhone, iPad |
| 言語 | 日本語, 英語 |
| 価格 | 無料 |
| コンテンツレーティング | 4+ |

---

## App Store Connect 掲載文（日本語）

### アプリ名

朝会ジェネレーター

### サブタイトル

チームの朝会をスムーズに

### プロモーションテキスト（170文字以内）

朝会・デイリースタンドアップを効率化！アジェンダタイマー、アイスブレイクお題、発表順シャッフルの3機能で、チームミーティングをもっとスムーズに、もっと楽しく。

### 説明文（4000文字以内）

「朝会ジェネレーター」は、チームのデイリーミーティング（朝会・スタンドアップ）を効率的に運営するためのアプリです。

■ アジェンダタイマー
朝会の標準的な議題（体調チェック、アイスブレイク、振り返り、タスク共有、相談、連絡事項）を自動管理。議題ごとにカウントダウンタイマーが動き、時間超過を防ぎます。
- 一時停止/再開
- スキップ
- リセット
- 残り30秒で警告表示
- 合計所要時間の自動計算（約23分）

■ アイスブレイク
「最近ハマっていることは？」「無人島に1つだけ持っていくなら？」など、20種類以上のお題からランダムに生成。シャッフルアニメーションでチームの雰囲気を盛り上げます。

■ 発表順シャッフル
メンバー名を入力するだけで、公平なランダム順を決定。Fisher-Yatesアルゴリズムによる偏りのないシャッフルです。

■ こんな方におすすめ
- リモートワークで朝会を実施しているチーム
- スクラムのデイリースタンドアップを実践している方
- 朝会がダラダラ長引いてしまう方
- チームのコミュニケーションを活性化したい方

■ 特徴
- 完全オフライン動作（インターネット接続不要）
- ダークテーマで目に優しいUI
- シンプルで直感的な操作
- 個人情報の収集なし

### キーワード（100文字以内、カンマ区切り）

朝会,デイリー,スタンドアップ,タイマー,アジェンダ,ミーティング,アイスブレイク,シャッフル,スクラム,チーム

### 新機能（What's New）

v1.0.0 初回リリース
- アジェンダタイマー（6つの標準議題、一時停止/再開/スキップ対応）
- アイスブレイクお題生成（20種類以上）
- 発表順シャッフル（Fisher-Yatesアルゴリズム）
- ダークテーマUI

---

## App Store Connect 掲載文（英語）

### App Name

Asakai - Morning Meeting Timer

### Subtitle

Run smooth daily standups

### Promotional Text

Streamline your daily standups! Agenda timer, icebreaker prompts, and speaker order shuffle — make team meetings smoother and more fun.

### Description

Asakai Generator helps your team run efficient daily standups and morning meetings with three key features.

AGENDA TIMER
Manage standard meeting items (health check, icebreaker, review, task sharing, Q&A, announcements) with automatic countdown timers for each item.
- Pause/resume
- Skip items
- Reset meeting
- 30-second warning alert
- Auto-calculated total time (~23 min)

ICEBREAKER
Generate random fun prompts from 20+ topics like "What's your recent hobby?" or "If you could time travel, where would you go?" Shuffle animation adds excitement.

SPEAKER ORDER SHUFFLE
Enter team member names and get a fair random speaking order using the Fisher-Yates algorithm.

GREAT FOR:
- Remote teams running daily standups
- Scrum teams practicing daily scrums
- Teams looking to reduce meeting overrun
- Anyone wanting fun icebreakers

FEATURES:
- Works completely offline
- Dark theme UI
- Simple, intuitive interface
- No personal data collection

### Keywords

standup,daily,timer,agenda,meeting,icebreaker,shuffle,scrum,team,morning

### What's New

v1.0.0 Initial Release
- Agenda timer with 6 standard items, pause/resume/skip
- Icebreaker generator with 20+ prompts
- Speaker order shuffle with Fisher-Yates algorithm
- Dark theme UI

---

## 必要なスクリーンショット

### iPhone 6.7" (必須: iPhone 15 Pro Max 等)

| No. | 内容 | サイズ |
|-----|------|--------|
| 1 | アジェンダ一覧（メイン画面） | 1290×2796 |
| 2 | タイマー動作中 | 1290×2796 |
| 3 | アイスブレイクお題表示 | 1290×2796 |
| 4 | シャッフル結果表示 | 1290×2796 |

### iPhone 6.5" (必須: iPhone 11 Pro Max 等)

| No. | 内容 | サイズ |
|-----|------|--------|
| 1〜4 | 上記と同じ内容 | 1242×2688 |

### iPad 12.9" (iPad 対応する場合)

| No. | 内容 | サイズ |
|-----|------|--------|
| 1〜4 | 上記と同じ内容 | 2048×2732 |

### アプリアイコン

| アセット | サイズ | 用途 |
|---------|--------|------|
| AppIcon.png | 1024×1024 | App Store 掲載用 |

---

## App Store Connect 設定

### アカウント準備

1. **Apple Developer Program** に登録（年間 $99 / ¥12,980）
   - https://developer.apple.com/programs/
2. **App Store Connect** でアプリを作成
   - https://appstoreconnect.apple.com
3. **Bundle ID** を登録: `com.toukanno.asakai`

### Xcode 署名設定

```
1. Xcode で packages/mobile/ios/AsakaiMobile.xcworkspace を開く
2. プロジェクト設定 → Signing & Capabilities
3. Team: 自分の Apple Developer アカウントを選択
4. Bundle Identifier: com.toukanno.asakai に変更
5. Automatically manage signing: ON
```

### TestFlight 配信手順

```bash
# 1. Archive 作成
cd packages/mobile/ios
xcodebuild -workspace AsakaiMobile.xcworkspace \
  -scheme AsakaiMobile \
  -configuration Release \
  -archivePath build/AsakaiMobile.xcarchive \
  archive

# 2. IPA エクスポート
xcodebuild -exportArchive \
  -archivePath build/AsakaiMobile.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ipa

# 3. App Store Connect にアップロード
xcrun altool --upload-app \
  -f build/ipa/AsakaiMobile.ipa \
  -t ios \
  -u "your-apple-id@example.com" \
  -p "@keychain:AC_PASSWORD"
```

### ExportOptions.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>
```

### 審査のポイント

- **プライバシーポリシー**: 必須（URL が必要）
- **年齢レーティング**: 4+（暴力なし、購入なし）
- **App Tracking Transparency**: 不要（トラッキングなし）
- **データ収集**: 「データを収集しない」を選択
- **審査期間**: 通常 24〜48 時間

---

## プライバシーポリシー（掲載用）

### 日本語

朝会ジェネレーターは、ユーザーの個人情報を一切収集・送信しません。
すべてのデータはお使いのデバイス上でのみ処理され、外部サーバーへの通信は行いません。
入力されたメンバー名はアプリ終了時に破棄され、保存されません。
本アプリはトラッキングを行わず、広告も表示しません。

### English

Asakai Generator does not collect, store, or transmit any personal information.
All data is processed locally on your device with no external server communication.
Member names entered in the app are discarded when the app is closed and are not persisted.
This app does not track users and does not display advertisements.

---

## App Store データプライバシー設定

App Store Connect の「App Privacy」セクション:

| 質問 | 回答 |
|------|------|
| Do you collect data from this app? | **No** |
| Does this app use third-party analytics? | **No** |
| Does this app use advertising? | **No** |
| Does this app use tracking? | **No** |

---

## サポート情報

| 項目 | 内容 |
|------|------|
| サポートURL | https://github.com/toukanno/asakai-app/issues |
| マーケティングURL | https://github.com/toukanno/asakai-app |
| プライバシーポリシーURL | （GitHub Pages に掲載） |
