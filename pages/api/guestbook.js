import { withSession } from '@/libs/session';
import { postCommand } from '@/libs/upstash';
import { restAsyncHandler } from '@/libs/utils';
import * as v from 'vlid';

const STORED_LIST = `guestbook_${process.env.NODE_ENV}`;

const transformResult = (data) =>
  data.result
    .map((i) => JSON.parse(i))
    .filter((i) => !i.private)
    .map((i) => {
      delete i.private;
      return i;
    });

async function handleGet(req, res) {
  const { data } = await postCommand(['LRANGE', STORED_LIST, 0, 100]);
  const result = transformResult(data);
  // ensure no more than 100 comments
  if (result.length > 100)
    await postCommand(['LTRIM', 'guestbook_test', 0, 100]);
  return res.json({ success: true, data: result });
}
async function handlePost(req, res) {
  const currentUser = req.session.get('user');
  if (!currentUser) throw new Error('You are not loggedIn');
  const schema = v
    .object({
      private: v.boolean().required(),
      body: v
        .string()
        .min(3)
        .max(100)
        .required()
    })
    .cast();
  const result = v.validateSync(schema, req.body);
  if (result.isValid) {
    const postData = JSON.stringify({
      ...result.value,
      name: currentUser.name,
      website: currentUser.website,
      avatar: currentUser.avatar_url,
      created_at: Date.now()
    });
    const { data } = await postCommand(['LPUSH', STORED_LIST, postData]);
    if (data) {
      res.json({
        success: true,
        msg: 'Thanks for your comments.'
      });
    } else {
      throw new Error('Database error.. Try again');
    }
  } else {
    throw new Error('Validation error');
  }
}
async function handleDelete(req, res) {
  const currentUser = req.session.get('user');
  if (!currentUser) throw new Error('You are not loggedIn');
}
export default withSession(async function(req, res) {
  if (req.method === 'GET') return restAsyncHandler(handleGet)(req, res);
  if (req.method === 'POST') return restAsyncHandler(handlePost)(req, res);
  return req.json({ success: false, msg: 'No Method allowed.' });
});
