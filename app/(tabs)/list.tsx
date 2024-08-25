import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  Image, // Import Image component
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StadiumItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
    <Text style={styles.rank}>{item.rank}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>{item.team}</Text>
      <Text style={styles.details}>{item.city}</Text>
      {item.dateVisited && (
        <Text style={styles.details}>Visited: {item.dateVisited}</Text>
      )}
    </View>
  </TouchableOpacity>
);

export default function ListScreen() {
  const [selectedTab, setSelectedTab] = useState('Visited');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStadium, setSelectedStadium] = useState(null);

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

  const stadiumEvents = {
    'Wrigley Field': [
      { id: 1, eventName: 'Cubs vs. Cardinals', date: '2023-08-15' },
      { id: 2, eventName: 'Cubs vs. Brewers', date: '2023-08-22' },
    ],
    'Fenway Park': [
      { id: 1, eventName: 'Red Sox vs. Yankees', date: '2022-07-04' },
    ],
    'Dodger Stadium': [
      { id: 1, eventName: 'Dodgers vs. Giants', date: '2023-09-10' },
    ],
  };

  const stadiumAddresses = {
    'Wrigley Field': '1060 W Addison St, Chicago, IL 60613',
    'Fenway Park': '4 Jersey St, Boston, MA 02215',
    'Dodger Stadium': '1000 Vin Scully Ave, Los Angeles, CA 90012',
  };

  const stadiumImages = {
    'Wrigley Field': require('@/assets/images/wrigley.jpg'),
    'Fenway Park': require('@/assets/images/fenway.jpg'),
    'Dodger Stadium': require('@/assets/images/dodger.jpeg'),
    'Yankee Stadium': require('@/assets/images/yankee.jpeg'),
    'Oracle Park': require('@/assets/images/oracle.jpeg'),
    'T-Mobile Park': require('@/assets/images/mariners.jpg'),
  };

  const renderItem = ({ item }) => (
    <StadiumItem item={item} onPress={handleStadiumPress} />
  );

  const handleStadiumPress = (stadium) => {
    setSelectedStadium(stadium);
    setModalVisible(true);
  };

  const data = selectedTab === 'Visited' ? visitedStadiums : wantToGoStadiums;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lists</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Visited' && styles.activeTab]}
            onPress={() => setSelectedTab('Visited')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Visited' && styles.activeTabText,
              ]}
            >
              Visited
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'Want to Go' && styles.activeTab,
            ]}
            onPress={() => setSelectedTab('Want to Go')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Want to Go' && styles.activeTabText,
              ]}
            >
              Want to Go
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => (item.rank ? item.rank.toString() : item.name)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for Stadium Details */}
      {selectedStadium && (
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedStadium.name}</Text>

              {/* Add the Image component */}
              <Image
                source={stadiumImages[selectedStadium.name]}
                style={styles.stadiumImage}
                resizeMode='cover'
              />
              <Text style={styles.modalDetail}>
                Address: {stadiumAddresses[selectedStadium.name]}
              </Text>
              <Text style={styles.modalDetail}>
                Team: {selectedStadium.team}
              </Text>

              <Text style={styles.eventsHeader}>Events Attended:</Text>
              <FlatList
                data={stadiumEvents[selectedStadium.name]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.eventItem}>
                    <View style={styles.eventRow}>
                      <Text style={styles.eventName}>{item.eventName}</Text>
                      <Text style={styles.eventDate}>{item.date}</Text>
                    </View>
                  </View>
                )}
              />
              <Button title='Close' onPress={() => setModalVisible(false)} />
            </View>
          </SafeAreaView>
        </Modal>
      )}
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
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 0,
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
    width: '100%',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50, // Add padding to ensure content starts below the status bar
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  stadiumImage: {
    width: '100%',
    height: 200, // Adjust height as needed
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 18,
    marginBottom: 10,
  },
  eventsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  eventItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
