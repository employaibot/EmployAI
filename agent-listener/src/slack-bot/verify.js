// agent-listener/src/slack-bot/verify.js
import crypto from 'crypto';

export function verifySlackSignature(req, res, next) {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  const timestamp = req.headers['x-slack-request-timestamp'];
  const signature = req.headers['x-slack-signature'];

  if (!signingSecret || !timestamp || !signature) {
    return res.status(400).send();
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) {
    return res.status(400).send('Request too old');
  }

  // req.body is a Buffer from express.raw()
  const basestring = `v0:${timestamp}:${req.body.toString()}`;
  const computed = `v0=${crypto.createHmac('sha256', signingSecret).update(basestring).digest('hex')}`;

  if (
    signature.length !== computed.length ||
    !crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(computed, 'utf8'))
  ) {
    return res.status(400).send();
  }

  next();
}
