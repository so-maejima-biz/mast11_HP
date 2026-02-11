/**
 * お問い合わせフォーム API
 * POST /api/contact
 *
 * 環境変数:
 * - TO_EMAIL: 通知先メールアドレス
 * - RESEND_API_KEY: Resend APIキー
 */

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // honeypot
}

interface Env {
  TO_EMAIL: string;
  RESEND_API_KEY: string;
}

// メール形式の簡易バリデーション
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 入力値のサニタイズ
function sanitize(str: string): string {
  return str.trim().slice(0, 10000);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS対応
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    // リクエストボディをパース
    const data: ContactFormData = await request.json();

    // honeypot チェック（ボット対策）
    // botが hidden フィールドに値を入れた場合、静かに成功を返す
    if (data.website) {
      console.log("[Contact] Honeypot triggered, likely bot");
      return new Response(
        JSON.stringify({
          success: true,
          message: "お問い合わせを受け付けました",
        }),
        { status: 200, headers },
      );
    }

    // 必須項目チェック
    const name = sanitize(data.name || "");
    const email = sanitize(data.email || "");
    const message = sanitize(data.message || "");
    const company = sanitize(data.company || "");

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "必須項目を入力してください" }),
        { status: 400, headers },
      );
    }

    // 最大長チェック
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: "お名前が長すぎます" }),
        { status: 400, headers },
      );
    }

    if (email.length > 254) {
      return new Response(
        JSON.stringify({ success: false, error: "メールアドレスが長すぎます" }),
        { status: 400, headers },
      );
    }

    if (message.length > 5000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "お問い合わせ内容が長すぎます",
        }),
        { status: 400, headers },
      );
    }

    // メール形式チェック
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "メールアドレスの形式が正しくありません",
        }),
        { status: 400, headers },
      );
    }

    // 環境変数チェック
    if (!env.TO_EMAIL || !env.RESEND_API_KEY) {
      console.error("[Contact] Missing environment variables");
      // 開発環境では成功を返す（メール送信をスキップ）
      if (!env.RESEND_API_KEY) {
        console.log("[Contact] Development mode - skipping email send");
        console.log("[Contact] Form data:", {
          name,
          email: "[REDACTED]",
          company,
          message: message.slice(0, 100) + "...",
        });
        return new Response(
          JSON.stringify({
            success: true,
            message: "お問い合わせを受け付けました（開発モード）",
          }),
          { status: 200, headers },
        );
      }
      return new Response(
        JSON.stringify({
          success: false,
          error: "サーバー設定エラーが発生しました",
        }),
        { status: 500, headers },
      );
    }

    // メール送信（Resend API）
    const emailBody = `
MAST11ウェブサイトからお問い合わせがありました。

■ お名前
${name}

■ 会社名
${company || "(未入力)"}

■ メールアドレス
${email}

■ お問い合わせ内容
${message}

---
このメールはシステムから自動送信されています。
    `.trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MAST11 Web <noreply@mast11.com>",
        to: env.TO_EMAIL.split(",").map((e) => e.trim()),
        subject: "[MAST11] お問い合わせがありました",
        text: emailBody,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error(
        "[Contact] Resend API error:",
        resendResponse.status,
        errorText,
      );
      return new Response(
        JSON.stringify({
          success: false,
          error: "送信に失敗しました。時間をおいて再度お試しください。",
        }),
        { status: 500, headers },
      );
    }

    // 成功ログ（個人情報は最小限）
    console.log("[Contact] Email sent successfully to:", env.TO_EMAIL);

    return new Response(
      JSON.stringify({
        success: true,
        message: "お問い合わせを受け付けました",
      }),
      { status: 200, headers },
    );
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "エラーが発生しました。時間をおいて再度お試しください。",
      }),
      { status: 500, headers },
    );
  }
};

// OPTIONSリクエスト対応（CORS preflight）
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
