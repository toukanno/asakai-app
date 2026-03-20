# ストア提出チェックリスト

## 共通（全プラットフォーム）

- [ ] プライバシーポリシーを GitHub Pages に公開
- [ ] サポート URL 確認: https://github.com/toukanno/asakai-app/issues
- [ ] アプリアイコン作成（1024×1024 マスターファイル）
- [ ] スクリーンショット撮影（各プラットフォーム）

---

## Microsoft Store

### アカウント準備
- [ ] Microsoft Partner Center 登録（$19）
- [ ] 開発者アカウントの本人確認完了
- [ ] アプリ名「朝会ジェネレーター」を予約

### ビルド
- [ ] `npm run build:msix -w @asakai/desktop` で MSIX 生成
- [ ] .appx ファイルの動作確認

### パッケージ設定
- [ ] Partner Center の Identity Name を package.json に反映
- [ ] Publisher を Partner Center の値に更新

### ストア情報入力
- [ ] アプリ名（日本語・英語）
- [ ] 説明文（日本語・英語）→ `microsoft-store.md` からコピー
- [ ] カテゴリ: ビジネス > プロジェクト管理
- [ ] 価格: 無料
- [ ] 年齢区分: 全年齢
- [ ] プライバシーポリシー URL
- [ ] スクリーンショット（最低1枚）

### 画像アセット
- [ ] StoreLogo.png (50×50)
- [ ] Square44x44Logo.png (44×44)
- [ ] Square150x150Logo.png (150×150)
- [ ] Wide310x150Logo.png (310×150)
- [ ] スクリーンショット 4枚 (1366×768以上)

### 提出
- [ ] .appx パッケージアップロード
- [ ] 全フィールド入力完了
- [ ] 「審査に提出」ボタンクリック
- [ ] 審査結果待ち（1〜3営業日）

---

## iOS App Store (TestFlight → App Store)

### アカウント準備
- [ ] Apple Developer Program 登録（$99/年）
- [ ] App Store Connect でアプリ作成
- [ ] Bundle ID 登録: com.toukanno.asakai

### Xcode 設定（Mac 必須）
- [ ] Xcode で AsakaiMobile.xcworkspace を開く
- [ ] Signing & Capabilities → Team 設定
- [ ] Bundle Identifier: com.toukanno.asakai
- [ ] Automatically manage signing: ON

### ビルド & 提出
- [ ] `pod install` 完了
- [ ] iOS シミュレーターで動作確認
- [ ] Product → Archive
- [ ] Organizer → Distribute App → App Store Connect
- [ ] App Store Connect でビルド確認

### TestFlight（内部テスト）
- [ ] App Store Connect → TestFlight → 内部テスト
- [ ] テスターを追加
- [ ] テストフライト配信開始
- [ ] テスターからフィードバック収集

### ストア情報入力
- [ ] アプリ名・サブタイトル
- [ ] 説明文（日本語・英語）→ `ios-app-store.md` からコピー
- [ ] キーワード
- [ ] カテゴリ: ビジネス
- [ ] 価格: 無料
- [ ] 年齢レーティング: 4+
- [ ] プライバシーポリシー URL
- [ ] App Privacy: 「データを収集しない」

### 画像アセット
- [ ] AppIcon 1024×1024
- [ ] iPhone 6.7" スクリーンショット 4枚 (1290×2796)
- [ ] iPhone 6.5" スクリーンショット 4枚 (1242×2688)
- [ ] iPad 12.9" スクリーンショット 4枚（任意）(2048×2732)

### 提出
- [ ] 「審査に提出」ボタンクリック
- [ ] 審査結果待ち（24〜48時間）

---

## Mac App Store（オプション）

### 追加設定
- [ ] Entitlements ファイル作成（`mac-app-store.md` 参照）
- [ ] App Sandbox 対応確認
- [ ] `electron-builder --mac mas` でビルド

### 提出
- [ ] App Store Connect でビルドアップロード
- [ ] ストア情報入力（iOS 版と共通可能）
- [ ] 審査に提出

---

## リリース後

- [ ] 各ストアでの公開確認
- [ ] GitHub Releases のリンク更新
- [ ] README にダウンロードリンク追加
- [ ] バグ報告の監視体制
