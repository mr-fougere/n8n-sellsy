import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class SellsyApiV1 implements ICredentialType {
	name = 'SellsyApiV1';
	displayName = 'Sellsy API V1';
	documentationUrl = 'https://docs.sellsy.com/api/v1/index';
	properties: INodeProperties[] = [
		{
			displayName: 'Consumer Token',
			name: 'consumerToken',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Consumer Secret',
			name: 'consumerSecret',
			type: 'string',
			default: '',
		},
		{
			displayName: 'User Token',
			name: 'userToken',
			type: 'string',
			default: '',
		},
		{
			displayName: 'User Secret',
			name: 'userSecret',
			type: 'string',
			default: '',
		},
	];

	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization:
					'Bearer {{ $credentials.consumerToken }}:{{ $credentials.consumerSecret }}:{{ $credentials.userToken }}:{{ $credentials.userSecret }}',
			},
		},
	} as IAuthenticateGeneric;
}
