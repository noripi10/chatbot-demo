import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png';
import ReactLogo from '../assets/img/logo512.png';

const Chat = ({ chat }) => {
  const isQuestion = chat.type === 'question' ? true : false;
  const icon = chat.type === 'question' ? ReactLogo : NoProfile;

  const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';
  return (
    <ListItem className={classes}>
      <ListItemAvatar>
        <Avatar alt="icon" src={icon} />
      </ListItemAvatar>
      <div className="p-chat__bubble">{chat.text}</div>
    </ListItem>
  );
};

export default Chat;
