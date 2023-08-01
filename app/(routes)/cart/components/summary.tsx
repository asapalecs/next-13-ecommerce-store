"use client";

// Importarea modulelor necesare
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

// Definirea componentei Summary
const Summary = () => {
  // Obțineți parametrii URL-ului utilizând hook-ul useSearchParams
  const searchParams = useSearchParams();

  // Obțineți lista de produse din coșul de cumpărături utilizând hook-ul custom useCart
  const items = useCart((state) => state.items);

  // Obțineți funcția removeAll din hook-ul custom useCart
  const removeAll = useCart((state) => state.removeAll);

  // Utilizarea hook-ului useEffect pentru a efectua acțiuni în momentul în care componenta este montată sau când se actualizează searchParams sau removeAll
  useEffect(() => {
    // Dacă în parametrii URL-ului există parametrul "success", înseamnă că plata a fost finalizată cu succes
    if (searchParams.get("success")) {
      // Afișăm un mesaj de succes utilizând biblioteca react-hot-toast
      toast.success("Payment completed.");

      // Eliminăm toate produsele din coș folosind funcția removeAll din hook-ul useCart
      removeAll();
    }

    // Dacă în parametrii URL-ului există parametrul "canceled", înseamnă că ceva nu a mers bine cu plata
    if (searchParams.get("canceled")) {
      // Afișăm un mesaj de eroare utilizând biblioteca react-hot-toast
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  // Calculăm prețul total al tuturor produselor din coș
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // Funcția onCheckout este apelată atunci când utilizatorul face clic pe butonul de "Checkout"
  const onCheckout = async () => {
    // Efectuăm o cerere POST către server pentru a iniția procesul de plată
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    // Redirecționăm utilizatorul către URL-ul primit ca răspuns, care duce către procesul de plată
    window.location = response.data.url;
  };

  // Returnăm componenta Summary
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {/* Afișăm prețul total utilizând componenta Currency */}
          <Currency value={totalPrice} />
        </div>
      </div>
      {/* Butonul de Checkout care va iniția procesul de plată */}
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

// Exportăm componenta Summary pentru a fi utilizată în alte locuri din aplicație
export default Summary;
