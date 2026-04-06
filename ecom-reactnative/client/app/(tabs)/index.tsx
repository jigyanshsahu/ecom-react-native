import { View, Text, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { BANNERS } from '@/assets/assets'

const { width } = Dimensions.get('window')

export default function Home() {
  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <Header  showMenu showCart showLogo />

      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
      >
        {/* banner slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className='h-48'
        >
          {BANNERS.map((banner, index) => (
            <View
              key={index}
              style={{ width }}
              className='h-48 bg-gray-200 overflow-hidden'
            >
              <Image
                source={{ uri: banner.image }}
                className='w-full h-full'
                resizeMode='cover'
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}