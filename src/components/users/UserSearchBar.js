import React, { useState, useRef } from 'react'
import { View } from 'react-native'
import firebase from 'react-native-firebase';
import _ from "lodash";
import { SearchBar } from 'react-native-elements';
import ListOfUsers from './ListOfUsers';

const UserSearchBar = () => {
    const usersRef = firebase.firestore()
        .collection('users')
        .limit(3);
    const [searchTxt, setSearchTxt] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [users, setUsersList] = useState([]);

    const debounceSearch = text => {
        setSearchTxt(text);
        delayedQuery(text);
    };

    const delayedQuery = useRef(_.debounce(text => doSearch(text), 400)).current;

    const doSearch = async (searchString = '') => {
        if (searchString.length > 4) {
            setIsSearching(true);
            const querySnapshot = await usersRef
                .where('searchDisplayName', '>=', searchString.toLowerCase())
                .get();

            setUsersList(querySnapshot.docs.map(user => ({
                ...user.data(),
                invited: false,
                score: 0,
                isActive: false,
                accepted: false

            })));
            setIsSearching(false);
        } else {
            setUsersList([]);
        }
    }

    return (
        <View>
            <SearchBar
                placeholder="Search user"
                autoCompleteType="off"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={text => debounceSearch(text)}
                value={searchTxt}
                showLoading={isSearching}
            />
            <ListOfUsers users={users} userSearch />
        </View>
    )
}

export default UserSearchBar
