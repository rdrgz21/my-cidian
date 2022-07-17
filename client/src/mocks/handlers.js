import {rest} from 'msw';

const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    return res(ctx.json({
      message: "Login successful",
      loggedIn: true,
      username: 'testuser'
    }))
  }),
  rest.post('api/register', async (req, res, ctx) => {
    return res(ctx.json("User successfully registered"))
  }),
  rest.get('/api/vocab/zh/test_user', async (req, res, ctx) => {
    return res(ctx.json({foundWords: [
      {
        characters: ['你', '好', '嗎'],
        chinese: "你好嗎",
        english: "hello",
        pinyin: ['ní', 'hǎo', 'mā'],
        readings: ['ni', 'hao', 'ma'],
        tones: ['2', '3', '1'],
        username: "tomtest2",
        __v: 0,
        _id: "62bdb3c57cd3790743696296"
      },
      {
        characters: ['再', '見'],
        chinese: "再見",
        english: "goodbye",
        pinyin: ['zài', 'jiàn'],
        readings: ['zai', 'jian'],
        tones: ['4', '4'],
        username: "tomtest2",
        __v: 0,
        _id: "62acdb45c1e48c2ffa197792"
      }
    ]}))
  })
]

export {handlers};