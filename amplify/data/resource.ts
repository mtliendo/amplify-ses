import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
	Event: a
		.model({
			name: a.string().required(),
			description: a.string().required(),
			recipients: a.email().array().required(),
		})
		.authorization((allow) => [allow.owner()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	name: 'EventManagement',
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'userPool',
	},
})
