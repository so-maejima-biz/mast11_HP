# お問い合わせフォーム仕様（Contact Form Spec）

## 概要

- TOPページ下部に設置
- 通知のみ（自動返信なし）
- Pages Functionsで処理

## エンドポイント

```
POST /api/contact
Content-Type: application/json
```

## 入力項目

| フィールド | 必須 | 最大長 | 説明 |
|-----------|------|--------|------|
| `name` | 必須 | 100文字 | お名前 |
| `email` | 必須 | 254文字 | メールアドレス |
| `company` | 任意 | 100文字 | 会社名 |
| `message` | 必須 | 5000文字 | お問い合わせ内容 |
| `website` | - | - | honeypot（隠しフィールド） |

## バリデーション

### クライアント側（フロントエンド）

```typescript
// 必須チェック
if (!name) showError('お名前を入力してください');
if (!email) showError('メールアドレスを入力してください');
if (!message) showError('お問い合わせ内容を入力してください');

// メール形式
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) showError('正しいメールアドレスを入力してください');
```

### サーバー側（Pages Functions）

```typescript
// 必須チェック
if (!name || !email || !message) {
  return new Response(JSON.stringify({ error: '必須項目を入力してください' }), { status: 400 });
}

// honeypotチェック（スパム対策）
if (website) {
  // botの可能性が高い → 静かに成功を返す（エラーを返すとbot側が学習する）
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// 最大長チェック
if (name.length > 100 || email.length > 254 || message.length > 5000) {
  return new Response(JSON.stringify({ error: '入力内容が長すぎます' }), { status: 400 });
}

// メール形式チェック
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return new Response(JSON.stringify({ error: 'メールアドレスの形式が正しくありません' }), { status: 400 });
}
```

## リクエスト/レスポンス例

### リクエスト

```json
{
  "name": "山田 太郎",
  "email": "yamada@example.com",
  "company": "株式会社サンプル",
  "message": "OEMについてご相談したいです。",
  "website": ""
}
```

### 成功レスポンス

```json
{
  "success": true,
  "message": "お問い合わせを受け付けました"
}
```

### エラーレスポンス

```json
{
  "success": false,
  "error": "必須項目を入力してください"
}
```

## 通知メール

### 送信先

環境変数 `TO_EMAIL` で設定

### 件名

```
[MAST11] お問い合わせがありました
```

### 本文テンプレート

```
MAST11ウェブサイトからお問い合わせがありました。

■ お名前
${name}

■ 会社名
${company || '(未入力)'}

■ メールアドレス
${email}

■ お問い合わせ内容
${message}

---
このメールはシステムから自動送信されています。
```

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `TO_EMAIL` | 通知先メールアドレス | contact@mast11.com |
| `RESEND_API_KEY` | Resend APIキー | re_xxxxx |

## エラーハンドリング

| エラー種別 | ユーザー向けメッセージ | ログ |
|-----------|----------------------|------|
| バリデーションエラー | 具体的なエラー内容 | 不要 |
| メール送信失敗 | 「送信に失敗しました。時間をおいて再度お試しください。」 | 詳細をログ出力 |
| 予期せぬエラー | 「エラーが発生しました。時間をおいて再度お試しください。」 | スタックトレースをログ出力 |

## セキュリティ考慮

- honeypotフィールドでボット対策
- サーバー側で再バリデーション（クライアント側のみに頼らない）
- エラー詳細はログのみ、ユーザーには汎用メッセージ
- 個人情報（メールアドレス等）はログに出力しすぎない

## UI/UX

- 送信中はボタンを無効化し「送信中...」表示
- 成功時は緑色のメッセージ表示
- エラー時は赤色のメッセージ表示
- フォームリセットは成功時のみ
