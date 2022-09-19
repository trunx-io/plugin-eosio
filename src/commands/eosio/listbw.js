const {flags} = require('@oclif/command')
const Command = require('../base.js')

class ListbwCommand extends Command {
  async init() {
    this.fetch = require('./fetch');
  }

  async run() {
    const {args, flags} = this.parse(ListbwCommand)

    const data = {
      "code": "eosio",
      "table": "userres",
      "scope": args.account
    };

    // get table/scope for system account 
    await this.fetch.run([
      '--server', flags.server || '',
      '--endpoint', '/v1/chain/get_table_rows',
      '--data', JSON.stringify(data),
    ])

  }
}

ListbwCommand.hidden = false;

ListbwCommand.description = `List bandwidth for the user account
...
List bandwidth for the user account
`

ListbwCommand.args = [
  {
    name: 'account',
    required: true,
    description: 'account to query'
  }
]

ListbwCommand.flags = {
  server: flags.string({char: 's', description: 'EOSIO node. Will use `selectedServer` from user config if defined.'}),
}

module.exports = ListbwCommand
