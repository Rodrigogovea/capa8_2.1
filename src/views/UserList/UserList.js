import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
//import mockData from './data';

import { db } from '../../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection('usuarios').get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return;
        }

        const retrievedUsers = [];
        snapshot.forEach((user) => {
          retrievedUsers.push({
            id: user.id,
            ...user.data()
          })
        });

        setUsers(retrievedUsers);
      })
      .catch(err => console.log(err));
  });

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
