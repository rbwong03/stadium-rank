import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
    {
      id: 1,
      eventName: 'Cubs vs. Cardinals',
      date: '2023-08-15',
      score: '3-2',
      rating: 4.5,
      comments: [
        'I had a really good time at this game with my friends and family',
        'Amazing atmosphere.',
      ],
      pictures: [
        require('@/assets/images/wrigley.jpg'),
        require('@/assets/images/wrigley.jpg'),
      ],
      ratings: {
        food: 8,
        environment: 9,
        game: 10,
        surroundingArea: 7,
        aesthetic: 9,
        fans: 10,
        guestExperience: 8,
        parkingTransportation: 9,
        facilitiesAmenities: 7,
      },
    },
    {
      id: 2,
      eventName: 'Cubs vs. Brewers',
      date: '2023-08-22',
      score: '5-3',
      rating: 4.7,
      comments: ['Awesome experience.', 'Loved the energy!'],
      pictures: [
        'https://example.com/pic3.jpg',
        'https://example.com/pic4.jpg',
      ],
      ratings: {
        food: 7,
        environment: 8,
        game: 9,
        surroundingArea: 6,
        aesthetic: 8,
        fans: 9,
        guestExperience: 8,
        parkingTransportation: 9,
        facilitiesAmenities: 7,
      },
    },
  ],
  // Add more events for other stadiums as needed
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

