import AnnualScan from "@/Models/AnnualScan";
import Car from "@/Models/Car";
import Visit from "@/Models/Visit";
interface Client {
    id: number;
    full_name: string;
    phone: string;
    cars?: Car[];
    visits?: Visit[];
    annual_scans?: AnnualScan[];
}

export default Client;
