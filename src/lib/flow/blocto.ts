// @ts-nocheck
import * as fcl from '@blocto/fcl';
import * as t from '@onflow/types';
import { flowUser } from './stores';
import { browser } from '$app/environment';

export const config = fcl.config({
	'accessNode.api': 'https://rest-testnet.onflow.org',
	'discovery.wallet': 'https://flow-wallet-testnet.blocto.app/api/flow/authn',
	'discovery.wallet.method': 'HTTP/POST',
	'challenge.handshake': 'https://flow-wallet-testnet.blocto.app/authn/-/samuelbouliane@gmail.com'
});

export const testnetContractAddress = '0xf733999e4619eaaa';

if (browser) {
	fcl.currentUser().subscribe(flowUser.set);
}

export const authenticate = () => fcl.authenticate();
export const unauthenticate = () => fcl.unauthenticate();

export const initAccount = async (signature) => {
	await authenticate();
	try {
		const newSignature = storeSignature(signature);
		return newSignature;
	} catch (e) {
		console.log(e);
	}
};

export async function storeSignature(signature) {
	try {
		const tx = await fcl.send([
			fcl.transaction`
			import PaperAuth from ${testnetContractAddress}
	
			transaction(signature: String) {
				prepare(acct: AuthAccount) {
	
					let paperAuthRef = acct.borrow<&PaperAuth>(from: /storage/PaperAuth)
	
					let esignatureRef <- paperAuthRef?.createSignature(signature: signature)
					acct.save(<-esignatureRef, to: /storage/eSignature)
	
					log("eSignature stored with ID:".concat(signature))
				}
			}`,
			fcl.args([fcl.arg(signature, t.String)]),
			fcl.proposer(fcl.currentUser().authorization),
			fcl.payer(fcl.currentUser().authorization),
			fcl.authorizations([fcl.currentUser().authorization]),
			fcl.limit(100)
		]);
		const result = await fcl.tx(tx).onceFinalized();
		return {
			error: null,
			result: result
		};
	} catch (e) {
		return {
			error: e,
			result: null
		};
	}
}
