import CarBrand from "@/Models/CarBrand";
import Client from "@/Models/Client";
interface Car {
    id: number;
    model_name: string;
    car_brand_id: number;
    client_id: number;
    registration_plate: string;
    car_brand?: CarBrand;
    client?: Client;
}

export default Car;
