const {flags} = require('@oclif/command')
const Command = require('../base.js')

class DelegatebwCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(DelegatebwCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.from,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          from: args.from,
          receiver: args.receiver,
          stake_net_quantity: args.stake_net_quantity,
          stake_cpu_quantity: args.stake_cpu_quantity,
          transfer: flags.transfer
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.from}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

DelegatebwCommand.hidden = false;

DelegatebwCommand.description = `Delegate bandwidth to a user account
...
Delegate bandwidth to a user account
`

DelegatebwCommand.args = [
  {
    name: 'from',
    required: true,
    description: 'account to delegate from'
  },
  {
    name: 'receiver',
    required: true,
    description: 'account to delegate to'
  },
  {
    name: 'stake_net_quantity',
    required: true,
    description: 'token amount to stake for NET'
  },
  {
    name: 'stake_cpu_quantity',
    required: true,
    description: 'token amount to stake for CPU'
  }
]

DelegatebwCommand.flags = {
  ...Command.flags,
  transfer: flags.boolean({char: 't', description: 'transfer voting and staking rights to account', default: false}),
}

module.exports = DelegatebwCommand
