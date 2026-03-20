# Mac App Store 提出資料

## アプリ情報

| 項目 | 内容 |
|------|------|
| アプリ名 | 朝会ジェネレーター |
| サブタイトル | チームの朝会をスムーズに |
| Bundle ID | com.toukanno.asakai.desktop |
| バージョン | 1.0.0 |
| カテゴリ（プライマリ） | ビジネス |
| カテゴリ（セカンダリ） | 仕事効率化 |
| 対応OS | macOS 12.0 以降 |
| アーキテクチャ | Universal (Intel + Apple Silicon) |
| 言語 | 日本語, 英語 |
| 価格 | 無料 |

---

## 掲載文

※ iOS App Store と同じ内容を使用（`ios-app-store.md` 参照）
Mac 固有の変更点のみ以下に記載。

### 説明文の差分（Mac 版追記）

デスクトップアプリならではの快適な操作性で、朝会の進行をサポートします。
- ウィンドウサイズの自由な調整
- ネイティブなmacOS体験
- メニューバーからの素早いアクセス

---

## Mac App Store 固有の対応

### Electron アプリの Mac App Store 対応

```bash
# 1. MAS 用ビルド
cd packages/desktop
npx electron-builder --mac mas

# 2. 署名とノタリゼーション（自動）
# electron-builder が entitlements を適用
```

### package.json への追加設定

```json
"mac": {
  "target": ["dmg", "mas"],
  "category": "public.app-category.business",
  "hardenedRuntime": true,
  "entitlements": "build/entitlements.mac.plist",
  "entitlementsInherit": "build/entitlements.mac.plist"
},
"mas": {
  "entitlements": "build/entitlements.mas.plist",
  "entitlementsInherit": "build/entitlements.mas.inherit.plist"
}
```

### Entitlements ファイル

#### build/entitlements.mas.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>com.toukanno.asakai.desktop</string>
    </array>
</dict>
</plist>
```

#### build/entitlements.mas.inherit.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
</dict>
</plist>
```

---

## スクリーンショット

| No. | 内容 | サイズ |
|-----|------|--------|
| 1 | アジェンダ一覧（メイン画面） | 2880×1800 |
| 2 | タイマー動作中 | 2880×1800 |
| 3 | アイスブレイクお題表示 | 2880×1800 |
| 4 | シャッフル結果表示 | 2880×1800 |

---

## 審査のポイント

- **Sandboxing**: Electron アプリは App Sandbox 対応が必須
- **Hardened Runtime**: macOS 10.14.5+ で必須
- **ノタリゼーション**: Apple Notarization が必須（electron-builder が自動対応）
- **プライバシーポリシー**: iOS 版と同じ URL を使用可能
- **審査期間**: 通常 24〜48 時間
