import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
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
  console.log(myfriends);

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

  const handleAdd = (name) => {
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
      });
    // Logic to add a user to the friend list
  };
  const displayAllUsers = allUsers.map((user, i) => {
    return (
      <View key={i}>
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity onPress={() => handleAdd(user.username)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  });

  const displayMyFriends = myfriends.map((friend, i) => {
    return (
      <View key={i}>
        <Text style={styles.username}>{friend.username}</Text>
        <TouchableOpacity onPress={() => handleAdd(friend.username)}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  });

  const displaySearchResults = searchResults.map((result, i) => {
    return (
      <View key={i}>
        <Text style={styles.username}>{result.username}</Text>
        <TouchableOpacity>
          <Text onPress={() => handleAdd(result.username)}>+</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
      <TextInput
        placeholder="Search..."
        onChangeText={(value) => setSearchUsername(value)}
        value={searchUsername}
      />
      <TouchableOpacity
        onPress={() => {
          handleSearch();
        }}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      {displayMyFriends}
      {/* {displaySearchResults} */}
      {/* {displayAllUsers} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    color: "white",
    marginVertical: 10,
    backgroundColor: "black",
  },
});
