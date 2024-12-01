import { CartState } from '@/types/ProductCard'
import {create} from 'zustand'

const useCartStore = create<CartState>()((set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item]})),
    removeFromCart: (itemId) => set((state) => ({cart: state.cart.filter((item) => item.id !== itemId)})),
    clearCart: () => set({cart:[]}),
    updateQuantity: (itemId, quantity) => set((state) => ({cart: state.cart.map((item) => item.id === itemId ? {...item, quantity, totalAmount: item.price * quantity} : item)}))
}));

export default useCartStore;
