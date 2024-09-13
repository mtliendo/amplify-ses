import type { Handler } from 'aws-lambda'

import { SESv2Client, SendBulkEmailCommand } from '@aws-sdk/client-sesv2' // ES Modules import
const client = new SESv2Client()
const input = {
	FromEmailAddress: 'mtliendo@focusotter.com',
	DefaultContent: {
		Template: {
			TemplateName: 'EventNotifier',
			TemplateData: '{}', // Empty JSON object as we're using ReplacementTemplateData
		},
	},
	BulkEmailEntries: [
		{
			Destination: {
				ToAddresses: ['mtliendo@gmail.com'],
			},
			ReplacementEmailContent: {
				ReplacementTemplate: {
					ReplacementTemplateData: JSON.stringify({
						'email-address': 'mtliendo@gmail.com',
					}),
				},
			},
		},
		{
			Destination: {
				ToAddresses: ['mtliendo@focusotter.com'],
			},
			ReplacementEmailContent: {
				ReplacementTemplate: {
					ReplacementTemplateData: JSON.stringify({
						'email-address': 'mtliendo@focusotter.com',
					}),
				},
			},
		},
	],
}
//https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_SendBulkEmail.html

export const handler: Handler = async (event: { name: string }) => {
	console.log(event)
	const command = new SendBulkEmailCommand(input)
	const res = await client.send(command)
	console.log('the res', res)
	return 'Hello, World!'
}
