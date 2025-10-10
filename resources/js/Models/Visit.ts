import Car from "@/Models/Car";
import Client from "@/Models/Client";
import Part from "@/Models/Part";
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
    total_cost?: number;
    parts?: Part[];
}

export default Visit;
