const { Command, flags } = require('@oclif/command');

class Base extends Command {

  init(){
    this.path = require('path');
    this.fs = require('fs-extra');
    this.emoji = require('node-emoji');
    this.functions = require('../components/common.js');

    const { flags } = this.parse(this.constructor)
    this.flags = flags;
    this.socketName = flags.socketName;

    this.userConfig = this.getUserConfig();
    this.timestamp = new Date(Date.now() + 60000).toISOString().replace("Z","");
  }

  getUserConfig() {
    var userConfig = {};
    var configFile = this.path.join(this.config.configDir.replace('plugin-eosio', 'cli'), 'config.json');
    if ( this.fs.existsSync(configFile) ) userConfig = this.fs.readJSONSync(configFile);
    return userConfig;
  }

  log(msg, level="info") {
    if( this.flags.silent ) return;

    let obj = {};

    if (level === "error") {
      obj["error"] = msg;
    } else {
      obj["data"] = msg;
    }

    console.log(JSON.stringify(obj))
  }

}

Base.hidden = true;

Base.flags = {
  silent: flags.boolean({ description: 'silence all logs to stdout and stderr', hidden: true }),
  permission: flags.string({ char: 'p', description: 'account@permission used to sign transaction. default permission is "actor@active" if not supplied.' }),
  key: flags.string({ char: 'k', description: 'key used to sign the transaction (index/public/private: if public must exist in wallet)' }),
  chainid: flags.string({char: 'c', description: 'Chain ID to use for signing (for accounts on multiple chains)'}),
  outfile: flags.string({ char: 'o', description: 'absolute path to file to output the signed transaction' }),
  broadcast: flags.boolean({ char: 'b', description: 'broadcast transaction after signing', default: false, allowNo: true }),
  socketName: flags.string({ description: 'broadcast transaction after signing', hidden: true, default: 'trunxio1' }),
}

module.exports = Base;
