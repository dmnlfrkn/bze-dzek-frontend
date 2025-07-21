import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Translate from './pages/Translate';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
function App() {


  return (
    <AuthProvider>
      <Router>
        <div className='bg-black/90 min-h-screen'>
          <Navbar />
          <main>
            <Routes>
              <Route path='/' element={<Translate />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
