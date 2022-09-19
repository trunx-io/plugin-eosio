const fetch = require('node-fetch');
const {flags} = require('@oclif/command')
const Command = require('../base.js')

class FetchCommand extends Command {
  async run() {
    const {flags} = this.parse(FetchCommand)

    const server = flags.server || this.userConfig.selectedServer || 'https://eos.greymass.com';

    const api_endpoint = `${server.replace(/\/$/,'')}/${flags.endpoint.replace(/^\//,'')}`
    const query = JSON.stringify({...JSON.parse(flags.data), json: true});
    const response = await fetch(api_endpoint, {method: flags.data ? 'POST' : 'GET', body: query});
    const json = await response.json();

    this.log(json);
  }
}

FetchCommand.hidden = false;

FetchCommand.description = `Fetch some data from an EOSIO/DFuse endpoint
Fetch some data from an EOSIO/DFuse endpoint.
`

FetchCommand.flags = {
  server: flags.string({char: 's', description: 'EOSIO node'}),
  data: flags.string({ char: 'd', description: 'json formatted string of data to query' }),
  endpoint: flags.string({ char: 'e', description: 'endpoint to query (do not include server; use -s flag to specify server)', required: true })
}

module.exports = FetchCommand
