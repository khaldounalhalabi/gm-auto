import Car from "@/Models/Car";
interface Client {
    id: number;
    full_name: string;
    phone: string;
    cars?: Car[];
}

export default Client;
