# @asakai/web

朝会ジェネレーターのブラウザ版（Vercel デプロイ対象）。

## ローカル開発

```bash
# 初回のみ（モノレポルートで）
npm install

# 開発サーバ
npm run dev -w @asakai/web
# → http://localhost:5173

# 本番ビルド
npm run build -w @asakai/web
# → packages/web/dist
```

## Vercel デプロイ

### 1. プロジェクト作成

Vercel ダッシュボードで「Add New → Project」からこのリポジトリを Import。

### 2. プロジェクト設定

- **Root Directory**: `packages/web`
- **Framework Preset**: Other（自動判定）
- **Build/Install Command**: `vercel.json` に既に設定済み（モノレポルートで `npm install` → `npm run build -w @asakai/web` を実行）
- **Output Directory**: `dist`

### 3. 環境変数（任意：AI 機能を有効化する場合）

| Key                 | Value                |
| ------------------- | -------------------- |
| `ANTHROPIC_API_KEY` | あなたの API キー    |

未設定でもアプリは動きますが、AIヒント／AI議事録／AIアイスブレイクは無効化されます。

### 4. デプロイ

`main` または接続したブランチへ push すると自動デプロイされます。CLI からは `vercel` コマンドでも可。

## API ルート（Vercel Functions）

| Route                  | 用途                               |
| ---------------------- | ---------------------------------- |
| `GET  /api/check`      | `ANTHROPIC_API_KEY` の有無を返す   |
| `POST /api/icebreaker` | アイスブレイクのお題を生成         |
| `POST /api/facilitator`| アジェンダ項目に対する問いかけ提案 |
| `POST /api/meeting-notes` | 朝会メモから議事録を生成         |
