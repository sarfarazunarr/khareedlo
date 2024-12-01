export interface ProductCardType {
    id: number, rating: { rate: number, count: number }, title: string, image: string, price: number, description: string, category: string, discountedprice?: number, stock: boolean
}
export interface CartProduct {
    id: number, title: string, quantity: number, image: string, price: number, totalAmount: number
}

export interface CartState{
    cart: CartProduct[];
    addToCart: (item: CartProduct) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    updateQuantity: (itemId: number, quantity: number) => void
}