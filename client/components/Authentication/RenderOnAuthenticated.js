import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '../../utils/Spinner/index';
import { useRouter } from 'next/router';

const RenderOnAuthenticated = ({ children }) => {
  const router = useRouter();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/expressapi/current-user');
      console.log(data);

      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
      router.push('/login');
    }
  };
  console.log(hidden);
  return <>{hidden ? <Spinner /> : <>{children}</>}</>;
};

export default RenderOnAuthenticated;
