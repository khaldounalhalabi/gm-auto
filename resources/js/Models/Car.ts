import CarBrand from "@/Models/CarBrand";
import Client from "@/Models/Client";
import Visit from "@/Models/Visit";
interface Car {
    id: number;
    model_name: string;
    car_brand_id: number;
    client_id: number;
    registration_plate: string;
    car_brand?: CarBrand;
    client?: Client;
    visits?: Visit[];
}

export default Car;
