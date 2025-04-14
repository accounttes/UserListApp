import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { User } from "../types";

type Props = {
  route: {
    params: {
      user: User;
    };
  };
};

const UserDetailScreen = ({ route }: Props) => {
  const user = route.params.user;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>{user.email}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{user.phone}</Text>

        <Text style={styles.detailLabel}>Website:</Text>
        <Text style={styles.detailValue}>{user.website}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e0e0",
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  detailValue: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 10,
  },
});

export default UserDetailScreen;
