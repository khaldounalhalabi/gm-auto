import Car from "@/Models/Car";
interface CarBrand {
    id: number;
    name: string;
    image_url?: string;
    cars?: Car[];
}

export default CarBrand;
