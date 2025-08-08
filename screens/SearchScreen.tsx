import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import SearchContainer from "../components/searchContainer";
import UserBlock from "../components/userBlock";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addFriendtoFriendList } from "../reducers/user";

export default function SearchScreen() {
  const lienExpo = process.env.EXPO_PUBLIC_ADDRESS_EXPO;
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [myfriends, setMyFriends] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const user = useSelector((state: any) => state.user.value);
  console.log("User from Redux:", user);
  console.log("my friends:", myfriends);
  let isFriend = false;

  useEffect(() => {
    fetch(`${lienExpo}users/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("Fetched users:", data);
        setAllUsers(data.users);
      });
    setMyFriends(user.friendList);
  }, []);

  const handleSearch = () => {
    if (searchUsername.length < 3) {
      console.log("Search term must be at least 3 characters long");
      return;
    }

    fetch(`${lienExpo}users/${searchUsername}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSearchResults([data]);
          // setAllUsers(data.users);
          console.log("Search results:", data);
        } else {
          console.log("No users found");
          // setAllUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleAdd = (name: string) => {
    console.log("Adding user:", name);

    fetch(`${lienExpo}users/addFriend`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
        friendUsername: name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add friend response:", data);
        addFriendtoFriendList(name);
        setMyFriends(data.friendList);
        setSearchUsername("");
        setSearchResults([]);
      });

    // Logic to add a user to the friend list
  };
  const displayAllUsers = allUsers.map((alluser, i) => {
    return (
      <UserBlock
        key={i}
        children={alluser}
        onPress={() => {
          handleAdd(alluser.username);
        }}
        isFriend={myfriends.some((e) => e.username === alluser.username)}
      />
    );
  });

  const displayMyFriends = myfriends.map((friend, i) => {
    return (
      <UserBlock
        key={i}
        children={friend}
        onPress={() => {
          handleAdd(friend.username);
        }}
        isFriend={true}
      />
    );
  });

  const displaySearchResults = searchResults.map((result, i) => {
    return (
      <UserBlock
        key={i}
        children={result}
        onPress={() => {
          handleAdd(result.username);
        }}
        isFriend={myfriends.some((e) => e.username === result.username)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <SearchContainer
        children={"search..."}
        onChangeText={(value) => setSearchUsername(value)}
        value={searchUsername}
        onPress={() => {
          handleSearch();
        }}
      />

      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.usersDisplay}
      >
        {myfriends.length === 0 &&
          !searchUsername &&
          searchResults.length === 0 && (
            <>
              <Text>All users:</Text>
              {displayAllUsers}
            </>
          )}
        {searchResults.length > 0 && <>{displaySearchResults}</>}
        {!searchUsername && myfriends.length > 0 && (
          <>
            <Text>Your friends:</Text>
            {displayMyFriends}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
