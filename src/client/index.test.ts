import { Wolai } from './index';

describe('获取空间访问token', () => {
  it('获取空间访问token成功',  async () => {
    const wolai = new Wolai({
      spaceId: "inLJb7buL7zgszRDh65kyn",
      spaceSecret: "5QUw2eCLCr9iYaDVKBhcBh4nDJ3y1xNgP5ZLe6bmcX26qJGJFBeca1tzY89fBANPkj2UHaMbrp4YZqgfiaqpvJbhuHmK8CpZeXRYLseFwGHHAghaxRDbkP6AHPAZNx3J"
    })

    const accessToken = await wolai.getAccessToken()

    expect(accessToken).toHaveProperty('spaceId')
    expect(accessToken).toHaveProperty('accessToken')
    expect(accessToken).toHaveProperty('refreshToken')
    expect(accessToken).toHaveProperty('expireSecond')
  })

  it('刷新访问token成功',  async () => {
    const wolai = new Wolai({
      spaceId: "inLJb7buL7zgszRDh65kyn",
      spaceSecret: "5QUw2eCLCr9iYaDVKBhcBh4nDJ3y1xNgP5ZLe6bmcX26qJGJFBeca1tzY89fBANPkj2UHaMbrp4YZqgfiaqpvJbhuHmK8CpZeXRYLseFwGHHAghaxRDbkP6AHPAZNx3J"
    })
    await wolai.getAccessToken()
    const accessToken = await wolai.refreshAccessToken()
    expect(accessToken).toHaveProperty('spaceId')
    expect(accessToken).toHaveProperty('accessToken')
    expect(accessToken).toHaveProperty('refreshToken')
    expect(accessToken).toHaveProperty('expireSecond')
  })
})
