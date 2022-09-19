const {flags} = require('@oclif/command')
const Command = require('../base.js')

class BuyramCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(BuyramCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'buyram',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.payer,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          payer: args.payer,
          receiver: args.receiver,
          quant: args.amount,
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.payer}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

BuyramCommand.hidden = false;

BuyramCommand.description = `Buy RAM.
...
Buy RAM.
`

BuyramCommand.args = [
  {
    name: 'payer',
    required: true,
    description: 'account paying for the RAM'
  },
  {
    name: 'receiver',
    required: true,
    description: 'account receiving the bought resources'
  },
  {
    name: 'amount',
    required: true,
    description: 'amount of tokens to pay for RAM'
  },
]

BuyramCommand.flags = {
  ...Command.flags,
}

module.exports = BuyramCommand
