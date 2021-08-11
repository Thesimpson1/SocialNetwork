import React from 'react';
import s from './Dialogs.module.css';
import Friends from './Friends/Friends';
import Messages from './Message/Message';
import DialogsForm from './DialogsForm';
import { useSelector } from 'react-redux';
import { withRedirectToLoginHoc } from '../Hoc/WithRedirectToLoginHoc';

const Dialogs = (props) => {

  const friends = useSelector(state => state.dialogs.dataFriends);
  const messages = useSelector(state => state.dialogs.dataMessages);
  const friendsMap = friends.map(i => <Friends name={i.name} id={i.id} key={i.id} />)
  const messagesMap = messages.map(i => <Messages messages={i.messages} id={i.id} key={i.id} />)
  
  return (
    <div>
      <div className={s.dialogs}>
        <div>
          {friendsMap}
        </div>
        <div>
          {messagesMap}
        </div>
      </div>
        <DialogsForm />
    </div>
  );
}
const DialogsWithRedirect = withRedirectToLoginHoc(Dialogs);
 
export default DialogsWithRedirect;
