@trunx-io/plugin-eosio
==========

Plugin containing EOSIO commands for TrunxIO Wallet

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/trunx-io/plugin-eosio.svg)](https://npmjs.org/package/trunx-io/plugin-eosio)
[![Downloads/week](https://img.shields.io/npm/dw/trunx-io/plugin-eosio.svg)](https://npmjs.org/package/trunx-io/plugin-eosio)
[![License](https://img.shields.io/npm/l/trunx-io/plugin-eosio.svg)](https://github.com/Trunx-IO/plugin-eosio/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @trunx-io/plugin-eosio
$ @trunx-io/plugin-eosio COMMAND
running command...
$ @trunx-io/plugin-eosio (-v|--version|version)
@trunx-io/plugin-eosio/1.0.1 darwin-arm64 node-v18.4.0
$ @trunx-io/plugin-eosio --help [COMMAND]
USAGE
  $ @trunx-io/plugin-eosio COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`@trunx-io/plugin-eosio eosio:buyram PAYER RECEIVER AMOUNT`](#trunx-ioplugin-eosio-eosiobuyram-payer-receiver-amount)
* [`@trunx-io/plugin-eosio eosio:claimrewards OWNER`](#trunx-ioplugin-eosio-eosioclaimrewards-owner)
* [`@trunx-io/plugin-eosio eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY`](#trunx-ioplugin-eosio-eosiodelegatebw-from-receiver-stake_net_quantity-stake_cpu_quantity)
* [`@trunx-io/plugin-eosio eosio:fetch`](#trunx-ioplugin-eosio-eosiofetch)
* [`@trunx-io/plugin-eosio eosio:listbw ACCOUNT`](#trunx-ioplugin-eosio-eosiolistbw-account)
* [`@trunx-io/plugin-eosio eosio:listproducers`](#trunx-ioplugin-eosio-eosiolistproducers)
* [`@trunx-io/plugin-eosio eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]`](#trunx-ioplugin-eosio-eosioregproducer-producer-producer_key-url-location)
* [`@trunx-io/plugin-eosio eosio:regproxy PROXY`](#trunx-ioplugin-eosio-eosioregproxy-proxy)
* [`@trunx-io/plugin-eosio eosio:sellram ACCOUNT BYTES`](#trunx-ioplugin-eosio-eosiosellram-account-bytes)
* [`@trunx-io/plugin-eosio eosio:transfer FROM TO QUANTITY [MEMO]`](#trunx-ioplugin-eosio-eosiotransfer-from-to-quantity-memo)
* [`@trunx-io/plugin-eosio eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY`](#trunx-ioplugin-eosio-eosioundelegatebw-from-receiver-unstake_net_quantity-unstake_cpu_quantity)
* [`@trunx-io/plugin-eosio eosio:unregproducer PRODUCER`](#trunx-ioplugin-eosio-eosiounregproducer-producer)
* [`@trunx-io/plugin-eosio eosio:unregproxy PROXY`](#trunx-ioplugin-eosio-eosiounregproxy-proxy)
* [`@trunx-io/plugin-eosio eosio:voteproducer SUBCOMMAND VOTER PRODUCER`](#trunx-ioplugin-eosio-eosiovoteproducer-subcommand-voter-producer)
* [`@trunx-io/plugin-eosio esr:decode TX`](#trunx-ioplugin-eosio-esrdecode-tx)
* [`@trunx-io/plugin-eosio esr:encode TX`](#trunx-ioplugin-eosio-esrencode-tx)

## `@trunx-io/plugin-eosio eosio:buyram PAYER RECEIVER AMOUNT`

Buy RAM.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:buyram PAYER RECEIVER AMOUNT

ARGUMENTS
  PAYER     account paying for the RAM
  RECEIVER  account receiving the bought resources
  AMOUNT    amount of tokens to pay for RAM

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Buy RAM.
```

_See code: [src/commands/eosio/buyram.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/buyram.js)_

## `@trunx-io/plugin-eosio eosio:claimrewards OWNER`

Claim producer rewards.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:claimrewards OWNER

ARGUMENTS
  OWNER  account to claim rewards for

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Claim producer rewards.
```

_See code: [src/commands/eosio/claimrewards.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/claimrewards.js)_

## `@trunx-io/plugin-eosio eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY`

Delegate bandwidth to a user account

```
USAGE
  $ @trunx-io/plugin-eosio eosio:delegatebw FROM RECEIVER STAKE_NET_QUANTITY STAKE_CPU_QUANTITY

ARGUMENTS
  FROM                account to delegate from
  RECEIVER            account to delegate to
  STAKE_NET_QUANTITY  token amount to stake for NET
  STAKE_CPU_QUANTITY  token amount to stake for CPU

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

  -t, --transfer               transfer voting and staking rights to account

DESCRIPTION
  ...
  Delegate bandwidth to a user account
```

_See code: [src/commands/eosio/delegatebw.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/delegatebw.js)_

## `@trunx-io/plugin-eosio eosio:fetch`

Fetch some data from an EOSIO/DFuse endpoint

```
USAGE
  $ @trunx-io/plugin-eosio eosio:fetch

OPTIONS
  -d, --data=data          json formatted string of data to query
  -e, --endpoint=endpoint  (required) endpoint to query (do not include server; use -s flag to specify server)
  -s, --server=server      EOSIO node

DESCRIPTION
  Fetch some data from an EOSIO/DFuse endpoint.
```

_See code: [src/commands/eosio/fetch.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/fetch.js)_

## `@trunx-io/plugin-eosio eosio:listbw ACCOUNT`

List bandwidth for the user account

```
USAGE
  $ @trunx-io/plugin-eosio eosio:listbw ACCOUNT

ARGUMENTS
  ACCOUNT  account to query

OPTIONS
  -s, --server=server  EOSIO node. Will use `selectedServer` from user config if defined.

DESCRIPTION
  ...
  List bandwidth for the user account
```

_See code: [src/commands/eosio/listbw.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/listbw.js)_

## `@trunx-io/plugin-eosio eosio:listproducers`

List block producers

```
USAGE
  $ @trunx-io/plugin-eosio eosio:listproducers

OPTIONS
  -l, --lower_bound=lower_bound  lower bound of query results; used for pagination
  -n, --limit=limit              [default: 10] number of producers to return
  -s, --server=server            EOSIO node

DESCRIPTION
  ...
  List block producers
```

_See code: [src/commands/eosio/listproducers.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/listproducers.js)_

## `@trunx-io/plugin-eosio eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]`

Register an existing user account as a block producer.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:regproducer PRODUCER PRODUCER_KEY [URL] [LOCATION]

ARGUMENTS
  PRODUCER      account to register as a producer
  PRODUCER_KEY  public key to use for signing
  URL           url with information about the producer
  LOCATION      relative location; for nearest neighbor scheduling

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a block producer.
```

_See code: [src/commands/eosio/regproducer.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/regproducer.js)_

## `@trunx-io/plugin-eosio eosio:regproxy PROXY`

Register an existing user account as a proxy for voting.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:regproxy PROXY

ARGUMENTS
  PROXY  account to register as a proxy

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a proxy for voting.
```

_See code: [src/commands/eosio/regproxy.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/regproxy.js)_

## `@trunx-io/plugin-eosio eosio:sellram ACCOUNT BYTES`

Buy RAM.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:sellram ACCOUNT BYTES

ARGUMENTS
  ACCOUNT  account receiving tokens for sold RAM
  BYTES    number of RAM bytes to sell (must be in increments of 1024 on UTX network)

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Buy RAM.
```

_See code: [src/commands/eosio/sellram.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/sellram.js)_

## `@trunx-io/plugin-eosio eosio:transfer FROM TO QUANTITY [MEMO]`

Transfer tokens from one account to another.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:transfer FROM TO QUANTITY [MEMO]

ARGUMENTS
  FROM      account sending tokens
  TO        account receiving tokens
  QUANTITY  amount of tokens to send
  MEMO      memo attached to the transfer

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Transfer tokens from one account to another.
```

_See code: [src/commands/eosio/transfer.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/transfer.js)_

## `@trunx-io/plugin-eosio eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY`

Undelegate bandwidth for the user account

```
USAGE
  $ @trunx-io/plugin-eosio eosio:undelegatebw FROM RECEIVER UNSTAKE_NET_QUANTITY UNSTAKE_CPU_QUANTITY

ARGUMENTS
  FROM                  account to undelegate from
  RECEIVER              account to undelegate to
  UNSTAKE_NET_QUANTITY  token amount to unstake for NET
  UNSTAKE_CPU_QUANTITY  token amount to unstake for CPU

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Undelegate bandwidth for the user account
```

_See code: [src/commands/eosio/undelegatebw.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/undelegatebw.js)_

## `@trunx-io/plugin-eosio eosio:unregproducer PRODUCER`

Unregister an account from being a block producer.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:unregproducer PRODUCER

ARGUMENTS
  PRODUCER  account to register as a producer

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Unregister an account from being a block producer.
```

_See code: [src/commands/eosio/unregproducer.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/unregproducer.js)_

## `@trunx-io/plugin-eosio eosio:unregproxy PROXY`

Register an existing user account as a proxy for voting.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:unregproxy PROXY

ARGUMENTS
  PROXY  account to unregister as a proxy

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Register an existing user account as a proxy for voting.
```

_See code: [src/commands/eosio/unregproxy.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/unregproxy.js)_

## `@trunx-io/plugin-eosio eosio:voteproducer SUBCOMMAND VOTER PRODUCER`

Vote to approve or unapprove a producer or proxy.

```
USAGE
  $ @trunx-io/plugin-eosio eosio:voteproducer SUBCOMMAND VOTER PRODUCER

ARGUMENTS
  SUBCOMMAND  specify the subcommand to use: [prods, proxy, approve, unapprove]. see help for more info.
  VOTER       account used to vote for a producer
  PRODUCER    producer (or proxy) to vote for (existing votes will not be changed)

OPTIONS
  -b, --[no-]broadcast         broadcast transaction after signing
  -c, --chainid=chainid        Chain ID to use for signing (for accounts on multiple chains)
  -k, --key=key                key used to sign the transaction (index/public/private: if public must exist in wallet)
  -o, --outfile=outfile        absolute path to file to output the signed transaction

  -p, --permission=permission  account@permission used to sign transaction. default permission is "actor@active" if not
                               supplied.

DESCRIPTION
  ...
  Vote for producers or set a voting proxy.
  Subcommands: [prods, proxy, approve, unapprove]
  	- 'proxy': Vote your stake through a proxy
  	- 'prods': Vote for one or more producers
  	- 'approve': Add one producer to list of voted producers
  	- 'unapprove': Remove one producer from list of voted producers
```

_See code: [src/commands/eosio/voteproducer.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/eosio/voteproducer.js)_

## `@trunx-io/plugin-eosio esr:decode TX`

Parse ESR transaction and print the raw result

```
USAGE
  $ @trunx-io/plugin-eosio esr:decode TX

ARGUMENTS
  TX  Transaction in ESR format

OPTIONS
  -p, --permission=permission  [default: ............1,............2] account@permission used to sign transaction.
  -s, --server=server          [default: https://eos.greymass.com] EOSIO node used for fetching ABIs

DESCRIPTION
  Parse ESR transaction and print the raw result.
```

_See code: [src/commands/esr/decode.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/esr/decode.js)_

## `@trunx-io/plugin-eosio esr:encode TX`

Encode EOSIO transaction as Singing Request

```
USAGE
  $ @trunx-io/plugin-eosio esr:encode TX

ARGUMENTS
  TX  EOSIO Transaction in JSON format

OPTIONS
  -s, --server=server  EOSIO node used for fetching ABIs and chain_id. Defaults to: https://eos.greymass.com

DESCRIPTION
  Encode EOSIO transaction as Singing Request.
```

_See code: [src/commands/esr/encode.js](https://github.com/Trunx-IO/plugin-eosio/blob/v1.0.1/src/commands/esr/encode.js)_
<!-- commandsstop -->
