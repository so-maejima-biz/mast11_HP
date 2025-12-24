# CLAUDE.md - MAST11 HP プロジェクト運用ガイド

このファイルはClaudeがこのプロジェクトを理解し、一貫した品質で作業するためのガイドです。

---

## 1. ゴール / 非ゴール

### Phase1 ゴール（今回のスコープ）
- **TOPページのみ**を完成させ、Cloudflare Pagesにデプロイできる状態にする
- お問い合わせフォーム（通知のみ、自動返信なし）を動作させる
- 指名検索（社名検索）でヒットする最低限のSEO
- 初心者でもデプロイまで辿れるドキュメント一式

### Phase2 以降（今回は対象外）
- OEM / OUR STORY / COMPANY / PRIVACY 等の個別ページ
- 自動返信メール
- 多言語対応
- アクセス解析（Google Analytics等）
- CMS連携

---

## 2. 禁止事項

以下は**絶対に行わないこと**：

| 禁止事項 | 理由 |
|---------|------|
| 秘密情報（APIキー、メールアドレス等）のコード直書き | セキュリティリスク。必ず環境変数を使う |
| 外部画像URLへの直リンク | リンク切れ・ライセンス問題。必ずpublic/imagesにローカル保存 |
| 無断で依存パッケージを追加 | package.jsonが肥大化。追加前に必要性を確認 |
| 勝手にページを追加（Phase2のページ等） | スコープ外。TOPページのみに集中 |
| 著作権リスクのある長文コピペ | 引用は短く、出典を明記 |
| npm install -g でグローバルインストール | ローカル依存で完結させる |
| 動作確認せずにcommit | 小さく変更→動作確認→commitのサイクルを守る |

---

## 3. コーディング規約

### 3.1 Astro の書き方

```
src/
├── components/    # 再利用可能なUIパーツ（PascalCase.astro）
├── layouts/       # ページ共通レイアウト
├── pages/         # ルーティング対象（kebab-case.astro）
└── styles/        # グローバルCSS、テーマ変数
```

- **コンポーネント分割方針**：1ファイル200行を超えたら分割を検討
- **Props**：TypeScriptで型定義し、デフォルト値を明記
- **命名**：コンポーネントはPascalCase、ページはkebab-case

```astro
---
// 例：Props定義
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'デフォルト説明' } = Astro.props;
---
```

### 3.2 CSS方針

- **CSS変数でテーマ化**：src/styles/theme.css に集約
- **基調色**：セルリアンブルー `#007BA7`
- **コントラスト**：WCAG AA準拠（本文4.5:1以上、大文字3:1以上）
- **本文色**：ほぼ黒 `#1a1a1a`（背景白とのコントラスト確保）

```css
:root {
  --color-primary: #007BA7;
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
}
```

### 3.3 JS/TS方針

- **TypeScript優先**：型安全性を確保
- **fetchのエラー処理**：try-catchで必ずラップ、ユーザーに優しいエラー文言
- **console.log**：本番では残さない（開発時のみ）

```typescript
// 例：fetchのエラー処理
try {
  const response = await fetch('/api/contact', { ... });
  if (!response.ok) throw new Error('送信に失敗しました');
  const result = await response.json();
} catch (error) {
  // ユーザー向けエラー表示（内部詳細は出さない）
  showError('送信に失敗しました。時間をおいて再度お試しください。');
}
```

### 3.4 アクセシビリティ

- **フォーカスリング**：すべてのインタラクティブ要素に `:focus-visible` スタイル
- **ラベル**：フォーム要素には必ず `<label>` を紐付け
- **ARIA**：ネイティブHTMLで済む場合はARIAを使わない（最小原則）
- **画像**：装飾画像は `alt=""`、意味のある画像は適切なalt

---

## 4. ディレクトリ規約

