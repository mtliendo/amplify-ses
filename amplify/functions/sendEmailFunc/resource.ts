import { defineFunction } from '@aws-amplify/backend'

export const sendBulkEmail = defineFunction({
	// optionally specify a name for the Function (defaults to directory name)
	name: 'sendBulk',
	// optionally specify a path to your handler (defaults to "./handler.ts")
	entry: './main.ts',
})
