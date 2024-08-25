import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StadiumItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.rank}>{item.rank}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>{item.team}</Text>
      <Text style={styles.details}>{item.city}</Text>
      <Text style={styles.details}>Visited: {item.dateVisited}</Text>
    </View>
  </View>
);

export default function ListScreen() {
  const [selectedTab, setSelectedTab] = useState('Visited');

  // Example data for each tab
  const visitedStadiums = [
    {
      rank: 1,
      name: 'Wrigley Field',
      team: 'Chicago Cubs',
      city: 'Chicago, IL',
      dateVisited: '2023-08-15',
    },
    {
      rank: 2,
      name: 'Fenway Park',
      team: 'Boston Red Sox',
      city: 'Boston, MA',
      dateVisited: '2022-07-04',
    },
    {
      rank: 3,
      name: 'Dodger Stadium',
      team: 'Los Angeles Dodgers',
      city: 'Los Angeles, CA',
      dateVisited: '2023-09-10',
    },
  ];

  const wantToGoStadiums = [
    {
      rank: 1,
      name: 'Yankee Stadium',
      team: 'New York Yankees',
      city: 'New York, NY',
    },
    {
      rank: 2,
      name: 'Oracle Park',
      team: 'San Francisco Giants',
      city: 'San Francisco, CA',
    },
    {
      rank: 3,
      name: 'T-Mobile Park',
      team: 'Seattle Mariners',
      city: 'Seattle, WA',
    },
  ];

  const renderItem = ({ item }) => <StadiumItem item={item} />;

  // Choose the data set based on the selected tab
  const data = selectedTab === 'Visited' ? visitedStadiums : wantToGoStadiums;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lists</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Visited' && styles.activeTab]}
            onPress={() => setSelectedTab('Visited')}
          >
            <Text style={[styles.tabText, selectedTab === 'Visited' && styles.activeTabText]}>
              Visited
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Want to Go' && styles.activeTab]}
            onPress={() => setSelectedTab('Want to Go')}
          >
            <Text style={[styles.tabText, selectedTab === 'Want to Go' && styles.activeTabText]}>
              Want to Go
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of Stadiums */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank ? item.rank.toString() : item.name} // Using name as key if rank is not present
        ItemSeparatorComponent={() => <View style={styles.separator} />} // Add separator between items
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2, // Add underline when active
    borderBottomColor: '#000', // Underline color
  },
  tabText: {
    color: '#000', // Default text color
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold', // Make the active tab text bold
  },
  listContainer: {
    paddingHorizontal: 0, // Remove side padding
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%', // Ensure the separator spans the full width
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
});
