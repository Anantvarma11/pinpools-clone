import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface CredibilityBadgeProps {
    kycStatus: "VERIFIED" | "PENDING" | "REJECTED" | string;
    creditLine: number; // Percentage 0-100
}

export function CredibilityBadge({ kycStatus, creditLine }: CredibilityBadgeProps) {
    const getStatusIcon = () => {
        switch (kycStatus) {
            case "VERIFIED":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "REJECTED":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
        }
    };

    return (
        <div className="flex flex-col gap-2 p-2 border rounded-md bg-background/50 max-w-[200px]">
            <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="text-sm font-medium">
                    {kycStatus === "VERIFIED" ? "KYC Verified" : "KYC Pending"}
                </span>
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Credit Line</span>
                    <span>{creditLine}%</span>
                </div>
                <Progress value={creditLine} className="h-2" />
            </div>
        </div>
    );
}
