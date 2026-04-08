import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { BANNERS, dummyProducts } from "@/assets/assets";
import { useRouter } from "expo-router";
import { CATEGORIES } from "@/constants";
import CategoryItem from "@/components/CategoryItem";
import { Product } from "@/constants/types";
import ProductCart from "@/components/ProductCard";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [{ id: "all", name: "All", icon: "grid" }, ...CATEGORIES];

  const fetchProducts = async () => {
    // Replace with API later
    setProducts(dummyProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header showMenu showCart showLogo />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Slider */}
        <View className="mb-6">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className="h-48"
            scrollEventThrottle={16}
            onScroll={(event) => {
              const scrollPosition = event.nativeEvent.contentOffset.x;
              const newIndex = Math.floor(scrollPosition / width);
              setActiveBannerIndex(newIndex);
            }}
          >
            {BANNERS.map((banner, index) => (
              <View
                key={index}
                style={{ width }}
                className="h-48 bg-gray-200 overflow-hidden"
              >
                <Image
                  source={{ uri: banner.image }}
                  style={{ width: width, height: 200 }}
                  resizeMode="cover"
                />

                {/* Overlay */}
                <View className="absolute inset-0 bg-black/40" />

                {/* Text Content */}
                <View className="absolute bottom-4 left-4 z-10">
                  <Text className="text-white text-2xl font-bold">
                    {banner.title}
                  </Text>
                  <Text className="text-white text-sm font-medium">
                    {banner.subtitle}
                  </Text>

                  <TouchableOpacity className="mt-2 bg-white px-4 py-2 rounded-full self-start">
                    <Text className="text-primary font-bold text-xs">
                      Get Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View className="flex-row justify-center mt-3 gap-2">
            {BANNERS.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  index === activeBannerIndex
                    ? "w-4 bg-primary"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">
              Categories
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat: any) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={false}
                onPress={() => {
                  router.push({
                    pathname: "/shop",
                    params: {
                      category: cat.id === "all" ? "" : cat.id,
                    },
                  });
                }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">
              Popular
            </Text>

            <TouchableOpacity onPress={() => router.push("/shop")}>
              <Text className="text-secondary text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View className=" flex-row flex-wrap justify-between">
              {products.slice(0, 4).map((product) => (
                <ProductCart key={product._id} product={product} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}