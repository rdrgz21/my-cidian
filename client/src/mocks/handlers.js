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
]

export {handlers};