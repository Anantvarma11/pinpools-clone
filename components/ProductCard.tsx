import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CredibilityBadge } from "./CredibilityBadge";
import { Package, User as UserIcon } from "lucide-react";
import { BidModal } from "./BidModal";

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        casNumber: string;
        grade: string;
        purity: number;
    };
    seller: {
        name: string;
        kycStatus: string;
        creditLine: number;
    };
    MOQ: string;
    openBidsCount: number;
}

export function ProductCard({ product, seller, MOQ, openBidsCount }: ProductCardProps) {
    return (
        <Card className="w-full max-w-sm hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                        {product.grade}
                    </Badge>
                    <Badge variant={openBidsCount > 0 ? "default" : "secondary"}>
                        {openBidsCount} Active Bids
                    </Badge>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-2">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground">CAS: {product.casNumber}</p>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>Purity: {product.purity}%</span>
                    </div>
                    <div className="font-medium">MOQ: {MOQ}</div>
                </div>

                <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 mb-2">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{seller.name}</span>
                    </div>
                    <CredibilityBadge
                        kycStatus={seller.kycStatus}
                        creditLine={seller.creditLine}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <BidModal
                    productId={product.id}
                    trigger={<Button className="w-full">Request Quote</Button>}
                />
            </CardFooter>
        </Card>
    );
}
