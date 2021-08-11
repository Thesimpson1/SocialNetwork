import React from 'react';
import ProfileInfo from './Profile_info';
import Preloader from '../../../Common/Preload/Preloader'
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUserThunk, getUserStatusThunk } from '../../../Redux/Reducer_Profile';

const ProfileInfoContainerWidthHook = React.memo(function ProfileInfoContainerWidthHook(props) {

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.profile.isFetching);
    const myId = useSelector(state => state.auth.dataAuth.id);

    React.useEffect(() => {
        
        const userId = props.match.params.userId;
        //===Change your id===
        const useUserId = (userId) ?? myId ?? props.history.push('/login');
        dispatch(getProfileUserThunk(useUserId));
        dispatch(getUserStatusThunk(useUserId));
    }, [props.match.params.userId]);

    const [isOwner, setIsOwner] = React.useState(false);

    if (!props.match.params.userId && !isOwner) {
        return setIsOwner(true);
    };
    if (!isFetching) {
        return <Preloader />
    }

    return <>
        <ProfileInfo  isOwner={isOwner} />
    </>
});

const ProfileInfoContainer = withRouter(ProfileInfoContainerWidthHook);

export default ProfileInfoContainer;
