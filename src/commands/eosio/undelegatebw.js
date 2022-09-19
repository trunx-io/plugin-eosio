const {flags} = require('@oclif/command')
const Command = require('../base.js')

class UndelegatebwCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(UndelegatebwCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'undelegatebw',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.from,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          from: args.from,
          receiver: args.receiver,
          unstake_net_quantity: args.unstake_net_quantity,
          unstake_cpu_quantity: args.unstake_cpu_quantity
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

UndelegatebwCommand.hidden = false;

UndelegatebwCommand.description = `Undelegate bandwidth for the user account
...
Undelegate bandwidth for the user account
`

UndelegatebwCommand.args = [
  {
    name: 'from',
    required: true,
    description: 'account to undelegate from'
  },
  {
    name: 'receiver',
    required: true,
    description: 'account to undelegate to'
  },
  {
    name: 'unstake_net_quantity',
    required: true,
    description: 'token amount to unstake for NET'
  },
  {
    name: 'unstake_cpu_quantity',
    required: true,
    description: 'token amount to unstake for CPU'
  }
]


UndelegatebwCommand.flags = {
  ...Command.flags,
}

module.exports = UndelegatebwCommand
