import { Address, beginCell, toNano } from '@ton/core';
import { Dao } from '../build/Dao/Dao_Dao';
import { NetworkProvider } from '@ton/blueprint';
import { JettonLock } from '../build/Lock/Lock_JettonLock';
import { Proposal } from '../build//Proposal/Proposal_Proposal';

const JETTON_MASTER_ADDRESS = process.env.JETTON_MASTER_ADDRESS;
const PROPOSAL_ID = 1;

export async function run(provider: NetworkProvider) {
  const dao = provider.open(await Dao.fromInit(Address.parse(JETTON_MASTER_ADDRESS!)));
  const lock = provider.open(await JettonLock.fromInit(provider.sender().address!, Address.parse(JETTON_MASTER_ADDRESS!)));

  await lock.send(
    provider.sender(),
    {
      value: toNano('0.1'),
    },
    {
      $$type: 'SendProxyMessage',
      to: dao.address,
      lock_period: null,
      payload: beginCell()
        .storeUint(0x690402, 32)
        .storeUint(PROPOSAL_ID, 64)
        .storeBit(true)
        .endCell()
    }
  );

  await provider.waitForDeploy(dao.address);
}