// import http from 'node:http'

// const server = http.createServer((req, res) => {
//     if (req.url === "/" && req.method === "GET") {
//         res
//             .writeHead(200, { "Content-type": "text/html" })
//             .end('<h1>INDEX PAGE</h1>')
//     } else if (req.url === "/about" && req.method === 'GET') {
//         res
//             .writeHead(200, { "Content-type": "text/html" })
//             .end('<h1>ABOUT PAGE</h1>')
//     } else {
//         res
//             .writeHead(200, { "Content-type": "text/html" })
//             .end('<h1>error 404</h1>')
//     }

// })

// server.listen(4000, () => {
//     console.log('server started to work on 4000 port');
// })
// try {
//     const data = await fs.readFile(filePath);
//     const contentType = getContentType(filePath);

//     res.writeHead(200, {
//         'Content-type': contentType
//     });
//     res.end(data);
// } catch (error) {
//     res.writeHead(404, {
//         'Content-type': 'text/plain'
//     });
//     res.end('Not Found');
// }
// }
import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs/promises'
import url from 'url'
import { getContentType } from './contType.js'


const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    if (req.method === 'GET') {
        if (parsedUrl.pathname === '/') {

            res.writeHead(301, {
                'Location': '/index.html'
            })
            res.end()
            return
        }
        else {
            const filePath = path.resolve('public', parsedUrl.pathname.slice(1))
            console.log(filePath);
            try {
                const data = await fs.readFile(filePath);
                const contentType = getContentType(filePath);
                res.writeHead(200, {
                    'Content-type': contentType
                });
                res.end(data);
                return
            }
            catch (err) {
                console.log(err);
                const body = 'server error'
                res.writeHead(500, {
                    'Content-type': 'text/plain'
                });
                res.end(body);
                return
            }
        }
     

    }
    const body = 'not found'
    res.writeHead(404, {
        'Content-type': "text/plain",
        'Content-length': Buffer.byteLength(body)

    })
    res.write(body)
    res.end()
})

server.listen(4000, () => {
    console.log('server started to work on 4000 port');
})
   //     const body = 'WE have a response!!!'
        //     res.writeHead(200, {
        //         'Content-type': "text/plain",
        //         'Content-length': Buffer.byteLength(body)

        //     })
        //     res.write(body)
        //     res.end()
        //     return
        // }