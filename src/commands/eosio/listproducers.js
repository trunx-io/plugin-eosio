const {flags} = require('@oclif/command')
const Command = require('../base.js')

class ListproducersCommand extends Command {
  async init() {
    this.fetch = require('./fetch');
  }

  async run() {
    const {flags} = this.parse(ListproducersCommand)

    const data = {
      "limit": parseInt(flags.limit),
      "lower_bound": flags.lower_bound || ''
    };

    // get table/scope for system account 
    await this.fetch.run([
      '--server', flags.server,
      '--endpoint', '/v1/chain/get_producers',
      '--data', JSON.stringify(data)
    ])

  }
}

ListproducersCommand.hidden = false;

ListproducersCommand.description = `List block producers
...
List block producers
`

ListproducersCommand.flags = {
  server: flags.string({char: 's', description: 'EOSIO node'}),
  limit: flags.string({char: 'n', description: 'number of producers to return', default: '10'}),
  lower_bound: flags.string({char: 'l', description: 'lower bound of query results; used for pagination'}),
}

module.exports = ListproducersCommand
