import React from 'react';
import {UserSimpleDisplay} from '../components/UserSimpleDisplay';
import { useSelector } from 'react-redux';

 export const User=(props)=> {
    let current_user = useSelector(state => state.userReducer.user);
        return ( 
                <UserSimpleDisplay 
                    id={current_user.id}
                    surname={current_user.surname}
                    lastname={current_user.lastname}
                    login={current_user.login}
                    pwd={current_user.pwd}
                    repwd={current_user.repwd}
                    money={current_user.money} 
                    img={current_user.img}>
                </UserSimpleDisplay>
            );
    }