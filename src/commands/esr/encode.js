const {flags} = require('@oclif/command')
const Command = require('../base.js')

const { JsonRpc, Api } = require('eosjs')
const { base64ToBinary } = require('eosjs/dist/eosjs-numeric');

const fetch = require('node-fetch')
const zlib = require('zlib')

const { SigningRequest } = require("eosio-signing-request")

class EncodeCommand extends Command {
  async run() {
    const {args, flags} = this.parse(EncodeCommand)

    const server = flags.server || this.userConfig.selectedServer || 'https://eos.greymass.com';

    const rpc = new JsonRpc(server, { fetch })
    const eos = new Api({ rpc })

    let chainId = (await rpc.get_info()).chain_id;
    let transaction = args.tx;

    // options for the signing request
    const opts = {
        // zlib string compression (optional, recommended)
        zlib: {
            deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
            inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
        },
        // Customizable ABI Provider used to retrieve contract data
        abiProvider: {
            getAbi: async (account) => {
                try{
                    return await eos.getAbi(account)
                } catch(e){
                    return require('../../components/esrAbi');
                }
            }
        }
    }

    const res = await SigningRequest.create({chainId, transaction}, opts);
    this.log(res);
  }
}

EncodeCommand.hidden = false;

EncodeCommand.args = [
  {
    name: 'tx',
    required: true,
    description: 'EOSIO Transaction in JSON format',
    parse: input => JSON.parse(input)
  }
]

EncodeCommand.description = `Encode EOSIO transaction as Singing Request
Encode EOSIO transaction as Singing Request.
`

EncodeCommand.flags = {
  server: flags.string({char: 's', description: 'EOSIO node used for fetching ABIs and chain_id. Defaults to: https://eos.greymass.com'}),
  // ...Command.flags
}

module.exports = EncodeCommand
