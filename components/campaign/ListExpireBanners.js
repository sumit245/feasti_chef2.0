import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Shop from 'react-native-vector-icons/Entypo';
import { styles } from './campaign.styles';
import moment from 'moment';
import TrackCampaignContent from './TrackCampaignContent';
export default function ListExpireBanners({
  banners,
  loaded,
  restaurant,
  address,
  title,
  users,
  totalOrders,
  totalBaseIncome,
  totalNetIncome,
  totalDiscount
}) {
  const timesnow = moment().format('DD/MM/YYYY HH:MM:SS');

  const renderItem = ({ item }) => (
    <TrackCampaignContent
      banners={item}
      loaded={loaded}
      totalOrders={totalOrders}
      totalBaseIncome={totalBaseIncome}
      totalNetIncome={totalNetIncome}
      totalDiscount={totalDiscount}
      users={users}
    />
  );

  const ListHeaderComponent = ({ restaurant, address }) => {
    return (
      <>
        <View style={styles.trackOutlet}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Shop name="shop" size={24} color="#ff6600" />
            <View>
              <Text
                style={[
                  styles.heading,
                  { marginBottom: 0, marginHorizontal: 12, color: '#000' },
                ]}
              >
                {restaurant}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {
                    color: '#000',
                    marginHorizontal: 12,
                    marginTop: 0,
                    fontWeight: 'normal',
                  },
                ]}
              >
                {address}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 4, backgroundColor: '#fff' }}>
          <Text style={[styles.listing]}>{title}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff', marginTop: 0 }]}>
      <FlatList
        data={banners}
        ListHeaderComponent={() => (
          <ListHeaderComponent restaurant={restaurant} address={address} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={styles.text}>
              Sorry you dont have any campaign. Create a new to generate more
              revenue!!!
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
      />
      <Text style={[styles.listing, { textAlign: 'center' }]}>
        Last Updated: {timesnow}
      </Text>

      {/* Bottom Text */}
    </View>
  );
}
