import React, { useCallback, useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel';

import { action } from '../../../service'
import { baseUrl, showError } from '../../../utils'

import {
  Announcement,
  BannerIndicator,
  CategoryItem,
  ImageBanner,
  SearchHeader,
  SectionSpacer
} from '../../../components'
import { IcMoney, IcStudentHat, IcWorkBag, IcWorker } from '../../../assets';

const HomePage = () => {
  const [anounceText, setAnounceText] = useState('');
  const [search, setSearch] = useState('');
  const [banners, setBanners] = useState([]);

  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerWidth = Dimensions.get('window').width - 40;
  const categoryData = [
    {
      title: 'Prakerja',
      color: '#53ADF6',
      icon: <IcWorker />
    },
    {
      title: 'Siap Usaha',
      color: '#F5CB64',
      icon: <IcMoney />
    },
    {
      title: 'Siap Mahir',
      color: '#64C76F',
      icon: <IcStudentHat />
    },
    {
      title: 'Siap Karier',
      color: '#4A44AD',
      icon: <IcWorkBag />
    },
  ];

  const getAnnouncement = async () => {
    try {
      const response = await action(`${baseUrl}/v3/website/announcements/active`);
      const data = response.data.data;
      setAnounceText(data.description);
    } catch (error) {
      showError(error)
    }
  }
  const getBanner = async () => {
    try {
      const response = await action(`${baseUrl}/v3/website/banners?page=0&size=100&isActive=true&location=welcome`);
      const data = response.data.data;
      setBanners(data.content);
    } catch (error) {
      showError(error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAnnouncement();
      getBanner();
    }, [])
  )

  const SecondSection = () => {
    return (
      <View>
        <Text>Pilihan Terbaik Untuk Kamu</Text>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    return <ImageBanner img={item.imagePath} onPress={() => {}} />
  };

  return (
    <SafeAreaView className='bg-white flex-1'>
      {anounceText !== '' && <Announcement desc={anounceText} onPress={() => {}} />}
      <SearchHeader
        value={search}
        onChangeText={(text) => setSearch(text)}
        onPress={() => {}}
      />

      <ScrollView className='flex-1'>
        <View className='mx-5 mt-5 mb-8'>
          <Carousel
            layout={'default'}
            useScrollView={true}
            autoplay={true}
            autoplayInterval={4000}
            loop={true}
            data={banners}
            renderItem={renderItem}
            sliderWidth={bannerWidth}
            itemWidth={bannerWidth}
            onSnapToItem={(index) => {
              setBannerIndex(index);
            }}
          />
          <View className='flex-row mt-3'>
            {banners.map((_, index) => {
              return <BannerIndicator key={index} isIndex={index === bannerIndex} />
            })}
          </View>

          <Text className='mt-8 text-xs text-black font-bold'>Solusi Program Terlengkap</Text>
          <View className='flex-row justify-around mt-4'>
            {categoryData.map((data, index) => {
              return <CategoryItem key={index} data={data} onPress={() => {}} />
            })}
          </View>
        </View>
        
        <SectionSpacer />

        <SecondSection />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({})