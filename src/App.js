import './App.css';
import './styles.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import MoviesGrid from './compoments/MoviesGrid';

function App() {
  return (
    <div className="App">

      <div className='container'>
        <Header />
        <MoviesGrid />
      </div>


      <Footer />

    </div>
  );
}

export default App;
