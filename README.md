# DAO v1

## info

"Dao" is a modular smart contract framework for building Decentralized Autonomous Organizations on the TON blockchain, written in Tact.

It allows communities to manage treasury, vote on proposals, and coordinate governance decisions using jetton-based voting power.

### Overview (more in future project documentation)
Enables onchain DAO governance with the following flow:

- Jetton holders lock their tokens to participate in governance.

- Participants create proposals (e.g. transfer funds, whitelist address).

- Other token holders vote FOR or AGAINST the proposal.

- If the proposal meets the required quorum and support threshold, it is executed onchain.

`⚖️ Voting power is proportional to the amount of jettons locked by the participant.`

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
