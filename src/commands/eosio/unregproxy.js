const {flags} = require('@oclif/command')
const Command = require('../base.js')

class UnregproxyCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(UnregproxyCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'regproxy',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.proxy,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          proxy: args.proxy,
          isproxy: false
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.proxy}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

UnregproxyCommand.hidden = false;

UnregproxyCommand.description = `Register an existing user account as a proxy for voting.
...
Register an existing user account as a proxy for voting.
`

UnregproxyCommand.args = [
  {
    name: 'proxy',
    required: true,
    description: 'account to unregister as a proxy'
  },
]

UnregproxyCommand.flags = {
  ...Command.flags,
}

module.exports = UnregproxyCommand
