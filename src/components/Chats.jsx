import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Chat } from './index';

const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: 400,
      padding: 0,
      overflow: 'auto',
    },
  })
);

const Chats = ({ chats }) => {
  const classes = useStyles();
  return (
    <List id={'scroll-area'} className={classes.chats}>
      {chats.map((chat, index) => (
        <Chat chat={chat} key={index.toString()} />
      ))}
    </List>
  );
};

export default Chats;
