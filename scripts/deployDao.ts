import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { Minter } from '../build/Dao/Dao_Minter';

const JETTON_MASTER_ADDRESS = process.env.JETTON_MASTER_ADDRESS;

export async function run(provider: NetworkProvider) {
    const minter = provider.open(await Minter.fromInit());

    await minter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'DeployDao',
            query_id: 0n,
            jetton_master: Address.parse(JETTON_MASTER_ADDRESS!)
        }
    );
}