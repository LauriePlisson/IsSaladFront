import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from "react-native";
import SearchContainer from "../components/searchContainer";
import UserBlock from "../components/userBlock";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFriendtoFriendList } from "../reducers/user";

export default function SearchScreen() {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [viewFriend, setViewFriend] = useState<boolean>(false);
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [lengthError, setLengthError] = useState<boolean>(false);
  // const [changeColor, setChangeColor] = useState<boolean>(false);

  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  // console.log("User from Redux:", user);
  // console.log("my friends:", myfriends);
  let isFriend = false;

  useEffect(() => {
    fetch(`${lienExpo}users/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched users:", data);
        setAllUsers(data.users);
      });
    // setMyFriends(user.friendList);
  }, []);

  const handleSearch = () => {
    if (searchUsername.length < 3) {
      setLengthError(true);
      // console.log("Search term must be at least 3 characters long");
      return;
    }

    fetch(`${lienExpo}users/${searchUsername}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSearchResults([data]);

          // console.log("Search results:", data);
        } else {
          setErrorSearch(true);
          // console.log("No users found");
        }
      });
  };
  // console.log(errorSearch);

  const handleAdd = (frienddata) => {
    // console.log("Adding user:", frienddata);

    fetch(`${lienExpo}users/addFriend`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        friendUsername: frienddata.username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Add friend response:", friendname);
        const newFriend = {
          username: frienddata.username,
          avatar: frienddata.avatar,
          team: frienddata.team,
          description: frienddata.description,
        };
        dispatch(addFriendtoFriendList(newFriend));
        // setMyFriends(data.friendList);
        setSearchUsername("");
        setSearchResults([]);
        // console.log("reducer", user.friendList);
      });

    // Logic to add a user to the friend list
  };
  const displayAllUsers = allUsers?.map((alluser, i) => {
    if (alluser.username !== user.username) {
      return (
        <UserBlock
          key={i}
          children={alluser}
          onPress={() => {
            handleAdd(alluser);
          }}
          isFriend={user.friendList.some(
            (e) => e.username === alluser.username
          )}
        />
      );
    }
  });

  const displayMyFriends = user.friendList?.map((friend, i) => {
    return (
      <UserBlock
        key={i}
        children={friend}
        onPress={() => {
          handleAdd(friend);
        }}
        isFriend={true}
      />
    );
  });

  const displaySearchResults = searchResults?.map((result, i) => {
    return (
      <UserBlock
        key={i}
        children={result}
        onPress={() => {
          handleAdd(result);
        }}
        isFriend={user.friendList.some((e) => e.username === result.username)}
      />
    );
  });
  const handlePressOngletAll = () => {
    setViewAll(true);
    setViewFriend(false);
    setErrorSearch(false);
    setLengthError(false);
    setSearchResults([]);
    setSearchUsername("");
  };

  const handlePressOngletFriend = () => {
    setViewFriend(true), setViewAll(false);
    setErrorSearch(false);
    setLengthError(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchContainer
        children={"search..."}
        onChangeText={(value) => {
          setSearchUsername(value),
            setErrorSearch(false),
            setLengthError(false);
        }}
        value={searchUsername}
        onPress={() => {
          handleSearch();
        }}
      />
      {lengthError && (
        <Text style={{ marginBottom: 5, color: "#ac6139ff" }}>
          username search must be at least 3 letters
        </Text>
      )}
      {errorSearch && (
        <Text style={{ marginBottom: 5, color: "#ac6139ff" }}>
          no user found
        </Text>
      )}
      <View style={styles.onglets}>
        <TouchableOpacity
          style={styles.onglet}
          onPress={() => handlePressOngletAll()}
        >
          <Text style={styles.textonglet}>All Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.onglet}
          onPress={() => handlePressOngletFriend()}
        >
          <Text style={styles.textonglet}>Your Friends</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.usersDisplay}
      >
        {viewAll && !viewFriend && searchResults.length === 0 && (
          <>
            <Text>All users:</Text>
            {displayAllUsers}
          </>
        )}
        {searchResults.length > 0 && (
          <>
            <Text>Search Result:</Text>
            {displaySearchResults}
          </>
        )}
        {!viewAll && viewFriend && searchResults.length === 0 && (
          <>
            <Text>Your friends:</Text>
            {displayMyFriends}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    color: "white",
    marginVertical: 10,
    backgroundColor: "black",
  },
  usersDisplay: {
    width: "100%",
  },
  onglets: {
    flexDirection: "row",
    // borderWidth: 2,

    width: "80%",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
    gap: 7,
    marginBottom: 15,
    marginTop: 5,
  },
  onglet: {
    // borderWidth: 2,
    height: "100%",
    width: "45%",
    backgroundColor: "#aabd8c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textonglet: {
    color: "#381D2A",
  },
});
