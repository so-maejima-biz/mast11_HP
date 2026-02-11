# CLAUDE.md - MAST11 HP プロジェクト

## プロジェクト概要
- **Phase1スコープ**: TOPページのみ + お問い合わせフォーム
- **技術スタック**: Astro + Cloudflare Pages
- **基調色**: セルリアンブルー `#007BA7`

## 基本原則
- **秘密情報をコードに書かない**: `.dev.vars` で管理、gitにコミットしない
- **外部画像への直リンク禁止**: 必ず `public/images/` にローカル保存
- **スコープ厳守**: Phase2のページを勝手に追加しない
- **小さく変更**: 変更 → 動作確認（npm run dev） → commit
- **成果物はプロジェクト内に保存**: ドキュメントは `docs/`、コードは `src/` など、必ずプロジェクトディレクトリ内に作成する。プロジェクト外（`~/.claude/` 等）に成果物を残さない

> 設計原則の詳細は `.claude/skills/` を参照

## コード編集の前に
- 目的とスコープを明確にしてからファイルに触れる
- 複数ファイルや破壊的な変更の場合は、計画を示して承認を待つ
- 編集後は、何を変更したか要約する

## よく使うコマンド
```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run preview  # ビルド結果プレビュー
```

## ディレクトリ構成
```bash
tree -I "node_modules|dist|.git" --dirsfirst
```

主要ディレクトリ:
- `src/components/` - UIコンポーネント
- `src/pages/` - ページ（index.astroのみ）
- `functions/api/` - お問い合わせAPI
- `docs/` - プロジェクトドキュメント

## 環境変数
| 変数名 | 用途 |
|--------|------|
| `TO_EMAIL` | 通知先メールアドレス |
| `RESEND_API_KEY` | Resend APIキー |

## プロジェクトスキル
詳細な手順は `.claude/skills/` にあります:
- `astro-dev/` - Astroコーディング規約、CSS/TS方針
- `lp-workflow/` - 変更サイクル、チェックリスト、デプロイ手順

## ドキュメント
プロジェクト詳細は `docs/` を参照:
- `00_project_scope.md` - スコープ定義
- `02_build_deploy_flow.md` - デプロイ手順
- `03_contact_form_spec.md` - フォーム仕様
- `cloudflare_deployment_todo.md` - 公開準備・Resend設定・デプロイ手順

## 個人用メモ
端末固有の設定は `CLAUDE.local.md` に記載（git管理外）。
