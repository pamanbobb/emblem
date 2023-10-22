//OJOK TEK EDIT EDIT DINE MASTER, CUKUP PASTE DAN DEPLOY TEK CLOUDFLARE
const html404 = `<!DOCTYPE html>
  <body>
    <h1 style="text-align:center;">404 Not Found.</h1>
    <p style="text-align:center;">The url you visit is not found.</p>
  </body>`;

async function handling(request) {
    let direct_url;
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent")
    const patch = url.pathname.replace("/", "");
    const build = await MODERNHTCX.get(patch);
    const access = JSON.parse(build);
    if (access.path === patch) {
        if (ua.indexOf('Android') > -1) {
            direct_url = access.android;
        } else if (ua.indexOf('iPhone') > -1) {
            direct_url = access.ios;
        } else if (ua.indexOf('Win') > -1) {
            direct_url = access.web;
        } else if (ua.indexOf('facebookexternalhit') > -1) {
            const html =
            `<!DOCTYPE html>
            <html>
              <head>
                <meta property="og:locale" content="en_US">
                <meta property="og:type" content="article">
                <meta property="fb:app_id" content="302184056577324">
                <meta property="og:title" content="${access.title}"/>
                <meta property="og:image:alt" content="${access.description}">
                <meta property="og:url" content="${url.href}"/>
                <meta property="og:description" content="${access.description}" />
                <meta property="og:image" content="${access.image}"/>
                <meta name="twitter:title" content="${access.title}">
                <meta name="twitter:description" content="${access.description}">
                <meta name="twitter:image" content="${access.image}">
                <meta name="twitter:card" content="summary_large_image">
              </head>
              <body>
              </body>
            </html>`;
            return new Response(html, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
                status: 200
            });
        } else {
            direct_url = access.web;
        }
        return Response.redirect(direct_url, 302);
    } else {
        return new Response(html404, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
            status: 404
        })
    }
}

addEventListener("fetch", async event => {
    event.respondWith(handling(event.request))
})