```
2026_HP/
├── CLAUDE.md           # このファイル（運用ガイド）
├── README.md           # プロジェクト概要・セットアップ手順
├── docs/               # ドキュメント一式
│   ├── 00_project_scope.md
│   ├── 01_architecture_stack.md
│   ├── 02_build_deploy_flow.md
│   ├── 03_contact_form_spec.md
│   ├── 04_ops_runbook.md
│   ├── 10_uiux_guidelines.md
│   ├── 20_copywriting_top.md
│   └── 90_verification_report.md
├── public/
│   ├── images/         # 画像（ローカル保存必須）
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── functions/
│   └── api/
│       └── contact.ts  # お問い合わせAPI
├── src/
│   ├── components/     # UIコンポーネント
│   ├── layouts/        # レイアウト
│   ├── pages/          # ページ（index.astroのみ）
│   └── styles/         # テーマCSS
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

---

## 5. ワークフロー規約

### 5.1 変更サイクル

```
小さく変更 → 動作確認（npm run dev） → commit
```

- 一度に大量の変更をしない
- 変更したらブラウザで目視確認
- 動作OKならcommit（メッセージは日本語OK）

### 5.2 ドキュメント更新ルール

**コードに修正が入ったら、docs配下の関連ファイルも必ず更新すること。**

| 変更内容 | 更新対象のドキュメント |
|---------|----------------------|
| 環境変数の追加・変更 | 01_architecture_stack.md, 02_build_deploy_flow.md |
| フォーム仕様変更 | 03_contact_form_spec.md |
| コピー（文言）変更 | 20_copywriting_top.md |
| UI/UX変更 | 10_uiux_guidelines.md（チェックリスト更新） |
| デプロイ手順変更 | 02_build_deploy_flow.md |
| ディレクトリ構成変更 | CLAUDE.md, README.md |

ドキュメントとコードが乖離すると、後から混乱するので必ず同時に更新する。

### 5.3 チェックボックス運用

このファイルのチェックリスト（後述）を使い、タスク完了時に更新する：

```markdown
- [ ] 未完了タスク
- [x] 完了タスク
```

---

## 6. Done判定チェックリスト

以下がすべて `[x]` になったらPhase1完了：

### 6.1 実装

- [x] `npm install` が成功する
- [x] `npm run dev` でTOPページが表示される
- [x] `npm run build` がエラーなく完了する
- [x] TOPページがモバイル/デスクトップでレスポンシブ表示
- [ ] お問い合わせフォームが動作する（本番環境で要確認）
- [x] フォームのバリデーション（必須・メール形式）が機能する
- [x] honeypot（スパム対策）が実装されている

### 6.2 SEO・アクセシビリティ

- [x] title / meta description が設定されている
- [x] OGP（og:title, og:description等）が設定されている
- [x] canonical が https://www.mast11.com/ で統一
- [x] robots.txt が存在し、sitemap.xml への参照がある
- [x] sitemap.xml が存在する
- [x] h1 は1ページに1つ
- [x] フォーカスリングが視認できる
- [x] フォームにラベルが紐付いている

### 6.3 ドキュメント

- [x] README.md が完成（セットアップ手順明記）
- [x] CLAUDE.md（このファイル）が完成
- [x] docs/00_project_scope.md
- [x] docs/01_architecture_stack.md
- [x] docs/02_build_deploy_flow.md（人間がやる手順含む）
- [x] docs/03_contact_form_spec.md
- [x] docs/04_ops_runbook.md
- [x] docs/10_uiux_guidelines.md（参照URL付き）
- [x] docs/20_copywriting_top.md
- [x] docs/90_verification_report.md（検証結果）

### 6.4 禁止事項チェック

- [x] 秘密情報がコードに直書きされていない
- [x] 外部画像への直リンクがない
- [x] Phase2のページが勝手に追加されていない

---

## 7. 環境変数一覧

以下の環境変数をCloudflare Pagesで設定する必要がある：

| 変数名 | 用途 | 例 |
|--------|------|-----|
| `TO_EMAIL` | 通知先メールアドレス | contact@mast11.com |
| `RESEND_API_KEY` | Resend APIキー | re_xxxxx |

※ローカル開発時は `.dev.vars` ファイルに記載（.gitignoreに含める）

---

## 8. Phase1完了後の状態

Phase1の実装・ドキュメントが完了しました。

### 完了したこと

- [x] TOPページ実装（Astro + セルリアンブルーテーマ）
- [x] お問い合わせフォーム + Pages Functions API
- [x] SEO最低限（robots.txt, sitemap.xml, OGP）
- [x] ドキュメント一式（docs/）
- [x] 検証レポート作成

### 人間がやる手順

1. GitHubにpush（リポジトリ: https://github.com/so-maejima-biz/mast11_HP）
2. Cloudflare Pagesでプロジェクト作成・連携
3. 環境変数設定（TO_EMAIL, RESEND_API_KEY）
4. カスタムドメイン設定（www.mast11.com）
5. 公開後チェック（フォーム送信テスト等）

詳細手順は [docs/02_build_deploy_flow.md](./docs/02_build_deploy_flow.md) を参照
