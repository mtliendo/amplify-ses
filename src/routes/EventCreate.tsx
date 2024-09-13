import { Form } from 'react-router-dom'

export const action = async ({ request }: { request: Request }) => {
	const formData = await request.formData()
	console.log(formData.get('name'))
	console.log(formData.get('description'))
	console.log(formData.get('recipient-list'))

	return 'hey there'
}

const EventCreatePage = () => {
	return (
		<Form method="post" className="flex flex-col max-w-4xl m-auto gap-4 mt-12">
			<input
				className="input input-primary"
				type="text"
				name="name"
				placeholder="Sample Event Name"
			/>
			<textarea
				className="textarea textarea-primary"
				name="description"
				placeholder="A GREAT event..."
				rows={4}
			/>
			<textarea
				className="textarea textarea-secondary"
				name="recipient-list"
				rows={6}
				placeholder="hi@hello.com, you@me.com"
			/>
			<div className="flex justify-around">
				<button className="btn btn-secondary" type="button">
					email attendees
				</button>
				<button className="btn btn-success" type="submit">
					Save
				</button>
			</div>
		</Form>
	)
}

export default EventCreatePage
