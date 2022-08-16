import { Button, Container, Paper } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { Dashboard } from '../components/Dashboard';
import { Context } from '../context';
import { Box } from '@mui/system';
import LoginRegisterCard from '../components/WelcomeComponent/LoginRegisterCard';
import { useRouter } from 'next/router';
import axios from 'axios';
export default function Home() {
  const { sfUser } = useContext(Context);

  const router = useRouter();

  // const { state, dispatch } = useContext(Context);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/expressapi/current-user');
      console.log(data);
      if (!data.auth) {
        setHidden(true);
        router.push('/login');
      }
      if (data.auth) {
        setHidden(false);
      }
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <div className="centerX">
      {/* {!hidden && (
        <>
          <h1>Home page</h1>
          <button onClick={LogoutHandler}>Logout</button>
        </>
      )}*/}

      <Paper className="w-full h-full  ">{!hidden && <Dashboard />}</Paper>
    </div>
  );
}
