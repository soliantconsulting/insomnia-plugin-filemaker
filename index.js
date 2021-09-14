const bufferToJsonObj = buf => JSON.parse(buf.toString('utf-8'));
const jsonObjToBuffer = obj => Buffer.from(JSON.stringify(obj), 'utf-8');

module.exports.responseHooks = [
    async ctx => {
        try {
            const response = bufferToJsonObj(ctx.response.getBody());

            if (response.response?.scriptResult) {
                response.response.scriptResult = JSON.parse(response.response.scriptResult);
                ctx.response.setBody(jsonObjToBuffer(response));
            }
        } catch {
            // no-op
        }
    }
];
