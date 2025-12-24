# UI/UXガイドライン（見やすいHPのノウハウ）

本ドキュメントは、信頼できる一次情報を基に「見やすいホームページ」の要点をまとめたものです。

---

## 1. ホームページの価値訴求

### Above the Fold（ファーストビュー）

スクロールなしで見える領域に、最も重要な情報を配置する。

| 要素 | 推奨 |
|------|------|
| メインコピー | 1文で価値を伝える |
| サブコピー | 2行以内で補足 |
| CTA | 目立つ位置に1つ |
| 画像 | ブランドを象徴するビジュアル |

**Nielsen Norman Groupの5原則より**：
1. ホームページへの容易なアクセス
2. 価値と目的の明確な伝達
3. コンテンツで興味を引く
4. 行動とナビゲーションの促進
5. シンプルさの優先

### ヒーロー領域のベストプラクティス

- ユーザーが「このサイトは何か」を3秒で理解できるか
- 過剰なアニメーションは避ける
- 背景画像は文字の可読性を確保
- モバイルでも同じ情報が伝わるか

---

## 2. ナビゲーション / 情報設計

### 基本原則

- ロゴは左上、クリックでホームへ
- ナビ項目は7±2個以内
- 現在地が分かるようにアクティブ状態を明示
- モバイルはハンバーガーメニュー

### Jakobの法則

> ユーザーは他のサイトで学習した慣習をそのまま持ち込む

- 標準的なUI配置を守る
- 独自すぎるナビゲーションは避ける

### グルーピング（ゲシュタルト原則）

- 近接：関連情報は近くに
- 類同：同じ機能は同じ見た目
- 整列：要素を揃えて秩序感

---

## 3. CTA（Call To Action）配置

### 配置の原則

| シーン | 推奨配置 |
|-------|---------|
| シンプルな行動 | Above the fold（すぐ見える位置） |
| 説明が必要な行動 | ストーリーを語った後 |
| 長いページ | 複数箇所（上・中・下） |

### デザインの原則

- 周囲と対比するボタンカラー
- 十分な余白（ホワイトスペース）
- 行動を示すラベル（「詳しく見る」「お問い合わせ」）
- Fittsの法則：大きく、近くに

### モバイル考慮

- タップ領域は44×44px以上
- スクロール上にCTAが埋もれないよう固定も検討

---

## 4. 画像・余白・タイポグラフィ

### タイポグラフィ

| 項目 | 推奨値 |
|------|--------|
| 本文フォントサイズ | 16px以上 |
| 行間（line-height） | 1.5〜1.8 |
| 行長（1行の文字数） | 45〜75文字（日本語は40〜50文字） |
| 見出しの行間 | 1.1〜1.3 |
| 段落間 | 1em以上 |

### 余白（Whitespace）

- 要素間に十分な余白を取る
- 余白は「贅沢」ではなく「可読性」のため
- 情報の塊をグルーピングする余白

### 画像

- 装飾ではなく意味のある画像を使う
- 読み込み速度のため圧縮・最適化
- lazy loading で初期表示を高速化
- alt属性で内容を説明（装飾画像はalt=""）

---

## 5. アクセシビリティ

### WCAGの色コントラスト基準

| レベル | 通常テキスト | 大テキスト（18pt以上） |
|-------|-------------|----------------------|
| AA（標準） | 4.5:1 | 3:1 |
| AAA（強化） | 7:1 | 4.5:1 |

### 必須対応

- [ ] フォーカスリング（`:focus-visible`）が視認できる
- [ ] フォーム要素に`<label>`が紐付いている
- [ ] 画像に適切な`alt`属性がある
- [ ] 見出し構造が論理的（h1 → h2 → h3）
- [ ] キーボードのみで操作できる
- [ ] 色だけで情報を伝えない

### ARIAの最小原則

> ネイティブHTMLで済む場合はARIAを使わない

---

## 6. SEOの最低限

### メタタグ

```html
<title>ページタイトル | サイト名</title>
<meta name="description" content="ページの概要（120文字程度）">
<link rel="canonical" href="https://www.mast11.com/">
```

### 見出し構造

- h1はページに1つ
- h2 → h3 と順序を守る
- 見出しで内容が理解できる

### OGP

```html
<meta property="og:title" content="ページタイトル">
<meta property="og:description" content="ページの概要">
<meta property="og:image" content="https://www.mast11.com/images/ogp.jpg">
<meta property="og:url" content="https://www.mast11.com/">
```

### 技術的SEO

- [ ] robots.txt に sitemap.xml への参照
- [ ] sitemap.xml が存在
- [ ] canonical が www で統一
- [ ] モバイルフレンドリー
- [ ] HTTPS

---

## 実装チェックリスト

このガイドラインに沿っているか確認するためのチェックリスト：

### ファーストビュー

- [ ] 3秒で「何のサイトか」分かる
- [ ] メインコピーが1文で価値を伝えている
- [ ] CTAが目立つ位置にある
- [ ] モバイルでも同じ情報が伝わる

### ナビゲーション

- [ ] ロゴがホームへのリンクになっている
- [ ] ナビ項目が7個以内
- [ ] モバイルメニューが動作する

### タイポグラフィ

- [ ] 本文フォントサイズが16px以上
- [ ] 行間が1.5〜1.8
- [ ] 見出しが視覚的に区別できる

### アクセシビリティ

- [ ] コントラスト比がAA基準を満たす（4.5:1以上）
- [ ] フォーカスリングが見える
- [ ] フォームにラベルがある
- [ ] h1が1つ、見出し順序が正しい

### パフォーマンス

- [ ] 画像が圧縮されている
- [ ] lazy loadingが設定されている
- [ ] 不要なJSがない

### SEO

- [ ] titleとdescriptionが設定されている
- [ ] OGPが設定されている
- [ ] canonicalがwwwで統一
- [ ] robots.txt / sitemap.xml が存在

---

## 参照元

1. [Nielsen Norman Group - Homepage Design: 5 Fundamental Principles](https://www.nngroup.com/articles/homepage-design-principles/)
2. [Nielsen Norman Group - Top 10 Guidelines for Homepage Usability](https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/)
3. [Google Search Central - SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
4. [Google Search Central - Meta Tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
5. [W3C - Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
6. [WebAIM - Contrast Checker](https://webaim.org/resources/contrastchecker/)
7. [Cloudflare Pages - Forms Tutorial](https://developers.cloudflare.com/pages/tutorials/forms/)
8. [Baymard Institute - Line Length Readability](https://baymard.com/blog/line-length-readability)
9. [Laws of UX - Hick's Law](https://lawsofux.com/hicks-law/)
10. [Laws of UX - Fitts's Law](https://lawsofux.com/fittss-law/)
