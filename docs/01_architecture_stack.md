# 技術構成（Architecture & Stack）

## 技術スタック

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare CDN                        │
│                  (グローバルエッジ配信)                    │
├─────────────────────────────────────────────────────────┤
│                  Cloudflare Pages                        │
│              ┌──────────────┬──────────────┐            │
│              │  静的HTML    │ Pages        │            │
│              │  CSS/JS      │ Functions    │            │
│              │  画像        │ (/api/*)     │            │
│              └──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │   Resend     │
                    │ (メール送信)  │
                    └──────────────┘
```

## 各技術の役割

### Astro

| 項目 | 内容 |
|------|------|
| バージョン | 5.x |
| 出力モード | static（静的サイト生成） |
| 用途 | HTMLページ生成、コンポーネント管理 |

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://www.mast11.com',
});
```

### Cloudflare Pages

| 項目 | 内容 |
|------|------|
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |
| Functions | `/functions/api/*` が自動で `/api/*` にマッピング |

### Pages Functions

| 項目 | 内容 |
|------|------|
| ランタイム | Cloudflare Workers（V8 Isolates） |
| エンドポイント | `POST /api/contact` |
| 用途 | フォーム送信処理、メール通知 |

### Resend（メール送信）

| 項目 | 内容 |
|------|------|
| 用途 | お問い合わせ通知メール送信 |
| 認証 | APIキー（環境変数） |
| 無料枠 | 月100通 |

## ファイル構成と役割

```
2026_HP/
├── astro.config.mjs    # Astro設定
├── package.json        # 依存関係
├── tsconfig.json       # TypeScript設定
│
├── public/             # 静的ファイル（そのままdistにコピー）
│   ├── images/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
│
├── functions/          # Cloudflare Pages Functions
│   └── api/
│       └── contact.ts  # POST /api/contact
│
└── src/                # Astroソース
    ├── components/     # 再利用コンポーネント
    ├── layouts/        # ページレイアウト
    ├── pages/          # ルーティング（index.astro）
    └── styles/         # グローバルCSS
```

## ビルドフロー

```
[開発] npm run dev
         │
         ▼
[ビルド] npm run build
         │
         ▼
    Astro が src/ を処理
         │
         ▼
    dist/ に静的ファイル出力
         │
         ▼
[デプロイ] Cloudflare Pages が
          dist/ + functions/ をデプロイ
```

## 環境変数

| 変数名 | 用途 | 設定場所 |
|--------|------|----------|
| `TO_EMAIL` | 通知先メール | Cloudflare Pages Settings |
| `RESEND_API_KEY` | Resend APIキー | Cloudflare Pages Settings |

ローカル開発時は `.dev.vars` に記載

## セキュリティ考慮

- APIキーは環境変数で管理（コードに直書き禁止）
- honeypotフィールドでスパム対策
- 入力値バリデーション（サーバー側で再検証）
- エラー詳細はログのみ、ユーザーには汎用メッセージ
