const brandColors = {
  bg: '#0a0a0f',
  blue: '#2563eb',
  gold: '#d4af37',
  text: '#f8fafc',
  muted: '#94a3b8',
};

export const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:${brandColors.bg};font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${brandColors.bg};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;border:1px solid rgba(37,99,235,0.3);overflow:hidden;">
          <tr>
            <td style="padding:32px 40px;background:linear-gradient(135deg,#0a0a0f 0%,#1e1b4b 100%);border-bottom:1px solid rgba(37,99,235,0.2);">
              <h1 style="margin:0;color:${brandColors.text};font-size:28px;font-weight:800;">
                FLYY <span style="color:${brandColors.blue};">360</span>
              </h1>
              <p style="margin:4px 0 0;color:${brandColors.gold};font-size:12px;font-weight:600;letter-spacing:2px;">RAW & REEL</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background:#0a0a0f;border-top:1px solid rgba(37,99,235,0.15);">
              <p style="margin:0;color:${brandColors.muted};font-size:12px;text-align:center;">
                FLYY 360 – Raw & Reel | Rome, GA<br>
                <a href="mailto:booking@flyy360.com" style="color:${brandColors.blue};text-decoration:none;">booking@flyy360.com</a> | 706.591.8014
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
