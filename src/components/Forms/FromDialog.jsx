import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextInput } from './TextInput';

const FormDialog = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const inputName = (event) => {
    setName(event.target.value);
  };

  const inputEmail = (event) => {
    setEmail(event.target.value);
  };

  const inputDescription = (event) => {
    setDescription(event.target.value);
  };

  const submitForm = () => {
    const payload = {
      text:
        'お問い合わせがありました\n' +
        'お名前：' +
        name +
        '\n' +
        'Email：' +
        email +
        '\n' +
        'お問い合わせ内容：\n' +
        description,
    };

    const url =
      'https://hooks.slack.com/services/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';
    fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
    }).then(() => {
      dialogClose();
      alert('送信が完了しました');
    });
  };

  const dialogClose = () => {
    return props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={'お名前(必須)'}
          multiline={false}
          rows={1}
          type={'input'}
          onChange={inputName}
          value={name}
        />
        <TextInput
          label={'メールアドレス(必須)'}
          multiline={false}
          rows={1}
          type={'input'}
          onChange={inputEmail}
          value={email}
        />

        <TextInput
          label={'お問い合わせ内容(必須)'}
          multiline={true}
          rows={5}
          type={'input'}
          onChange={inputDescription}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
