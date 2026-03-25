import { Readable } from "node:stream"

class OneToThousandStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 1000) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain'
    },
    duplex: 'half',
    body: new OneToThousandStream()
})