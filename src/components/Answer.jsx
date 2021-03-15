import { Button, createStyles, makeStyles } from '@material-ui/core';
// import { styled } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderColor: '#ffb549',
      color: '#ffb549',
      fontWeight: 600,
      marginBottom: '8px',
      '&:hover': {
        backgroundColor: '#ffb549',
        color: '#fff',
      },
    },
  })
);

const Answer = ({ answer, select }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="outlined"
      onClick={() => select(answer.content, answer.nextId)}
    >
      {answer.content}
    </Button>
  );
};

export default Answer;
