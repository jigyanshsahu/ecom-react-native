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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
      <SafeAreaView className="flex-1 justify-center items-center">
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

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({ ...product, selectedSize });
    alert("Added to cart");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Image Carousel */}
        <View className="relative h-[450px] bg-gray-100 mb-4">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / width
              );
              setActiveImageIndex(index);
            }}
            scrollEventThrottle={16}
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

          {/* Dots Indicator */}
          <View className="absolute bottom-3 w-full flex-row justify-center">
            {product.images?.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === activeImageIndex
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Header Buttons */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleWishlist(product)}
            className="w-10 h-10 bg-white/80 rounded-full items-center justify-center"
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View className="px-5 mt-2">
          <Text className="text-2xl font-bold text-primary">
            {product.name}
          </Text>

          <Text className="text-lg text-gray-600 mt-1">
            ₹{product.price}
          </Text>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text className="text-base font-bold text-primary mt-4 mb-3">
                Select Size
              </Text>

              <View className="flex-row gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full items-center justify-center border ${
                      selectedSize === size
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text
                      className={
                        selectedSize === size
                          ? "text-white"
                          : "text-black"
                      }
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Description */}
          <View className="mt-6">
            <Text className="text-base font-bold text-primary mb-2">
              Description
            </Text>

            <Text className="text-gray-600 leading-6">
              {product.description ||
                "No description available for this product."}
            </Text>
          </View>
        </View>
      </ScrollView>

                {/* Bottom Add to Cart */}
              
                <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
                    <ScrollView>
                  <TouchableOpacity
                    onPress={handleAddToCart}
                    className="bg-primary py-4 rounded-xl items-center"
                  >
                    <Text className="text-white font-bold text-lg">
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                   </ScrollView>
                </View>
              </View>
             
  );
}