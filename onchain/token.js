const debug = require('debug')('cornfield-hackathon:server');
const { HttpAgent, Actor } = require("@dfinity/agent");
const initIdentity = require('../onchain/identity');
const idlFactory = require('./idlFactory');

const Wallet = async () => {
    const canisterId = 'rrkah-fqaaa-aaaaa-aaaaq-cai';
    const identity = initIdentity();

    const agent = new HttpAgent({identity, fetch, host: "http://127.0.0.1:8000" });
    await agent.fetchRootKey();

    return Actor.createActor(idlFactory, {
        agent,
        canisterId
    });
}
(async () =>{
    try {
        module.exports = await Wallet();
    } catch (e) {
        debug("Connect canister error")
    }
})()

