const {flags} = require('@oclif/command')
const Command = require('../base.js')

class ClaimrewardsCommand extends Command {
  async init() {
    super.init();
    this.sign = require('./sign');
  }

  async run() {
    const {args, flags} = this.parse(ClaimrewardsCommand)

    const tx = {
      actions: [{
        account: 'eosio',
        name: 'claimrewards',
        authorization: [{
          actor: flags.permission ? flags.permission.split('@')[0] : this.userConfig.selectedAccount || args.owner,
          permission: flags.permission ? flags.permission.split('@')[1] || "active" : "active"
        }],
        data: {
          owner: args.owner,
        }
      }],
      expiration: this.timestamp
    };

    return await this.sign.run([
      '--permission', flags.permission || `${args.owner}@active`,
      '--tx', JSON.stringify(tx),
      '--key', flags.key ? flags.key : '',
      '--chainid', flags.chainid ? flags.chainid : '',
      '--outfile', flags.outfile ? flags.outfile : '',
      flags.broadcast ? '--broadcast' : '--no-broadcast',
    ])

  }
}

ClaimrewardsCommand.hidden = false;

ClaimrewardsCommand.description = `Claim producer rewards.
...
Claim producer rewards.
`

ClaimrewardsCommand.args = [
  {
    name: 'owner',
    required: true,
    description: 'account to claim rewards for'
  },
]

ClaimrewardsCommand.flags = {
  ...Command.flags,
}

module.exports = ClaimrewardsCommand
