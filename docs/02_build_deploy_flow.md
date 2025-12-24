# ビルド・デプロイ手順（Build & Deploy Flow）

## ローカル開発

### 1. 初回セットアップ

```bash
cd 2026_HP
npm install
```

### 2. 開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開く

### 3. ローカル環境変数設定

`.dev.vars` を作成（.gitignoreに含まれる）：

```
TO_EMAIL=your-email@example.com
RESEND_API_KEY=re_xxxxx
```

### 4. ビルド確認

```bash
npm run build
```

`dist/` に出力される

### 5. Cloudflare環境でのローカルプレビュー

```bash
npm run preview
```

Pages Functionsも含めて動作確認できる

---

## Cloudflare Pagesへのデプロイ

### 人間がやる手順

#### Step 1: GitHubリポジトリ作成

```bash
# 2026_HPディレクトリで
git init
git add .
git commit -m "Initial commit"

# GitHubリポジトリに接続
git remote add origin https://github.com/so-maejima-biz/mast11_HP.git
git branch -M main
git push -u origin main
```

#### Step 2: Cloudflare Pages プロジェクト作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 左メニュー「コンピューティング と AI」→「Workers & Pages」をクリック
   （※UIが変更されている場合は「ビルド」セクション内を探す）
3. 「Create」→「Pages」→「Connect to Git」
4. GitHubアカウントを連携
5. リポジトリ「mast11_HP」を選択

#### Step 3: ビルド設定

| 設定項目 | 値 |
|---------|-----|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/`（デフォルト） |

「Save and Deploy」をクリック

#### Step 4: 環境変数設定

1. プロジェクト詳細画面 → 「Settings」タブ
2. 「Environment variables」セクション
3. 以下を追加：

| 変数名 | 値 | 環境 |
|--------|-----|------|
| `TO_EMAIL` | 通知先メールアドレス | Production |
| `RESEND_API_KEY` | ResendのAPIキー | Production |

4. 「Save」をクリック
5. 再デプロイ（Deployments → 最新 → Retry deployment）

#### Step 5: カスタムドメイン設定

1. 「Custom domains」タブ
2. 「Set up a custom domain」
3. `www.mast11.com` を入力
4. DNS設定の指示に従う

**DNS設定パターン（Cloudflare DNS使用時）**：

| Type | Name | Content |
|------|------|---------|
| CNAME | www | mast11-hp.pages.dev |

**wwwを正とする場合**：
- Cloudflare側でwwwなしからwwwへのリダイレクトルールを設定

#### Step 6: 公開後チェック

- [ ] https://www.mast11.com/ にアクセスできる
- [ ] TOPページが正しく表示される
- [ ] モバイルで表示確認
- [ ] お問い合わせフォーム送信テスト
- [ ] メール通知が届く

---

## CI/CD フロー

```
[GitHub push]
      │
      ▼
[Cloudflare Pages 自動検知]
      │
      ▼
[npm install]
      │
      ▼
[npm run build]
      │
      ▼
[dist/ + functions/ をデプロイ]
      │
      ▼
[プレビューURL発行（PRの場合）]
[本番反映（mainブランチの場合）]
```

## トラブルシューティング

### ビルドが失敗する

1. ローカルで `npm run build` を実行し、エラーを確認
2. Node.jsバージョンを確認（Cloudflareデフォルトは18）
3. 依存関係の問題なら `rm -rf node_modules && npm install`

### フォームが動作しない

1. 環境変数が設定されているか確認
2. Cloudflareダッシュボード → Functions → ログを確認
3. ローカルで `npm run preview` してテスト

### ドメインが反映されない

1. DNSの伝播を待つ（最大48時間）
2. Cloudflare DNSなら数分で反映
3. キャッシュをクリアしてブラウザ確認
