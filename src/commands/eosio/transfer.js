const {flags} = require('@oclif/command')
const Command = require('../base.js')

class TransferCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(TransferCommand)

    const tx = {
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.from,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          from: args.from,
          to: args.to,
          quantity: args.quantity,
          memo: args.memo,
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

TransferCommand.hidden = false;

TransferCommand.description = `Transfer tokens from one account to another.
...
Transfer tokens from one account to another.
`

TransferCommand.args = [
  {
    name: 'from',
    required: true,
    description: 'account sending tokens'
  },
  {
    name: 'to',
    required: true,
    description: 'account receiving tokens'
  },
  {
    name: 'quantity',
    required: true,
    description: 'amount of tokens to send'
  },
  {
    name: 'memo',
    required: false,
    default: "",
    description: 'memo attached to the transfer'
  },
]

TransferCommand.flags = {
  ...Command.flags,
}

module.exports = TransferCommand
