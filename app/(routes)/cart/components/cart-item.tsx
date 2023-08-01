// Importarea hook-ului personalizat use-cart și a altor dependințe necesare
"use client";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

// Declarația interfeței pentru proprietățile primite de componentă
interface CartItemProps {
  data: Product;
}

// Definirea componente CartItem
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  // Utilizarea hook-ului use-cart pentru a avea acces la funcții legate de coșul de cumpărături
  const cart = useCart();

  // Funcție apelată când se dorește eliminarea produsului din coș
  const onRemove = () => {
    cart.removeItem(data.id); // Apelarea funcției din hook-ul use-cart pentru a elimina produsul cu id-ul specificat
  };

  // Returnarea elementului CartItem în interfața de utilizator
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url} // URL-ul primei imagini a produsului
          alt="" // Text alternativ pentru imagine (necesar din motive de accesibilitate)
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          {/* Butonul de eliminare a produsului din coș */}
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>{" "}
            {/* Numele produsului */}
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>{" "}
            {/* Numele culorii produsului */}
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>{" "}
            {/* Numele mărimii produsului */}
          </div>
          {/* Afisarea pretului produsului */}
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
