import { Stack } from 'expo-router';
import "../global.css";
import { CartProvider } from '@/context/CartContext';
import { WishListProvider } from '@/context/WishListcontext';

export default function RootLayout() {
  return (
    <CartProvider>
      <WishListProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </WishListProvider>
    </CartProvider>
  );
}