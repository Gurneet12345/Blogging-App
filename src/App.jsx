import './App.css';
import { useRoutes } from 'react-router-dom';
import SignInPage from './pages/Signin';
import SignupPage from './pages/Signup';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ViewBlogsPage from './pages/ViewBlogsPage';
import ViewBlogDetailsPage from './pages/ViewBlogDetailsPage';
import Navbar from './components/Navbar';
import ViewFavoritesPage from './pages/ViewFavoritesPage'; // Import ViewFavoritesPage

function App() {
  // React Router Setup

  const routes = useRoutes([
    {
      path: '/',
      element: <SignInPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/viewblogs',
      element: <ViewBlogsPage />
    },
    {
      path: '/viewblogs/:id',
      element: <ViewBlogDetailsPage />
    },
    {
      path: '/viewfavorites', // Add the route for View Favorites
      element: <ViewFavoritesPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ])

 return (
  <>
    <Navbar />
    {routes}
  </>
 )

}

export default App;