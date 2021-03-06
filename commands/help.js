const log = require('../log.js')

module.exports.run = async (ts, ev, client) => {
  let count = 1; let resp = `[U]Command Page ${count}[/U]:\n`
  ts.commands.forEach(cmd => {
    let color = (cmd.info.level === 2) ? '#00825a' : (cmd.info.level === 1) ? '#d58500' : '#ff3300'
    if (client.level <= cmd.info.level) {
      if (resp.length >= 900) {
        ts.sendTextMessage(client.getID(), 1, resp).catch(err => {
          ts.sendTextMessage(client.getID(), 1, 'error: Too many characters, please report this bug.')
          log.error(err)
        })
        count++
        resp = `[U]Command Page ${count}[/U]:\n`
      }
      resp += `[color=${color}]${cmd.info.usage}[/color] - ${cmd.info.desc}\n`
    }
  })
  ts.sendTextMessage(client.getID(), 1, resp).catch(err => {
    if (err.id === 1541) {
      ts.sendTextMessage(client.getID(), 1, 'error: Too many characters, please report this bug.')
      log.error(err)
    } else {
      log.error(err)
    }
  })
}

module.exports.info = {
  name: 'help',
  usage: `${process.env.PREFIX}help`,
  desc: 'Displays help information and accessible commands.',
  level: 2
}
