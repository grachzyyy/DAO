import { Address, beginCell, toNano } from '@ton/core';
import { Dao } from '../build/Dao/Dao_Dao';
import { NetworkProvider } from '@ton/blueprint';
import { JettonLock } from '../build/Lock/Lock_JettonLock';

const JETTON_MASTER_ADDRESS = process.env.JETTON_MASTER_ADDRESS;
const PROPOSAL_RECEIVER_ADDRESS = "UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ";

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
        .storeUint(0x690401, 32)
        .storeAddress(Address.parse(PROPOSAL_RECEIVER_ADDRESS))
        .storeRef(beginCell().endCell())
        .endCell()
    }
  );

  await provider.waitForDeploy(dao.address);
}