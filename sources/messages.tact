message(0x7362d09c) JettonTransferNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forward_payload: Slice as remaining;
}

message(0x0f8a7ea5) JettonTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}
message(0x2c76b973) ProvideWalletAddress {
    query_id: Int as uint64;
    owner_address: Address;
    include_address: Bool;
}
// Response with the wallet address for a jetton owner
message(0xd1735400) TakeWalletAddress {
    query_id: Int as uint64;
    wallet_address: Address;
    owner_address: Slice as remaining;
}

struct ProposalPayload {
    receiver: Address;
    body: Cell;
}

struct ProposalData {
    proposal_id: Int as uint64;
    is_initialized: Bool;
    is_executed: Bool;
    votes_yes: Int as coins;
    votes_no: Int as coins;
    expires_at: Int as uint64;
    payload: ProposalPayload?;
}

struct VoterData {
    proposal: Address;
    owner: Address;
    is_initialized: Bool;
    amount: Int as coins;
    expires_at: Int as uint64;
}

message(0x690001) DeploySkipper {
    query_id: Int as uint64;
    jetton_master: Address;
}

//Lock messages 

message(0x690101) SendProxyMessage {
    to: Address;
    lock_period: Int? as uint64;
    payload: Cell;
}
// Message for proxying actions with lock and voting data
message(0x690102) ProxyMessage {
    owner: Address;
    lock_period: Int? as uint64;
    voter_unlock_date: Int as uint64;
    amount: Int as coins;
    payload: Cell;
}
// Message to unlock jettons
message(0x690103) UnlockJettons {
}
// Message to lock jettons for a specified period
message(0x690104) LockJettons {
    lock_period: Int as uint64;
}

//Proposal messages

// Message to initialize a new proposal
message(0x690201) InitProposal {
    initiator: Address;
    amount: Int as coins;
    payload: ProposalPayload;
    lock_period: Int? as uint64;
}
// Message to update votes for a proposal
message(0x690202) UpdateVotes {
    owner: Address;
    amount: Int as coins;
    vote: Int as uint1;
    voter_unlock_date: Int as uint64;
}
// Message to execute a proposal after voting ends
message(0x690203) ExecuteProposal {
}

// Voter

// Message to initialize a new voter for a proposal
message(0x690301) InitVoter {
    amount: Int as coins;
    expires_at: Int as uint64;
}
// Message to update voter's balance and vote
message(0x690302) UpdateVoterBalance {
    amount: Int as coins;
    vote: Int as uint1;
    voter_unlock_date: Int as uint64;
}

//Skipper 

// Message to request creation of a new proposal via Skipper
message(0x690401) RequestNewProposal {
    payload: ProposalPayload;
}
// Message to vote for a proposal via Skipper
message(0x690402) VoteForProposal {
    proposal_id: Int as uint64;
    vote: Int as uint1;
}
message(0x690403) DeployLock {
    query_id: Int as uint64;
    owner: Address;
}