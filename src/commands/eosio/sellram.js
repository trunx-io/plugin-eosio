const {flags} = require('@oclif/command')
const Command = require('../base.js')

class SellramCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(SellramCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'sellram',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.account,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          account: args.account,
          bytes: args.bytes,
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.account}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

SellramCommand.hidden = false;

SellramCommand.description = `Buy RAM.
...
Buy RAM.
`

SellramCommand.args = [
  {
    name: 'account',
    required: true,
    description: 'account receiving tokens for sold RAM'
  },
  {
    name: 'bytes',
    required: true,
    description: 'number of RAM bytes to sell (must be in increments of 1024 on UTX network)'
  },
]

SellramCommand.flags = {
  ...Command.flags,
}

module.exports = SellramCommand
