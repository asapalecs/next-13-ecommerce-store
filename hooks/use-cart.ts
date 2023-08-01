import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 
import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

// Definirea tipului de date pentru starea coșului
interface CartStore {
  items: Product[];         // O listă de obiecte de tip Product, reprezentând produsele din coș
  addItem: (data: Product) => void;    // Funcție pentru adăugarea unui produs în coș
  removeItem: (id: string) => void;    // Funcție pentru eliminarea unui produs din coș
  removeAll: () => void;              // Funcție pentru eliminarea tuturor produselor din coș
}

// Crearea hook-ului useCart cu ajutorul functiei create din zustand
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [], // Initial, coșul este gol și nu conține niciun produs

    // Funcția pentru adăugarea unui produs în coș
    addItem: (data: Product) => {
      const currentItems = get().items;   // Obținem lista actuală de produse din coș
      const existingItem = currentItems.find((item) => item.id === data.id); // Verificăm dacă produsul există deja în coș

      if (existingItem) {
        // Dacă produsul există deja în coș, afișăm o notificare pentru utilizator
        return toast('Item already in cart.');
      }

      // Dacă produsul nu există în coș, îl adăugăm la lista de produse și actualizăm starea
      set({ items: [...get().items, data] });

      // Afișăm o notificare de succes pentru utilizator
      toast.success('Item added to cart.');
    },

    // Funcția pentru eliminarea unui produs din coș, pe baza ID-ului produsului
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });

      // Afișăm o notificare de succes pentru utilizator
      toast.success('Item removed from cart.');
    },

    // Funcția pentru eliminarea tuturor produselor din coș
    removeAll: () => set({ items: [] }),
  }), {
    // Configurarea pentru stocarea persistentă a datelor coșului în localStorage
    name: 'cart-storage',   // Numele cheii pentru stocarea datelor în localStorage
    storage: createJSONStorage(() => localStorage) // Folosim createJSONStorage pentru a stoca datele în format JSON
  })
);

export default useCart;