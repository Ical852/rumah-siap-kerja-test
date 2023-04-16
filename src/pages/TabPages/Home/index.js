import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-snap-carousel';

import { action } from '../../../service'
import { baseUrl, customColors, showError } from '../../../utils'

import {
  Announcement,
  BannerIndicator,
  CategoryFilterItem,
  CategoryItem,
  Gap,
  HeadersSection,
  HighlightSection,
  ImageBanner,
  ProgramCard,
  SearchHeader,
  SectionSpacer
} from '../../../components'
import { IcMoney, IcStudentHat, IcWorkBag, IcWorker } from '../../../assets';

const HomePage = () => {
  const [anounceText, setAnounceText] = useState('');
  const [search, setSearch] = useState('');
  const [banners, setBanners] = useState([]);
  const navigation = useNavigation();

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

  const [secContent, setSecContent] = useState([]);
  const [thrContent, setThrContent] = useState([]);
  const [lastContent, setLastContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('CAT-407');
  const filterCategories = [
    {
      name: "Bisnis",
      code: 'CAT-407'
    },
    {
      name: "Agrikultur",
      code: 'CAT-409'
    },
    {
      name: "Teknologi Informasi",
      code: 'CAT-410'
    },
    {
      name: "Pengembangan Diri",
      code: 'CAT-532'
    },
    {
      name: "Pemasaran",
      code: 'CAT-417'
    },
    {
      name: "Komunikasi",
      code: 'CAT-422'
    },
    {
      name: "UI / UX",
      code: 'CAT-514'
    },
    {
      name: "Industri Kreatif",
      code: 'CAT-412'
    },
    {
      name: "Data Science",
      code: 'CAT-426'
    },
    {
      name: "Administrasi",
      code: 'CAT-414'
    },
    {
      name: "Karier",
      code: 'CAT-427'
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
  const getSecondContent = async () => {
    try {
      const response = await action(`${baseUrl}/v3/highlights?isActive=true`);
      const data = response.data.data;
      setSecContent(data.content);
    } catch (error) {
      showError(error);
    }
  }
  const getHeaders = async () => {
    try {
      const response = await action(`${baseUrl}/v3/website/headers?numberOfCorePrograms=5&location=welcome`);
      const data = response.data.data;
      setThrContent(data);
    } catch (error) {
      showError(error);
    }
  }
  const getLastContent = async (category = 'CAT-407') => {
    try {
      setLoading(true);
      const response = await action(`${baseUrl}/v2/website/core-programs/randomized?size=4&status=PUBLISHED,APPROVED&categoryCodes=${category}`);
      const data = response.data.data;
      setLastContent(data.content);
      setLoading(false);
    } catch (error) {
      showError(error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAnnouncement();
      getBanner();
      getSecondContent();
      getHeaders();
      getLastContent();
    }, [])
  )

  const changeFilter = (code) => {
    setCurrentCategory(code);
    getLastContent(code);
  }
  const goToDetail = (detailData) => {
    navigation.navigate('Detail', {
      data: detailData
    });
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

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
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

        {secContent.length > 0 && (
          <View className='pt-5'>
            {secContent.map((data, index) => {
              return <HighlightSection key={index} data={data} isLast={secContent.length - 1 === index} />
            })}
          </View>
        )}

        {thrContent.length > 0 && (
          <View className='pt-5'>
            {thrContent.map((data, index) => {
              return (
                <HeadersSection
                  key={index}
                  data={data}
                  isLast={thrContent.length - 1 === index}
                  goToDetail={goToDetail}
                />
              )
            })}
          </View>
        )}

        {lastContent.length > 0 && (
          <View className='py-5'>
            <Text
              className='mx-5 text-xs text-black font-bold'>
              Jelajahi Program Kami
            </Text>
            <Text 
              style={styles.desc}
              className='mx-5 text-xs text-gray-500 font-light mt-1'>
              Rasakan pengalaman belajar praktis, buat kamu semakin optimis
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4'>
              <Gap width={20} />
              {filterCategories.map((category, index) => {
                return (
                  <CategoryFilterItem
                    key={index}
                    title={category.name}
                    active={category.code === currentCategory}
                    onPress={() => changeFilter(category.code)}
                  />
                )
              })}
              <View className='mr-2' />
            </ScrollView>

            {loading ? (
              <View className='w-full h-56 my-5 justify-center items-center'>
                <ActivityIndicator color={customColors.blue3} size={'large'} />
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Gap width={20} />
                {lastContent.map((prog, index) => {
                    return <ProgramCard key={index} data={prog} onPress={() => {
                      goToDetail(prog);
                    }} />
                })}
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.btn}
              className='mx-5 flex-row justify-center items-center border py-2 rounded-md'>
              <Text className='text-xs font-bold mr-2' style={styles.btntext}>Telusuri Bisnis</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  btntext: {
    color: customColors.blue3,
  },
  btn: {
    borderColor: customColors.blue3
  },
  desc: {
    fontSize: 10
  }
})