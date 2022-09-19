const {flags} = require('@oclif/command')
const Command = require('../base.js')

class RegproxyCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(RegproxyCommand)

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
          isproxy: true
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

RegproxyCommand.hidden = false;

RegproxyCommand.description = `Register an existing user account as a proxy for voting.
...
Register an existing user account as a proxy for voting.
`

RegproxyCommand.args = [
  {
    name: 'proxy',
    required: true,
    description: 'account to register as a proxy'
  },
]

RegproxyCommand.flags = {
  ...Command.flags,
}

module.exports = RegproxyCommand
