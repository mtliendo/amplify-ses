import { sendBulkEmail } from './functions/sendEmailFunc/resource'
import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
	auth,
	data,
	sendBulkEmail,
})

backend.sendBulkEmail.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['ses:SendBulkEmail', 'ses:SendBulkTemplatedEmail'],
		resources: ['*'],
	})
)
