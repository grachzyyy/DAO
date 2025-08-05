import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Storage } from '../build/Storage/Storage_Storage';
import '@ton/test-utils';

describe('Storage', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let storage: SandboxContract<Storage>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        storage = blockchain.openContract(await Storage.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await storage.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: storage.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and storage are ready to use
    });
});
