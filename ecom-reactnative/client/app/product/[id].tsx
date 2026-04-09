/* eslint-disable react/jsx-no-undef */
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListcontext";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProduct = async () => {
    const found = dummyProducts.find((p) => p._id === id);
    setProduct(found || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image carousel */}
        <View className="relative h-[450px] bg-gray-100 mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
          >
            {product.images?.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                resizeMode="cover"
                style={{ width: width, height: 450 }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View className="px-4">
          <Text className="text-xl font-bold">{product.name}</Text>
          <Text className="text-lg text-gray-600 mt-2">₹{product.price}</Text>
        </View>
      </ScrollView>
      {/* Header Action */}
      <View className=" absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-white/80 rounded-full items-center justify-center "
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleWishlist(product)}
          className="w-10 h-10 bg-white/80 rounded-full items-center justify-center "
        >
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? COLORS.accent : COLORS.primary} />
        </TouchableOpacity>
      </View>
    
      {/* Product info */}
<View className="px-5">
{/* Title & Rating */}
<View className='flex-row justify-between items-start
mb-2'>
<Text className='text-2x1 font-bold text-primary
flex-1 mr-4'>{product.name}</Text>
</View>
</View>
    </View>
  );
}
