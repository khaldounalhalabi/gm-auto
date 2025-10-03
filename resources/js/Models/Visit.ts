import Car from "@/Models/Car";
import Client from "@/Models/Client";
interface Visit {
    id: number;
    date: string;
    car_id: number;
    client_id: number;
    fault_description?: string;
    repair_description?: string;
    car?: Car;
    client?: Client;
    cost: number;
}

export default Visit;
