import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Spinner } from '../../utils/Spinner';

const RenderOnNotAuthenticated = ({ children }) => {
  const router = useRouter();

  const [hidden, setHidden] = useState(true);

  //   useEffect(() => {
  //     fetchUser();
  //   }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/expressapi/current-user');
      console.log(data);
      if (!data.auth) {
        await setHidden(false);
      }
      if (data.auth) {
        await setHidden(true);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      setHidden(false);
    }
  };
  // console.log("hidden", hidden);
  fetchUser();

  return <>{hidden ? <Spinner /> : <>{children}</>}</>;
};

export default RenderOnNotAuthenticated;
