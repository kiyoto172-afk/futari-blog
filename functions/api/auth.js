export async function onRequestGet({ request, env }) {
  const clientId = env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID is not set', { status: 500 });
  }
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/api/callback`;
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo,user');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
