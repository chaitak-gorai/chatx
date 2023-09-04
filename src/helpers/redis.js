const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

/**
 * @param {string} command - Redis command (e.g., 'zrange', 'sismember', 'get', 'smembers')
 * @param {string | number} args - Arguments for the command
 * @returns {Promise<any>} - Promise that resolves to the result of the Redis command
 */
async function fetchRedis(command, ...args) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}

module.exports = { fetchRedis }
