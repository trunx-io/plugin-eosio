const {flags} = require('@oclif/command')
const Command = require('../base.js')

class UnregproducerCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(UnregproducerCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'unregprod',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.producer,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          producer: args.producer,
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.producer}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

UnregproducerCommand.hidden = false;

UnregproducerCommand.description = `Unregister an account from being a block producer.
...
Unregister an account from being a block producer.
`

UnregproducerCommand.args = [
  {
    name: 'producer',
    required: true,
    description: 'account to register as a producer'
  },
]

UnregproducerCommand.flags = {
  ...Command.flags,
}

module.exports = UnregproducerCommand
