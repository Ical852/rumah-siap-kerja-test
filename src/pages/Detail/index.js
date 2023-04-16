import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { DetailHeader, Gap, NumberFormatter, SectionSpacer } from '../../components'
import { useFocusEffect } from '@react-navigation/native';
import { action } from '../../service';
import { baseUrl, customColors, showError } from '../../utils';
import RenderHTML from 'react-native-render-html';
import { IcArrowDown, IcCategory, IcLevel, IcLocation, IcStarColor, IcTime, IcType } from '../../assets';

const DetailPage = ({ navigation, route }) => {
    const params = route.params;
    const paramsData = params.data;
    const [id, setId] = useState('');
    const [detailData, setDetailData] = useState(undefined);
    const [summary, setSummary] = useState(undefined);
    const [trainers, setTrainers] = useState([]);
    const [topicLength, setTopicLength] = useState(0);
    const [materyLength, setMateryLength] = useState(0);
    const [sylabus, setSylabus] = useState([]);
    const [duration, setDuration] = useState(0);
    
    const fetchData = async () => {
        try {
            const response = await action(`${baseUrl}/v3/website/core-programs/find-by-code/${paramsData.code}`);
            const data = response.data.data;
            const dataId = data.id;
            setId(dataId);
            await fetchDetail(dataId);
            await fetchSummary(dataId);
            await fetchTrainer(dataId);
            await fetchSylabus(dataId);
        } catch (error) {
            showError(error)
        }
    }
    const fetchDetail = async (dataId) => {
        try {
            const response = await action(`${baseUrl}/v2/training/${dataId}`);
            const data = response.data.data;
            setDetailData(data);
        } catch (error) {
            showError(error);
        }
    }
    const fetchSummary = async (dataId) => {
        try {
            const response = await action(`${baseUrl}/v3/training-rating/summary-training-rating/${dataId}`);
            const data = response.data.data;
            setSummary(data)
        } catch (error) {
            showError(error)
        }
    }
    const fetchTrainer = async (dataId) => {
        try {
            const response = await action(`${baseUrl}/v2/training/${dataId}/trainers`);
            const data = response.data.data;
            setTrainers(data.trainers);
        } catch (error) {
            showError(error)
        }
    }
    const fetchSylabus = async (dataId) => {
        try {
            const response = await action(`${baseUrl}/v3/training-syllabus/${dataId}`);
            const data = response.data.data;
            let matLength = 0;
            let minutes = 0;
            const newData = data.map((newD) => {
                minutes += newD.duration;
                matLength += newD.subTopic.length;
                newD.open = false;
                return newD;
            })
            setTopicLength(data.length);
            setMateryLength(matLength);
            setDuration(minutes);

            setSylabus(newData);
        } catch (error) {
           showError(error); 
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const getDiscount = (price, originPrice) => {
        return Math.floor((price / originPrice) * 100);
    }
    const RenderPrice = () => {
        const priceData = paramsData.plans[0];
        if (priceData.price === 0) {
            return (
                <Text 
                    style={styles.coachtext}
                    className='mx-2 text-green-500 font-medium'>
                    Gratis
                </Text>
            )
        }

        if (priceData.originalPrice > priceData.price) {
            return (
                <View>
                    <View className='flex-row items-center mb-0.5'>
                        <View style={styles.contDiscount} className='ml-2 mr-1 justify-center items-center'>
                            <Text style={styles.discount} className='text-red-500 font-bold'>
                                {getDiscount(priceData.price, priceData.originalPrice)}%
                            </Text>
                        </View>
                        <Text 
                            style={styles.originPrice} 
                            className='font-semibold text-gray-500 mx-2 mb-2'>
                            <NumberFormatter number={priceData.originalPrice} />
                        </Text>
                    </View>
                    <Text 
                        style={styles.coachtext} 
                        className='font-semibold text-black mx-2'>
                        <NumberFormatter number={priceData.price} />
                    </Text>
                </View>
            )
        }

        return (
            <Text 
                style={styles.coachtext} 
                className='font-semibold text-black mx-2'>
                <NumberFormatter number={priceData.price} />
            </Text>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1'>
                <DetailHeader
                    onBack={() => navigation.goBack()}
                />

                {detailData ? (
                    <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                        <Image source={{ uri: detailData.coverImage }} className='mt-4 h-56 rounded-md mx-4' />
                        <Text className='mt-3 text-black font-bold mx-4'>{detailData.title}</Text>

                        <View className='mx-4'>
                            {detailData.description && (
                                <RenderHTML
                                    contentWidth={Dimensions.get('window').width - 16}
                                    baseStyle={{ fontSize: 12, color: customColors.gray1 }}
                                    source={{ html: detailData.description}}
                                />
                            )}
                        </View>

                        <View className='flex-row items-center mx-4'>
                            <View className='bg-green-500 py-1 px-2 rounded-md mr-2'>
                                <Text className='text-white text-xs capitalize'>{detailData.tags[0]}</Text>
                            </View>
                            <IcStarColor fill='#F1C866' />
                            <Text className='text-xs font-bold ml-1'>{summary?.average}</Text>
                            <Text className='text-xs text-black font-light'> | Rating {summary?.summary.length}</Text>
                        </View>

                        <View className='my-5 mx-4'>
                            <View className='flex-row items-center'>
                                <IcType />
                                <Text className='text-xs text-black font-normal ml-2'>Tipe</Text>
                                <View className='ml-10 border rounded-md border-gray-500 p-1'>
                                    <Text className='capitalize text-xs text-gray-500 font-normal'>{detailData?.productType}</Text>
                                </View>
                                <View className='ml-3 border rounded-md border-gray-500 p-1'>
                                    <Text className='capitalize text-xs text-gray-500 font-normal'>{detailData?.deliveryType}</Text>
                                </View>
                            </View>

                            <View className='flex-row items-center mt-3'>
                                <IcCategory />
                                <Text className='text-xs text-black font-normal ml-2'>Kategori</Text>
                                <View className='ml-4 border rounded-md border-gray-500 p-1'>
                                    <Text className='capitalize text-xs text-gray-500 font-normal'>{detailData?.category?.name}</Text>
                                </View>
                            </View>

                            <View className='flex-row items-center mt-3'>
                                <IcTime />
                                <Text className='text-xs text-black font-normal ml-2'>Durasi</Text>
                                <Text className='ml-7 capitalize text-xs text-gray-500 font-normal'>{Math.floor(duration / 60)} Jam {duration % 60} Menit</Text>
                            </View>

                            <View className='flex-row items-center mt-3'>
                                <IcLevel />
                                <Text className='text-xs text-black font-normal ml-2'>Level</Text>
                                <View className='ml-8 border rounded-md border-gray-500 p-1'>
                                    <Text className='capitalize text-xs text-gray-500 font-normal'>{detailData?.level}</Text>
                                </View>
                            </View>

                            <View className='flex-row items-center mt-3'>
                                <IcLocation />
                                <Text className='text-xs text-black font-normal ml-2'>Lokasi</Text>
                                <Text className='ml-7 capitalize text-xs text-gray-500 font-normal'>Online</Text>
                            </View>
                        </View>

                        <SectionSpacer />
                        
                        <View className='mx-4 my-5'>
                            <RenderPrice />
                        </View>

                        <SectionSpacer />

                        <View className='p-4'>
                            <Text className='text-black font-medium mb-1'>Apa yang kamu dapatkan:</Text>
                            {detailData?.trainingBenefits.map((trBn) => {
                                return (
                                    <View className='flex-row items-center'>
                                        <Image source={{ uri: trBn.imageUrl }} className='w-5 h-5' />
                                        <RenderHTML
                                            baseStyle={{ fontSize: 12, color: customColors.gray1, marginLeft: 10 }}
                                            contentWidth={Dimensions.get('window').width - 16}
                                            source={{ html: trBn.description }}
                                        />
                                    </View>
                                )
                            })}
                        </View>

                        <SectionSpacer />
                        
                        <View className='p-4'>
                            <Text className='text-black font-medium mb-3'>Pelatih</Text>
                            {trainers.map((trainer) => {
                                return (
                                    <View className='flex-row items-center'>
                                        <Image source={{ uri: trainer.profileImage }} className='w-10 h-10 rounded-full' />
                                        <Text className='text-xs font-bold text-black ml-3'>{trainer.fullName}</Text>
                                    </View>
                                )
                            })}
                        </View>

                        <SectionSpacer />

                        <View className='p-4'>
                            <Text className='text-black font-medium mb-3'>Silabus</Text>
                            <Text className='text-gray-500 text-xs'>{topicLength} Topic | {materyLength} Materi | {Math.floor(duration / 60)} Jam {duration % 60} Menit</Text>

                            {sylabus.map((syl) => {
                                return (
                                    <>
                                        <TouchableOpacity 
                                            key={syl.id} 
                                            className='p-4 border border-gray-500 rounded-md mt-3 flex-row justify-between items-center'
                                            onPress={() => {
                                                const index = sylabus.findIndex((data) => data.id === syl.id);
                                                const newData = [...sylabus];
                                                newData[index].open = !newData[index].open;
                                                setSylabus(newData);
                                            }}>
                                            <Text 
                                                numberOfLines={1}
                                                className='mr-3'
                                                style={{ fontSize: 10 }}>
                                                {syl.title}
                                            </Text>
                                            <IcArrowDown/>
                                        </TouchableOpacity>
                                        {syl.open && (
                                            syl.subTopic.map((sub) => {
                                                return (
                                                    <View 
                                                        key={sub.id} 
                                                        className='p-4 border border-gray-500 rounded-md mt-3 flex-row justify-between items-center'>
                                                        <Text 
                                                            numberOfLines={1}
                                                            className='mr-3'
                                                            style={{ fontSize: 10 }}>
                                                            {sub.title}
                                                        </Text>
                                                        <Text style={{ fontSize: 10 }}>{sub.duration} Menit</Text>
                                                    </View>
                                                )
                                            })
                                        )}
                                    </>
                                )
                            })}
                        </View>
                                
                        <Gap height={120} />
                    </ScrollView>
                ) : (
                    <ActivityIndicator />
                )}
                
                {detailData && (
                    <View className='absolute bottom-0 w-full bg-white p-4'>
                        <RenderPrice />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default DetailPage

const styles = StyleSheet.create({
    coachtext: {
        fontSize: 14,
    },
    originPrice: {
        fontSize: 14,
        textDecorationLine: 'line-through',
        marginBottom: 0,
        marginLeft: 0
    },
    discount: {
        fontSize: 14,
        marginRight: 2,
    },
    contDiscount: {
        padding: 2,
        backgroundColor: '#F6ECEF',
        borderRadius: 3
    }
})