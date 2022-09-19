const {flags} = require('@oclif/command')
const Command = require('../base.js')

class VoteproducerCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(VoteproducerCommand)

    var res = await this.functions.connectAndSend(this.socketName, 'readStore', { tables: ['accounts'] });

    const accounts = res.data ? res.data.accounts : [];
    const voter = accounts.find((x) => {return x.account_name === args.voter});
    var filtered_producers = (voter.voter_info && voter.voter_info.producers) || [];

    var actionData;

    switch(args.subcommand) {
      case 'proxy':
        actionData = {
          voter: args.voter,
          proxy: args.producer,
          producers: [],
        }
        break;
      case 'prods':
        actionData = {
          voter: args.voter,
          proxy: '...',
          producers: this.argv.splice(2),
        }
        break;
      case 'approve':
      case 'unapprove':
        if(args.subcommand === 'approve') {
          if(filtered_producers.indexOf(args.producer) === -1) filtered_producers.push(args.producer)
        } else if(args.subcommand === 'approve') {
          filtered_producers = filtered_producers.filter((x) => {return x !== args.producer})
        }

        actionData = {
          voter: args.voter,
          proxy: flags.proxy ? args.producer : '...',
          producers: filtered_producers.sort(),
        }
        break;
      default:
        this.error("Invalid SUBCOMMAND. Must be one of: proxy, prods, approve, unapprove. See help for more info.")
    }

    var tx = {
      actions: [{
        account: 'eosio',
        name: 'voteproducer',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.voter,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: actionData
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.voter}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}


VoteproducerCommand.strict = false; // disable argument validation for list of producers
VoteproducerCommand.hidden = false;

VoteproducerCommand.description = `Vote to approve or unapprove a producer or proxy.
...
Vote for producers or set a voting proxy.
Subcommands: [prods, proxy, approve, unapprove]
\t- 'proxy': Vote your stake through a proxy
\t- 'prods': Vote for one or more producers
\t- 'approve': Add one producer to list of voted producers
\t- 'unapprove': Remove one producer from list of voted producers
`

VoteproducerCommand.args = [
  {
    name: 'subcommand',
    required: true,
    description: 'specify the subcommand to use: [prods, proxy, approve, unapprove]. see help for more info.'
  },
  {
    name: 'voter',
    required: true,
    description: 'account used to vote for a producer'
  },
  {
    name: 'producer',
    required: true,
    multiple: true,
    description: 'producer (or proxy) to vote for (existing votes will not be changed)'
  },
]

VoteproducerCommand.flags = {
  ...Command.flags,
}

module.exports = VoteproducerCommand
