const ecc = require('eosjs-ecc');

const { flags } = require('@oclif/command')
const Command = require('../base.js')

var Signer = require('@trunx-io/eosio-signer');

global.TextDecoder = require('util').TextDecoder;
global.TextEncoder = require('util').TextEncoder;

class SignCommand extends Command {
  async run() {
    const { flags } = this.parse(SignCommand)
    const { prompt, connectAndSend, uniquify } = this.functions;

    if(!flags.chainid && this.userConfig.selectedChainId) flags.chainid = this.userConfig.selectedChainId;

    let answers, { tx, actor, permission } = flags;

    this.functions.spinner('start', 'fetching data from backend', flags.silent);
    let res = await connectAndSend(this.socketName, 'readStore', { tables: ['accounts','chains','keys'] });
    this.functions.spinner('stop');

    if(!permission) {
      if(this.userConfig.selectedAccountIndex) {
        actor = res.data.accounts[this.userConfig.selectedAccountIndex].account_name
        permission = 'active';
      } else {
        this.error("`permission` flag is missing. See more help with --help");
      }
    } else {
      actor = permission.split('@')[0];
      permission = permission.split('@')[1] || 'active';
    }

    if ( !tx && flags.infile ) {
      // read from file
      tx = this.fs.readFileSync(flags.infile).toString();
    } else if(!tx) {
        answers = await prompt([
          {
            name: 'tx',
            message: 'Input the entire JSON ({}) or ESR (esr://) via editor',
            type: 'editor',
            prefix: this.emoji.get('memo'),
          }
        ])
        tx = answers.tx;
    }

    try { tx = JSON.parse(tx.replace(/^['"](.*)['"]$/, '$1')); }
    catch(e) { if( typeof tx === "string" && !tx.match(/^esr\:\/\//) ) this.error("Invalid JSON object"); }

    if(typeof tx !== "string" && ( !tx.actions || tx.actions.length === 0 ))
      this.error("Transaction must have at least one action");

    let availableKeys, selectedKey, signingKeys = [];

    if(!flags.key && this.userConfig.selectedKey) flags.key = this.userConfig.selectedKey;

    if (!isNaN(flags.key) && flags.key !== '') {
      availableKeys = res.data.keys.filter((x) => {return x.private});
      signingKeys.push(availableKeys[flags.key-1].privatKey)
    } else if (ecc.isValidPrivate(flags.key)) {
      // key is valid private; use key as is
      signingKeys.push(flags.key);
    } else if (ecc.isValidPublic(flags.key)) {
      // key is valid public; check for private key in wallet; error if not present
      selectedKey = res.data.keys.find((x) => {return x.publicKey === flags.key && x.private});
      if (selectedKey) { 
        signingKeys.push(selectedKey.privatKey);
      } else {
        this.error(`unable to find private key for ${flags.key} in wallet database`);
      }
    } else {
      // no key supplied; prompt user to select from available keys in wallet
      availableKeys = res.data.keys.filter((x) => {return x.private});
      let availableKeysFiltered = {};
      availableKeys.map((x, index) => {availableKeysFiltered[index] = x.publicKey});
      answers = await prompt([
        {
          name: 'selectedKeys',
          message: 'Choose key(s) to use for signing:',
          type: 'checkbox',
          choices: availableKeys.map((x, index) => {return {name: ` ${index+1}: ${x.publicKey}`, value: x.privatKey}}),
          prefix: this.emoji.get('key'),
        }
      ])
      signingKeys = signingKeys.concat(answers.selectedKeys);
    }

    if(!signingKeys.length === 0) this.error("no private key found or provided with -k flag. cannot sign transaction");

    signingKeys = signingKeys.filter(uniquify);

    let matchingAccounts = res.data.accounts.filter((acct) => { return acct.account_name === actor });
    matchingAccounts = matchingAccounts.map((acct) => {return {account_name: acct.account_name, chain_id: acct.chain_id}})

    if(matchingAccounts.length === 0 && !flags.chainid) this.error(`unable to find ${actor} in account database`);

    if ( matchingAccounts.length >= 2 && !flags.chainid) {
      answers = await prompt([
        {
          name: 'chain_id',
          message: 'Select an account:',
          choices: matchingAccounts.map((x) => {return {name: `${x.account_name} - ${x.chain_id}`, value: x.chain_id}}),
          type: 'rawlist',
          prefix: this.emoji.get('bust_in_silhouette'),
        }
      ]);
    }

    flags.chainid = flags.chainid || answers && answers.chain_id || matchingAccounts[0].chain_id;

    const allChains = res.data.chains;
    const chain = allChains.find((x) => {return x.chain_id == flags.chainid});

    const opts = {
      signingKeys,
      chain_id: chain.chain_id,
      server: chain.server,
      signer: {actor, permission},
    }

    const signer = new Signer(opts);

    // send tx to background service for signing
    this.functions.spinner('start', 'signing transaction', flags.silent);
    res = await signer.signTransaction(tx)
    this.functions.spinner('stop');

    const { transaction, serializedTransaction } = res;

    // write signed transaction to file
    if (flags.outfile) this.fs.writeFileSync(flags.outfile, JSON.stringify(transaction));

    let result, error;

    // broadcast signed transaction
    if (flags.broadcast) {
      try {
        this.functions.spinner('start', 'broadcasting transaction', flags.silent);
        result = await signer.broadcastTransaction(res.transaction, res.serializedTransaction);
      } catch(e) {
        error = e;
      } finally {
        this.functions.spinner('stop');
      }
    } else {
      result = transaction;
    }

    if(error){
      this.log(`Unable to broadcast transaction: ${error}`, "error");
    } else {
      this.log({result});
    }

    return {data: result, error};
  }
}

SignCommand.description = `Sign a JSON transaction
Sign, and optionally broadcast, a transaction in JSON format.
`

SignCommand.flags = {
  ...Command.flags,
  tx: flags.string({ char: 't', description: 'stringified JSON or ESR transaction' }),
  infile: flags.string({ char: 'i', description: 'absolute path to file containing unsigned transaction' }),
}

module.exports = SignCommand
