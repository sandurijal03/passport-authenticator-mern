import React, { useContext, useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';
import { myContext } from '../Context';
import { UserInterface } from '../interfaces/interfaces';

const AdminPage = () => {
  const ctx = useContext(myContext);

  const [data, setData] = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/users', {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      setData(
        res.data.filter(
          (item: UserInterface) => item.username !== ctx.username,
        ),
      );
    });
  }, [ctx]);

  if (!data) {
    return null;
  }

  const deleteUser = () => {
    let userId: string;
    data.forEach((item: UserInterface) => {
      if (item.username === selectedUser) {
        userId = item.id;
      }
    });

    Axios.post(
      'http://localhost:3001/api/deleteuser',
      {
        id: userId!,
      },
      { withCredentials: true },
    );
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <select
        name='deleteuser'
        id='deleteuser'
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option>select a user</option>
        {data.map((item: UserInterface) => {
          return <option id={item.username}>{item.username}</option>;
        })}
      </select>

      <button onClick={deleteUser}>deleete user</button>
    </div>
  );
};

export default AdminPage;
