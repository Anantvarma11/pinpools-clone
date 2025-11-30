import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CredibilityBadge } from "@/components/CredibilityBadge";
import { BidModal } from "@/components/BidModal";
import { FileText, ArrowLeft, Share2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;

    // Mock Data (In a real app, fetch based on productId)
    const product = {
        id: productId,
        title: "Acetone Technical Grade",
        casNumber: "67-64-1",
        description: "High purity acetone suitable for industrial applications as a solvent. Colorless, volatile, flammable liquid organic compound.",
        specs: [
            { label: "Purity", value: "99.5% min" },
            { label: "Water Content", value: "0.3% max" },
            { label: "Acidity", value: "0.002% max" },
            { label: "Density", value: "0.791 g/cm³" },
        ],
        seller: {
            name: "ChemCorp International",
            kycStatus: "VERIFIED",
            creditLine: 85,
            location: "Hamburg, Germany",
            joined: "2023",
        },
        moq: "1000 Liters",
        leadTime: "3-5 Days",
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <Link href="/marketplace" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Badge variant="outline">CAS: {product.casNumber}</Badge>
                                    <span>•</span>
                                    <span>Industrial Grade</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Specifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.specs.map((spec) => (
                                    <div key={spec.label} className="flex justify-between py-2 border-b last:border-0">
                                        <dt className="text-muted-foreground">{spec.label}</dt>
                                        <dd className="font-medium">{spec.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Download TDS
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Download MSDS
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar / Action Panel */}
                <div className="space-y-6">
                    <Card className="border-2 border-primary/10">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">MOQ</span>
                                    <span className="font-medium">{product.moq}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Lead Time</span>
                                    <span className="font-medium">{product.leadTime}</span>
                                </div>
                            </div>

                            <BidModal
                                productId={product.id}
                                trigger={<Button className="w-full" size="lg">Create RFX</Button>}
                            />
                            <Button variant="secondary" className="w-full" size="lg">
                                Open Bid
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Seller Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="font-medium">{product.seller.name}</div>
                                    <div className="text-sm text-muted-foreground">{product.seller.location}</div>
                                </div>
                            </div>

                            <CredibilityBadge
                                kycStatus={product.seller.kycStatus}
                                creditLine={product.seller.creditLine}
                            />

                            <Button variant="outline" className="w-full">
                                View Seller Profile
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
