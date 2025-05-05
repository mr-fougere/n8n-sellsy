import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class SellsyV1 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Sellsy V1',
		name: 'SellsyV1',
		icon: 'file:sellsy.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Sellsy API',
		defaults: {
			name: 'Sellsy V1',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'SellsyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://apifeed.sellsy.com/0/',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Document',
						value: 'getDocument',
					},
				],
				default: 'getDocument',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['getDocument'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get Document by Id and Doctype',
						description: 'Retrieve a document from Sellsy by specifying the document ID and type',
						routing: {
							request: {
								body: {
									// les variables docType et docId seront injectées plus bas
									method: 'Document.getOne',
									params: {
										doctype: '={{$parameter["docType"]}}',
										docid: '={{$parameter["docId"]}}',
									},
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Document Type',
				name: 'docType',
				type: 'options',
				options: [
					{ name: 'Invoice', value: 'invoice' },
					{ name: 'Quote', value: 'quote' },
					{ name: 'Order', value: 'order' },
					{ name: 'Credit Note', value: 'credit' },
					{ name: 'Delivery', value: 'delivery' },
				],
				default: 'invoice',
				required: true,
				displayOptions: {
					show: {
						resource: ['getDocument'],
						operation: ['get'],
					},
				},
			},
			{
				displayName: 'Document ID',
				name: 'docId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['getDocument'],
						operation: ['get'],
					},
				},
			},
		],
	};
}
