import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Loading from './Loading'; // Import your Loading component
import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit';
import reportWebVitals from './reportWebVitals';

UIkit.use(Icons);

const root = ReactDOM.createRoot(document.getElementById('root'));

function Index() {
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate an async operation
    setTimeout(() => {
      setLoading(false); // Set loading to false after the data is loaded
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <React.StrictMode>
      {loading ? (
        <Loading loading={true} done={false} />
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </React.StrictMode>
  );
}

root.render(<Index />);

reportWebVitals();





