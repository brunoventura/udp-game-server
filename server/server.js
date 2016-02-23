'use strict';

const dgram = require('dgram');
const server = dgram.createSocket('udp6');

const conns = new Map();
const flag = 'flag is CTF-BR{getme}';

server.on('error', (err) => {
    console.log(`Server error: ${err}`);
    server.close();
});
server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    conns.set(`${rinfo.address}:${rinfo.port}`,rinfo);
    // Send message to all connections 
    if (msg.toString() == "broadcast") {
        for (let [ip, conn] of conns) {
            console.log(`send to > ${ip}`);
            server.send( flag, 0, flag.length, conn.port, conn.address );
        }
    }
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(31337);
