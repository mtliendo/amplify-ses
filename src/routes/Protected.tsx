import { useLoaderData, useNavigate } from 'react-router-dom'

export const loader = async () => {
	return {
		events: [
			{
				id: 1,
				name: 'Event 1',
				description: 'This is event 1',
				recipients: ['recipient1@example.com', 'recipient2@example.com'],
			},
			{
				id: 2,
				name: 'Event 2',
				description: 'This is event 2',
				recipients: ['recipient3@example.com', 'recipient4@example.com'],
			},
		],
	}
}
const ProtectedPage = () => {
	const { events } = useLoaderData()

	return (
		<div className="flex flex-col gap-4 mt-4">
			{events.map((event) => (
				<div key={event.id} className="border">
					<h2>{event.name}</h2>
					<p>{event.description}</p>
				</div>
			))}
		</div>
	)
}

export default ProtectedPage
