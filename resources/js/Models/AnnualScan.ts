import Car from "@/Models/Car";
import Client from "@/Models/Client";
interface AnnualScan {
    id: number;
    client_id: number;
    car_id: number;
    scan_date: string;
    expiry_date: string;
    is_passed: boolean;
    cost: number;
    test_report?: string;
    notes?: string;
    client?: Client;
    car?: Car;
}

export default AnnualScan;
