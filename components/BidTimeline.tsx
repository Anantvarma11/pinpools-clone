import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

export interface TimelineItem {
    id: string;
    bidderName: string;
    amount: number;
    currency: string;
    submittedAt: string;
    status: string;
    terms?: string;
}

interface BidTimelineProps {
    items: TimelineItem[];
}

export function BidTimeline({ items }: BidTimelineProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACCEPTED": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
            case "REJECTED": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
            case "SUBMITTED": return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
            default: return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bid History</h3>
            <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="relative overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="space-y-1">
                                        <p className="font-medium">{item.bidderName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className={getStatusColor(item.status)}>
                                        {item.status}
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-2xl font-bold">
                                        ${item.amount.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{item.currency}</span>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Accept Offer
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {items.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No bids yet.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
