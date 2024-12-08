import './App.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainHeader from './components/MainHeader';
import HomePage from './home/components/HomePage';
import CoursPage from './Cours/CoursPage';
import NewCoursForm from './admin/NewCoursForm';
import OneCour from './Cours/Components/OneCour';
import Connexion from './UserForm/Connexion';
import Inscription from './UserForm/Incription';
import Formateur from './Formateurs/Formateur';
import AboutUs from './AboutUs/AboutUs';
import UserMessage from './admin/UserMessages';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch('https://e-learning-expert-lab-backend.onrender.com/check-auth', {
					credentials: 'include'
				});
				const data = await response.json();
				setIsAuthenticated(data.isAuthenticated);
			} catch (error) {
				console.error("Erreur lors de la vérification de l'authentification: ", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const router = createBrowserRouter([
		{
			path: '/',
			element: isAuthenticated ? <MainHeader setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />,
			children: [
				{ index: true, element: <Navigate to="/home" /> },
				{ path: 'home', element: <HomePage /> },
				{ path: 'cours', element: <CoursPage /> },
				{ path: 'cours/:courId', element: <OneCour /> },
				{ path: 'formateurs', element: <Formateur /> },
				{ path: 'aboutus', element: <AboutUs /> },
			]
		},
		{ path: 'admin/newCours', element: <NewCoursForm /> },
		{ path: 'admin/userMessages', element: <UserMessage /> },
		{
			path: '/signup',
			element: <Inscription />,
		},
		{
			path: '/login',
			element: isAuthenticated ? (
				<Navigate to="/home" />
			) : (
				<Connexion setIsAuthenticated={setIsAuthenticated} />
			),
		},
	]);

	if (isLoading) {
		return <div className='charging'>
			<p>Chargement...</p>
			</div>;
	}

	return <RouterProvider router={router} />;
}

export default App;
