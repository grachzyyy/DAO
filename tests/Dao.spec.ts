import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Dao } from '../build/Dao/Dao_Dao';
import '@ton/test-utils';

describe('Dao', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let dao: SandboxContract<Dao>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        dao = blockchain.openContract(await Dao.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await dao.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: dao.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and dao are ready to use
    });
});
