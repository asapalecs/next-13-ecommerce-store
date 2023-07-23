import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
    const products = await getProducts({isFeatured: true});
    const billboard = await getBillboard("020dece5-e97f-44b8-bb86-f6f697ffa55d");
    return ( 
        <Container>
        <div className="space-y-10 pb-10">
            <Billboard data={billboard}/>
        <div className="flex flex-col gap-y-8 px-4 smm:px-6 lg:px-8">
            <ProductList title="Featured products" items={products} />
        </div>  
        </div>  
        </Container>

     );
}
 
export default HomePage;