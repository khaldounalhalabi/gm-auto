import PageCard from "@/Components/ui/PageCard";
import AnnualScan from "@/Models/AnnualScan";
import { Link } from "@inertiajs/react";
import SmallTextField from "@/Components/show/SmallTextField";
import LongTextField from "@/Components/show/LongTextField";
import { Button } from "@/Components/ui/shadcn/button";

const Show = ({ annualScan }: { annualScan: AnnualScan }) => {
    return (
        <PageCard
            title="AnnualScan Details"
            actions={
                <div className="flex items-center justify-between">
                    <Link
                        href={route(
                            "v1.web.protected.annual.scans.edit",
                            annualScan.id,
                        )}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SmallTextField
                    label="Scan Date"
                    value={annualScan.scan_date}
                />
                <SmallTextField
                    label="Expiry Date"
                    value={annualScan.expiry_date}
                />
                <SmallTextField
                    label="Is Passed ?"
                    value={annualScan.is_passed ? "Yes" : "No"}
                />
                <SmallTextField label="Cost" value={annualScan.cost} />
                <SmallTextField
                    label="Client"
                    value={annualScan?.client?.full_name}
                />
                <SmallTextField
                    label="Car"
                    value={annualScan?.car?.model_name}
                />
            </div>

            <LongTextField
                label="Test Report"
                value={annualScan?.test_report}
            />
            <LongTextField label="Notes" value={annualScan?.notes} />
        </PageCard>
    );
};

export default Show;
