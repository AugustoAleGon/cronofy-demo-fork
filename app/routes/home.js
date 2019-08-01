const connections = require("../connections");

module.exports = (app, options) => {
    app.get("/", async (req, res) => {
        const codeQuery = req.query.code;

        if (codeQuery) {
            console.log("validating `code` query:", codeQuery);
            const codeResponse = await connections.getData(
                `${options.apiDomain}/oauth/token`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        client_id: process.env.CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET,
                        grant_type: "authorization_code",
                        code: codeQuery,
                        redirect_uri: `${options.url}/`
                    })
                }
            );
        }

        const token = await connections
            .getData(options.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: `Bearer ${process.env.CLIENT_SECRET}`
                },
                body: JSON.stringify({
                    version: "1",
                    permissions: [
                        "agenda",
                        "availability",
                        "managed_availability",
                        "account_management"
                    ],
                    subs: [process.env.SUB],
                    origin: options.url
                })
            })
            .catch(error => {
                console.warn(error);
                return { error: error };
            });

        if (token.error) {
            return res.redirect("/setup-auth");
        }
        return res.render("pages/settings", {
            token: token.element_token.token,
            api_domain: options.apiDomain,
            error: false,
            url: options.url,
            client_id: process.env.CLIENT_ID
        });
    });
};
