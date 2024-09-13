# How to create an email sender using Amplify and Amazon SES

## Project Forethoughts

I know that for this project, I'll need to create an api for the events, and a lambda function that my API calls to send emails. That's it.

My assumption is that I can use SES's `sendBulkEmail` API to do this. My understanding is that any emails I send need to go to verified email addresses since I'm in the SES sandbox.

## Application Setup

### Configure the frontend

After updating the deps, I cloned my [gen2 starter repo](https://github.com/mtliendo/amplify-gen2-vite-starter). This comes with gen2, react router, a protected route, and public routes already configured in addition to DaisyUI for styling.

> 🗒️ I'm looking to update this to ShadCN and use React Query in the future.

### Configure the backend

This repo already comes with the backend initialized with

```sh
npm create amplify@latest
```

## Project Creation

It doesn't take much effort, but I end up with the following data model:

```ts
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
```

This will deploy Cognito and my API.

🚨 It failed.

Took a minute or two of troubleshooting, but I noticed the stack name is based on what's in my `package.json`. In this case, the stack already existed and my new resources weren't allowed to override it.

Long story short, between projects, I need to make sure I'm updating the name in my package.json.

## Sending email

aws sesv2 create-email-template \
 --template-name EventNotifier \
 --template-content '{
"Subject": "Exciting News!",
"Text": "Hello {{email-address}}!",
"Html": "<html><body><h1>Hello {{email-address}}!</h1></body></html>"
}'

arn: arn:aws:ses:us-east-1:842537737558:template/EventNotifier
