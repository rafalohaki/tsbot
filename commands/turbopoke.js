module.exports.run = async (ts, ev, client, args) => {
  if (!args[0] || !args[1]) return ts.sendTextMessage(client.getID(), 1, 'error: Missing argument(s)!')
  if (!Number.isInteger(parseInt(args[0]))) return ts.sendTextMessage(client.getID(), 1, 'error: First argument is not a number!')

  let searchUser = args.slice(1).join(' ')
  let target = await ts.getClientByName(searchUser)

  if (!target) return ts.sendTextMessage(client.getID(), 1, `Could not find user "${searchUser}"`)
  if (target.isQuery()) return ts.sendTextMessage(client.getID(), 1, 'Bots cannot be targeted!')
  if (args[0] > 60 || args[0] <= 0) return ts.sendTextMessage(client.getID(), 1, 'The allowed range of pokes is 1-60, for reasons.')

  let targetNick = target.getCache().client_nickname
  let pokes = parseInt(args[0])

  ts.sendTextMessage(client.getID(), 1, `Poking "${targetNick}" ${pokes} times.`)

  let count = 1
  let pokeInterval = setInterval(() => {
    target.poke(`(${count}/${pokes}) from "${client.getCache().client_nickname}"`)
    if (count === pokes) clearInterval(pokeInterval)
    count++
  }, 500)
}

module.exports.info = {
  name: 'turbopoke',
  usage: `${process.env.PREFIX}turbopoke <# of pokes> <nickname>`,
  desc: 'Pokes the target user the specified amount of times, up to 60.',
  level: 1
}
