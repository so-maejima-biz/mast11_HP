---
name: lp-workflow
description: LP制作のワークフロー、変更サイクル、ドキュメント更新ルール、完了判定チェックリスト
---

# LP制作ワークフロー

## 変更サイクル

```
小さく変更 → 動作確認（npm run dev） → commit
```

- 一度に大量の変更をしない
- 変更したらブラウザで目視確認
- 動作OKならcommit（メッセージは日本語OK）

## ドキュメント更新ルール

コードに修正が入ったら、関連ドキュメントも必ず更新:

| 変更内容 | 更新対象 |
|---------|---------|
| 環境変数の追加・変更 | docs/01_architecture_stack.md, docs/02_build_deploy_flow.md |
| フォーム仕様変更 | docs/03_contact_form_spec.md |
| コピー（文言）変更 | docs/20_copywriting_top.md |
| UI/UX変更 | docs/10_uiux_guidelines.md |
| デプロイ手順変更 | docs/02_build_deploy_flow.md |
| ディレクトリ構成変更 | CLAUDE.md, README.md |

## Phase1 完了判定チェックリスト

### 実装
- [x] `npm install` が成功する
- [x] `npm run dev` でTOPページが表示される
- [x] `npm run build` がエラーなく完了する
- [x] TOPページがモバイル/デスクトップでレスポンシブ表示
- [ ] お問い合わせフォームが動作する（本番環境で要確認）
- [x] フォームのバリデーション（必須・メール形式）が機能する
- [x] honeypot（スパム対策）が実装されている

### SEO・アクセシビリティ
- [x] title / meta description が設定されている
- [x] OGP（og:title, og:description等）が設定されている
- [x] canonical が https://www.mast11.com/ で統一
- [x] robots.txt, sitemap.xml が存在する
- [x] h1 は1ページに1つ
- [x] フォーカスリングが視認できる
- [x] フォームにラベルが紐付いている

### ドキュメント
- [x] README.md が完成
- [x] CLAUDE.md が完成
- [x] docs/ 配下のドキュメント一式

### 禁止事項チェック
- [x] 秘密情報がコードに直書きされていない
- [x] 外部画像への直リンクがない
- [x] Phase2のページが勝手に追加されていない

## 環境変数

Cloudflare Pagesで設定:

| 変数名 | 用途 |
|--------|------|
| `TO_EMAIL` | 通知先メールアドレス |
| `RESEND_API_KEY` | Resend APIキー |

ローカル開発: `.dev.vars` に記載（.gitignoreに含める）

## デプロイ手順（人間がやる）

1. GitHubにpush
2. Cloudflare Pagesでプロジェクト作成・連携
3. 環境変数設定（TO_EMAIL, RESEND_API_KEY）
4. カスタムドメイン設定（www.mast11.com）
5. 公開後チェック（フォーム送信テスト等）

詳細: docs/02_build_deploy_flow.md
