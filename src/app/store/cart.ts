import { create } from "zustand"
// import { CartItem, Product } from "@/types/cart"
import { ProductType } from "@/lib/types"

export type CartItem = ProductType & {
  quantity: number
}



type CartState = {
  items: CartItem[]

  addToCart: (product: ProductType) => void
  removeFromCart: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clearCart: () => void

  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: product =>
    set(state => {
      const existing = state.items.find(i => i.id === product.id)

      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }),

  removeFromCart: id =>
    set(state => ({
      items: state.items.filter(item => item.id !== id),
    })),

  increaseQty: id =>
    set(state => ({
      items: state.items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQty: id =>
    set(state => ({
      items: state.items
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
}))
