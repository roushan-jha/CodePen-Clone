import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home, Spinner } from './components'
import { useEffect, useState } from 'react';
import { auth, db } from './config/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';

function App() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged(userCred => {
      if(userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
          //dispatch the action to store
          dispatch(SET_USER(userCred?.providerData[0]));
          navigate("/home/projects", { replace : true });
        })
      } else {
        navigate("/home/auth", { replace: true });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    //clean up the listener event
    return () => unsubscibe();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
          <Spinner />
        </div>
      ) : (
        <div>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        {/* If the route is not matching */}
        <Route path="*" element={<Navigate to={"/home"} /> } />
      </Routes>
    </div>
      )}
    </>
  );
}

export default App;
