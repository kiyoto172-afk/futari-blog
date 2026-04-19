export async function onRequestGet({ request, env }) {
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('GitHub OAuth env vars are not set', { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code) return new Response('missing code', { status: 400 });

  const cookie = request.headers.get('Cookie') || '';
  const expected = (cookie.match(/decap_oauth_state=([^;]+)/) || [])[1];
  if (!state || state !== expected) {
    return new Response('state mismatch', { status: 400 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const tokenJson = await tokenRes.json();
  const token = tokenJson.access_token;

  const payload = token
    ? `success:${JSON.stringify({ token, provider: 'github' })}`
    : `error:${JSON.stringify({ message: tokenJson.error_description || 'token exchange failed' })}`;

  const escaped = JSON.stringify(`authorization:github:${payload}`);
  const html = `<!doctype html><html><body><script>
    (function(){
      var msg = ${escaped};
      function send(e){ if (!e.data || e.data !== 'authorizing:github') return;
        window.opener && window.opener.postMessage(msg, e.origin);
      }
      window.addEventListener('message', send, false);
      window.opener && window.opener.postMessage('authorizing:github', '*');
    })();
  </script><p>認証中です… このウィンドウは自動で閉じます。</p></body></html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}
