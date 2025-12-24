# MAST11 コーポレートサイト

MAST11のコーポレートサイト（Phase1：TOPページのみ）

**リポジトリ**: https://github.com/so-maejima-biz/mast11_HP

## 技術スタック

- **フレームワーク**: Astro
- **ホスティング**: Cloudflare Pages
- **フォーム処理**: Cloudflare Pages Functions
- **メール送信**: Resend（予定）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. ローカル開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:4321 を開く

### 3. ビルド

```bash
npm run build
```

`./dist/` に静的ファイルが出力される

### 4. ローカルプレビュー（Cloudflare環境）

```bash
npm run preview
```

## ディレクトリ構成

```
2026_HP/
├── CLAUDE.md           # Claude用運用ガイド
├── README.md           # このファイル
├── docs/               # ドキュメント一式
├── public/
│   ├── images/         # 画像
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── functions/
│   └── api/
│       └── contact.ts  # お問い合わせAPI
├── src/
│   ├── components/     # UIコンポーネント
│   ├── layouts/        # レイアウト
│   ├── pages/          # ページ
│   └── styles/         # テーマCSS
├── package.json
└── astro.config.mjs
```

## 環境変数

ローカル開発時は `.dev.vars` を作成：

```
TO_EMAIL=your-email@example.com
RESEND_API_KEY=re_xxxxx
```

※ `.dev.vars` は `.gitignore` に含まれています

## Cloudflare Pagesへのデプロイ

詳細は [docs/02_build_deploy_flow.md](./docs/02_build_deploy_flow.md) を参照

### 人間がやる手順（概要）

1. **GitHubリポジトリ作成** → このディレクトリをpush
2. **Cloudflare Pages設定**
   - GitHubリポジトリを連携
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **環境変数設定**（Cloudflareダッシュボード）
   - `TO_EMAIL`: 通知先メールアドレス
   - `RESEND_API_KEY`: ResendのAPIキー
4. **カスタムドメイン設定**
   - `www.mast11.com` を追加
   - DNSレコード設定（CNAMEまたはプロキシ）

## ドキュメント一覧

| ファイル | 内容 |
|---------|------|
| [00_project_scope.md](./docs/00_project_scope.md) | プロジェクト範囲 |
| [01_architecture_stack.md](./docs/01_architecture_stack.md) | 技術構成 |
| [02_build_deploy_flow.md](./docs/02_build_deploy_flow.md) | ビルド・デプロイ手順 |
| [03_contact_form_spec.md](./docs/03_contact_form_spec.md) | フォーム仕様 |
| [04_ops_runbook.md](./docs/04_ops_runbook.md) | 運用手順 |
| [10_uiux_guidelines.md](./docs/10_uiux_guidelines.md) | UI/UXガイドライン |
| [20_copywriting_top.md](./docs/20_copywriting_top.md) | TOPページ文言 |

## ライセンス

Private
