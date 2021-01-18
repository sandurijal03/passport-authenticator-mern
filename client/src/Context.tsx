import Axios, { AxiosResponse } from 'axios';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { UserInterface } from './interfaces/interfaces';

export const myContext = React.createContext<Partial<UserInterface>>({});

const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/user', {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      setUser(res.data);
    });
  }, []);

  return (
    <myContext.Provider value={user!}>{props.children}</myContext.Provider>
  );
};

export default Context;
