---
name: astro-dev
description: Astroプロジェクトのコーディング規約。ディレクトリ構成、コンポーネント設計、CSS/TSの書き方
---

# Astro開発スキル

## ディレクトリ構成

```
src/
├── components/    # 再利用可能なUIパーツ（PascalCase.astro）
├── layouts/       # ページ共通レイアウト
├── pages/         # ルーティング対象（kebab-case.astro）
└── styles/        # グローバルCSS、テーマ変数
```

## コンポーネント設計

### 命名規則
- コンポーネント: `PascalCase.astro`
- ページ: `kebab-case.astro`

### 分割基準
- 1ファイル200行を超えたら分割を検討

### Props定義
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'デフォルト説明' } = Astro.props;
---
```

## CSS方針

### テーマ変数（src/styles/theme.css）
```css
:root {
  --color-primary: #007BA7;  /* セルリアンブルー */
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
}
```

### コントラスト基準（WCAG AA）
- 本文: 4.5:1 以上
- 大文字: 3:1 以上

## TypeScript方針

### fetchのエラー処理
```typescript
try {
  const response = await fetch('/api/contact', { ... });
  if (!response.ok) throw new Error('送信に失敗しました');
  const result = await response.json();
} catch (error) {
  // ユーザー向けエラー表示（内部詳細は出さない）
  showError('送信に失敗しました。時間をおいて再度お試しください。');
}
```

### 禁止事項
- `console.log` を本番に残さない
- `any` 型の乱用

## アクセシビリティ

- **フォーカスリング**: `:focus-visible` スタイル必須
- **ラベル**: フォーム要素には必ず `<label>` を紐付け
- **ARIA**: ネイティブHTMLで済む場合は使わない
- **画像alt**: 装飾 → `alt=""`、意味あり → 適切なalt
