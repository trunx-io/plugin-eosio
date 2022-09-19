const {flags} = require('@oclif/command')
const Command = require('../base.js')

class RegproducerCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(RegproducerCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'regproducer',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.producer,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          producer: args.producer,
          producer_key: args.producer_key,
          url: args.url || '',
          location: args.location || 0
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

RegproducerCommand.hidden = false;

RegproducerCommand.description = `Register an existing user account as a block producer.
...
Register an existing user account as a block producer.
`

RegproducerCommand.args = [
  {
    name: 'producer',
    required: true,
    description: 'account to register as a producer'
  },
  {
    name: 'producer_key',
    required: true,
    description: 'public key to use for signing'
  },
  {
    name: 'url',
    required: false,
    description: 'url with information about the producer'
  },
  {
    name: 'location',
    required: false,
    description: 'relative location; for nearest neighbor scheduling'
  }
]

RegproducerCommand.flags = {
  ...Command.flags,
}

module.exports = RegproducerCommand
