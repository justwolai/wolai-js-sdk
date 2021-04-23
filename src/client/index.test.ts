import { Wolai } from './index';


describe('获取空间访问token', () => {
  it('获取空间访问token成功',  async () => {
    const wolai = new Wolai({
      spaceId: "6zmTzaMJAgTKaPebY8QogU",
      spaceSecret: "raPT85rzRdFeqWUAv7oNasbMLfwd8VQYjABgiuxB6wNzxvG6g3g65jNDJRfLexSA14e5tcKM8U3g7eBQNYY76J2i"
    })

    const accessToken = await wolai.getAccessToken()

    expect(accessToken).toHaveProperty('spaceId')
    expect(accessToken).toHaveProperty('accessToken')
    expect(accessToken).toHaveProperty('refreshToken')
    expect(accessToken).toHaveProperty('expireSecond')
  })

  it('刷新访问token成功',  async () => {
    const wolai = new Wolai({
      spaceId: "6zmTzaMJAgTKaPebY8QogU",
      spaceSecret: "raPT85rzRdFeqWUAv7oNasbMLfwd8VQYjABgiuxB6wNzxvG6g3g65jNDJRfLexSA14e5tcKM8U3g7eBQNYY76J2i"
    })
    await wolai.getAccessToken()
    const accessToken = await wolai.refreshAccessToken()
    expect(accessToken).toHaveProperty('spaceId')
    expect(accessToken).toHaveProperty('accessToken')
    expect(accessToken).toHaveProperty('refreshToken')
    expect(accessToken).toHaveProperty('expireSecond')
  })
})
