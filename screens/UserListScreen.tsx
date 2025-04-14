import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { RootStackParamList } from "../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../types";
import { fetchUsers } from "../api";

type UserListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "UserList">;
};

const UserListScreen: React.FC<UserListScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        console.log(err);
        setError("Ошибка при загрузке пользователей");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserDetail", { user: item })}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  if (error) return <Text style={styles.errorText}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск пользователей..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredUsers.length === 0 ? (
        <Text style={styles.noResultsText}>Пользователи не найдены</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default UserListScreen;
