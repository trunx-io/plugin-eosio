const {flags} = require('@oclif/command')
const Command = require('../base.js')

const { JsonRpc, Api } = require('eosjs')
const { base64ToBinary } = require('eosjs/dist/eosjs-numeric');

const fetch = require('node-fetch')
const zlib = require('zlib')

const { SigningRequest } = require("eosio-signing-request")

class DecodeCommand extends Command {
  async run() {
    const {args, flags} = this.parse(DecodeCommand)

    let [actor, permission] = flags.permission;

    let server = flags.server || this.userConfig.selectedServer || 'https://eos.greymass.com';
    const rpc = new JsonRpc(server, { fetch })
    const eos = new Api({ rpc })

    const opts = {
        // zlib string compression (optional, recommended)
        zlib: {
            deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
            inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
        },
        // Customizable ABI Provider used to deserialize contract data
        abiProvider: {
            getAbi: async (account) => (await eos.getAbi(account))
        }
    }

    // Decode the URI
    const decoded = SigningRequest.from(args.tx, opts)

    // In order to resolve the transaction, we need a recent block
    const head = await rpc.get_info(true);
    const block = await rpc.get_block(head.head_block_num);

    // manually set ref_block_num to avoid error in @greymass/eosio module in types.ts UInt16
    block.ref_block_num = block.block_num & 0xffff;
    // manually set expiration to satisfy tapos requirements
    block.expiration = new Date()
    block.expiration.setUTCHours(block.expiration.getUTCHours() + 1)

    // Fetch the ABIs needed for decoding
    const abis = await decoded.fetchAbis();

    // Resolve the transaction as a specific user
    const resolved = await decoded.resolve(abis, { actor, permission }, block);

    this.log(resolved)
  }
}

DecodeCommand.hidden = false;

DecodeCommand.args = [
  {
    name: 'tx',
    required: true,
    description: 'Transaction in ESR format'
  }
]

DecodeCommand.description = `Parse ESR transaction and print the raw result
Parse ESR transaction and print the raw result.
`

DecodeCommand.flags = {
  server: flags.string({char: 's', description: 'EOSIO node used for fetching ABIs', default: "https://eos.greymass.com"}),
  permission: flags.string({
    char: 'p',
    description: 'account@permission used to sign transaction.',
    parse: input => {
        let [actor,permission] = input.split("@");
        return [actor||'............1', permission||'............2'];
    },
    default: ['............1','............2']
}),
  socketName: Command.flags.socketName
}

module.exports = DecodeCommand
