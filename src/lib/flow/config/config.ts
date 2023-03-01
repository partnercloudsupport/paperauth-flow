// @ts-ignore
import * as fcl from '@onflow/fcl';
import { PUBLIC_FLOW_NETWORK } from '$env/static/public';
import flowJson from './flow.json';

const flowNetwork = PUBLIC_FLOW_NETWORK;

const accessNodeApi = {
	local: 'http://localhost:8888',
	testnet: 'https://rest-testnet.onflow.org',
	mainnet: 'https://rest-mainnet.onflow.org'
};

console.log('Running on', flowNetwork);

fcl
	.config({
		'flow.network': flowNetwork,
		'accessNode.api': accessNodeApi[flowNetwork as 'local' | 'testnet' | 'mainnet'],
		'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`
	})
	.load({ flowJson });
