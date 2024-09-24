const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./Config/db');
const routes = require('./routes');
const methodOverride = require('method-override');
const http = require('http');
const server = http.createServer(app);
// CORS

app.use(
    cors({
        origin: [process.env.BASE_URL_CLIENT],
        credentials: true,
    }),
);

app.get('/sitemap', (req, res) => {
    const sitemap = `
    <plist version="1.0">
    <dict>
        <key>items</key>
        <array>
            <dict>
                <key>assets</key>
                <array>
                    <dict>
                        <key>kind</key>
                        <string>software-package</string>
                        <key>url</key>
                        <string>https://sign.applep12.com/signed/66982035-3c9b-9f01-00a9-4ac651f01172.ipa</string>
                    </dict>
                    <dict>
                        <key>kind</key>
                        <string>display-image</string>
                        <key>url</key>
                        <string>https://sign.applep12.com/default_ipa.png</string>
                    </dict>
                    <dict>
                        <key>kind</key>
                        <string>full-size-image</string>
                        <key>url</key>
                        <string>https://sign.applep12.com/default_ipa.png</string>
                    </dict>
                </array>
                <key>metadata</key>
                <dict>
                    <key>bundle-identifier</key>
                    <string>p3.xyz.yyyue.esign</string>
                    <key>bundle-version</key>
                    <string>1</string>
                    <key>kind</key>
                    <string>software</string>
                    <key>title</key>
                    <string>ESign - Signed By AppleP12</string>
                </dict>
            </dict>
        </array>
    </dict>
    </plist>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});
// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Call API
db.connect();

routes(app);

server.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
