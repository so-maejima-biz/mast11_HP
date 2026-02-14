# プロジェクト範囲（Project Scope）

## 概要

MAST11コーポレートサイトの新規構築プロジェクト

## Phase分け

### Phase1（現在のスコープ）

| 項目 | 内容 |
|------|------|
| 対象ページ | TOPページのみ |
| ドメイン | www.mast11.com |
| ホスティング | Cloudflare Pages |
| フォーム | お問い合わせ（通知のみ、自動返信なし） |
| SEO | 指名検索（社名検索）で出ればOK |
| 素材 | プレースホルダ画像（後で差し替え） |

### Phase2（個別ページ追加）

- **DEVELOPMENT & QUALITY ページ** ← 対応中（`/development-quality`）
- OEM ページ
- OUR STORY ページ
- COMPANY ページ
- CONTACT 専用ページ
- PRIVACY ページ
- 自動返信メール
- 多言語対応
- アクセス解析（Google Analytics等）

## 成果物一覧

```
2026_HP/
├── README.md
├── CLAUDE.md
├── docs/（本ドキュメント群）
├── public/images/（プレースホルダ画像）
├── functions/api/contact.ts
├── src/pages/index.astro
├── src/components/
├── src/styles/
└── 各種設定ファイル
```

## 技術選定理由

| 技術 | 選定理由 |
|------|----------|
| Astro | 静的サイト生成に最適、高速、シンプル |
| Cloudflare Pages | 無料枠で十分、CDNグローバル配信、Pages Functions対応 |
| Resend | シンプルなメールAPI、無料枠あり |

## 受入条件（Done定義）

- [ ] `npm install` → `npm run dev` でTOP表示
- [ ] `npm run build` 成功
- [ ] フォームAPI疎通（ローカル）
- [ ] docs一式完成
- [ ] 初心者でもデプロイ手順を辿れる

## スケジュール

| フェーズ | 内容 | 状態 |
|---------|------|------|
| Phase1 | TOPページ + フォーム + docs | 進行中 |
| Phase2 | 個別ページ追加 | 未着手 |
