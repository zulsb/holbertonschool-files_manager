import redis from 'redis'
import { promisify } from 'util'

class RedisClient {
  constructor () {
    this.client = redis.createClient()
    this.getAsync = promisify(this.client.get).bind(this.client)
    this.client.on('error', (error) => {
      console.log(`Error connecting to server: ${error.message}`)
    })
  }

  isAlive () {
    return this.client.connected
  }

  async get (key) {
    const v = await this.getAsync(key)
    return v
  }

  async set (key, value, duration) {
    this.client.setex(key, duration, value)
  }

  async del (key) {
    this.client.del(key)
  }
}

const redisClient = new RedisClient()

export default redisClient
