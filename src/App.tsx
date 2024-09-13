import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import HomePage from './routes/Home'
import ProtectedPage from './routes/Protected'
import { Authenticator } from '@aws-amplify/ui-react'
import { loader as protectedPageLoader } from './routes/Protected'
import EventCreatePage, {
	action as eventCreateAction,
} from './routes/EventCreate'

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				element: <ProtectedLayout />,
				path: 'protected',
				children: [
					{
						path: '/protected',
						element: <ProtectedPage />,
						loader: protectedPageLoader,
					},
					{
						path: '/protected/event-create',
						element: <EventCreatePage />,
						action: eventCreateAction,
					},
				],
			},
		],
	},
])

function App() {
	return (
		<Authenticator.Provider>
			<RouterProvider router={router} />
		</Authenticator.Provider>
	)
}

export default App