const { width: screenWidth } = Dimensions.get('window');

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
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderItem = ({ item }) => (
    <StadiumItem item={item} onPress={handleStadiumPress} />
  );

  const handleStadiumPress = (stadium) => {
    setSelectedStadium(stadium);
    setModalVisible(true);
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setEventDetailsVisible(true);
  };

  // Selecting which tab to go to
  const data = selectedTab === 'Visited' ? visitedStadiums : wantToGoStadiums;

  // Creates the event info table that has the date, score, and overall rating of the visit
  const renderEventInfoTable = (event) => {
    if (!event) return null;

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <MaterialIcons name='date-range' size={20} color='gray' />
          <Text style={styles.tableCell}>Date:</Text>
          <Text style={styles.tableCell}>{event.date}</Text>
        </View>
        <View style={styles.tableRow}>
          <MaterialIcons name='scoreboard' size={20} color='gray' />
          <Text style={styles.tableCell}>Score:</Text>
          <Text style={styles.tableCell}>{event.score}</Text>
        </View>
        <View style={styles.tableRow}>
          <FontAwesome name='star' size={20} color='gold' />
          <Text style={styles.tableCell}>Rating:</Text>
          <Text style={styles.tableCell}>{event.rating}/5</Text>
        </View>
      </View>
    );
  };
  // Creates the ratings table that has all of the rating factors
  const renderRatingsTable = (ratings) => {
    if (!ratings) return null;

    return (
      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Category</Text>
          <Text style={styles.tableCell}>Rating</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Food:</Text>
          <Text style={styles.tableCell}>{ratings.food}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Environment:</Text>
          <Text style={styles.tableCell}>{ratings.environment}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Game:</Text>
          <Text style={styles.tableCell}>{ratings.game}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Surrounding Area:</Text>
          <Text style={styles.tableCell}>{ratings.surroundingArea}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Aesthetic:</Text>
          <Text style={styles.tableCell}>{ratings.aesthetic}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Fans:</Text>
          <Text style={styles.tableCell}>{ratings.fans}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Guest Experience:</Text>
          <Text style={styles.tableCell}>{ratings.guestExperience}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Parking / Transport:</Text>
          <Text style={styles.tableCell}>{ratings.parkingTransportation}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Facilities / Amenities:</Text>
          <Text style={styles.tableCell}>{ratings.facilitiesAmenities}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* The header of the  main lists page*/}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Lists</Text>
        <View style={styles.buttons}>
          {selectedTab === 'Visited' && (
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.buttonText}>Add Visit</Text>
            </TouchableOpacity>
          )}
          {selectedTab === 'Want to Go' && (
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.buttonText}>Add to Wishlist</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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
          style={[styles.tab, selectedTab === 'Want to Go' && styles.activeTab]}
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
      {/* The list of stadiums/places the user wants to go / has gone */}
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
          <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
              <Image
                source={stadiumImages[selectedStadium.name]}
                style={styles.reactLogo}
              />
            }
          >
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.headerRow}>
                  <Text style={styles.modalTitle}>{selectedStadium.name}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalClose}>Back</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name='place' size={20} color='#444' />
                  <Text style={styles.modalDetailText}>
                    {stadiumAddresses[selectedStadium.name]}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons
                    name='sports-baseball'
                    size={20}
                    color='#444'
                  />
                  <Text style={styles.modalDetailText}>
                    Team: {selectedStadium.team}
                  </Text>
                </View>
              </View>
            </SafeAreaView>
            <Text style={styles.eventsHeader}>Events Attended:</Text>
            {stadiumEvents[selectedStadium.name] &&
            stadiumEvents[selectedStadium.name].length > 0 ? (
              stadiumEvents[selectedStadium.name].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleEventPress(item)}
                >
                  <View style={styles.eventItem}>
                    <View style={styles.eventRow}>
                      <Text style={styles.eventName}>{item.eventName}</Text>
                      <Text style={styles.eventDate}>{item.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noEventsText}>No events attended.</Text>
            )}
          </ParallaxScrollView>

          {/* Modal for Event Details */}
          {selectedEvent && (
            <Modal
              animationType='slide'
              transparent={false}
              visible={eventDetailsVisible}
              onRequestClose={() => setEventDetailsVisible(false)}
            >
              <SafeAreaView style={styles.eventContainer}>
                <FlatList
                  ListHeaderComponent={() => (
                    <>
                      <View style={styles.eventContent}>
                        <View style={styles.headerRow}>
                          <Text style={styles.eventTitle}>
                            {selectedEvent.eventName}
                          </Text>
                          <TouchableOpacity
                            onPress={() => setEventDetailsVisible(false)}
                          >
                            <Text style={styles.modalClose}>Back</Text>
                          </TouchableOpacity>
                        </View>

                        {/* Logos Container */}
                        <View style={styles.logoContainer}>
                          <Image
                            source={require('@/assets/images/cubs_logo.png')} // Replace with actual path to team1 logo
                            style={styles.teamLogo}
                          />
                          <Text style={styles.vsText}>vs</Text>
                          <Image
                            source={require('@/assets/images/cardinals_logo.png')} // Replace with actual path to team2 logo
                            style={styles.teamLogo}
                          />
                        </View>

                        <Text
                          style={[styles.commentsHeader, { marginBottom: 10 }]}
                        >
                          Event Details:
                        </Text>

                        {renderEventInfoTable(selectedEvent)}
                        <Text
                          style={[styles.commentsHeader, { marginBottom: 10 }]}
                        >
                          Pictures:
                        </Text>
                        <ScrollView
                          horizontal
                          pagingEnabled
                          decelerationRate='fast'
                          snapToInterval={screenWidth}
                          snapToAlignment='center'
                          showsHorizontalScrollIndicator={false}
                        >
                          {selectedEvent.pictures.map((picture, index) => (
                            <View
                              key={index}
                              style={{
                                width: screenWidth,
                                alignItems: 'center',
                              }}
                            >
                              <View style={styles.carouselContainer}>
                                <Image
                                  source={picture}
                                  style={styles.carouselImage}
                                  resizeMode='cover'
                                />
                              </View>
                            </View>
                          ))}
                        </ScrollView>

                        {/* Add the ratings table */}
                        <Text style={styles.commentsHeader}>
                          Event Ratings:
                        </Text>
                        {renderRatingsTable(selectedEvent.ratings)}

                        <Text style={styles.commentsHeader}>Review:</Text>

                        {/* Render reviews here */}
                        {selectedEvent.comments &&
                        selectedEvent.comments.length > 0 ? (
                          selectedEvent.comments.map((comment, index) => (
                            <Text key={index} style={styles.comment}>
                              {comment}
                            </Text>
                          ))
                        ) : (
                          <Text style={styles.noCommentsText}>
                            No reviews available
                          </Text>
                        )}
                      </View>
                    </>
                  )}
                  data={[]}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.reviewContainer} // Added padding here
                />
              </SafeAreaView>
            </Modal>
          )}
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 430,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
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
  },
  modalContent: {
    flex: 1,
  },
  eventContent: {
    flex: 1,
    padding: 20,
  },
  eventContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50, // Add padding to ensure content starts below the status bar
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
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalClose: {
    fontSize: 16,
    color: 'blue',
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
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#555',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  comment: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  noCommentsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  carouselContainer: {
    width: '80%', // Image width
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  tableColumn: {
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#f0f0f0', // Light background for the table
    borderRadius: 10, // Rounded corners for the table
    shadowColor: '#000', // Shadow for a subtle 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Elevation for Android shadow
  },
  tableLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tableValue: {
    fontSize: 14,
    color: '#555',
  },
  reviewContainer: {
    paddingBottom: 20,
  },
  commentsHeader: {
    fontSize: 22, // Increase font size
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15, // Add more margin for spacing
  },
  tableContainer: {
    marginVertical: 15, // Increase vertical margin
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8, // Slightly more rounded corners
    backgroundColor: '#f9f9f9', // Light background color
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10, // Increase padding
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 18, // Increase font size for better readability
    fontWeight: '500', // Slightly bolder text
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#e0e0e0', // Background color for the header row
  },
  infoContainer: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 18,
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Spacing between rows
  },
  modalDetailText: {
    fontSize: 18, // Slightly larger font size for better readability
    color: '#333', // Darker color for better contrast
    marginLeft: 8, // Space between icon and text
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center everything on the x-axis
    alignItems: 'center', // Align logos and text vertically
    marginBottom: 10, // Add margin if needed
  },
  teamLogo: {
    width: 100, // Adjust the size of the logos
    height: 100, // Adjust the size of the logos
    borderRadius: 100, // Make the logos circular (half of width/height)
    marginHorizontal: 10, // Space between the logo and the "vs" text
  },
  vsText: {
    fontSize: 18, // Adjust font size as needed
    fontWeight: 'bold',
    color: '#333', // Adjust the color as needed
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the header and the buttons
    alignItems: 'center', // Vertically center the items
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
  },
  addButton: {
    marginLeft: 10, // Space between the buttons
    backgroundColor: '#007BFF', // Customize your button color
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4, // Rounded corners
  },
  buttonText: {
    color: '#FFF', // Text color
    fontSize: 14, // Font size
    fontWeight: 'bold', // Font weight
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16, // Ensure consistent padding
    marginBottom: 10, // Space below tabs
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
});
