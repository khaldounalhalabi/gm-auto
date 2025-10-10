import PartSupplierType from "@/Enums/PartSupplierType";
import Visit from "@/Models/Visit";

interface Part {
    id: number;
    name: string;
    type: PartSupplierType;
    invoice_number?: string;
    source?: string;
    notes?: string;
    quantity: number;
    visit_id: number;
    visit?: Visit;
    item_price: number;
}

export default Part;
