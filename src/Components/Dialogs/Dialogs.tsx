import React from 'react';
import s from './Dialogs.module.css';
import Friends from './Friends/Friends';
import Messages from './Message/Message';
import DialogsForm from './DialogsForm';
import { useSelector } from 'react-redux';
import { withRedirectToLoginHoc } from '../Hoc/WithRedirectToLoginHoc';
import { AppStateType } from '../../Types_For_TypeScript/Main_App_Types';

const Dialogs: React.FC = (props) => {

  const friends = useSelector((state:AppStateType) => state.dialogs.dataFriends);
  const messages = useSelector((state:AppStateType) => state.dialogs.dataMessages);
  const friendsMap = friends.map(i => <Friends name={i.name} id={i.id} key={i.id} />)
  const messagesMap = messages.map(i => <Messages messages={i.messages}  key={i.id} />)
  
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
