"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface BidModalProps {
    productId: string
    trigger?: React.ReactNode
}

export function BidModal({ productId, trigger }: BidModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const [formData, setFormData] = useState({
        quantity: "",
        unit: "MT",
        targetPrice: "",
        mode: "PUBLIC",
        deadline: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/bids", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    title: `RFX for Product ${productId}`, // Simplified for MVP
                    quantity: Number(formData.quantity),
                    unit: formData.unit,
                    mode: formData.mode,
                    deadline: new Date(formData.deadline).toISOString(),
                    // targetPrice: Number(formData.targetPrice) // Not in schema yet, but good to have in form
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Failed to create RFX")
            }

            toast({
                title: "RFX Created on Blockchain",
                description: "Your request has been secured and listed.",
                className: "bg-green-50 border-green-200 text-green-800",
            })
            setOpen(false)
            router.push('/buyer/dashboard')
            router.refresh()
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>Create RFX</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create RFX</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">
                            Unit
                        </Label>
                        <Select
                            value={formData.unit}
                            onValueChange={(value) => setFormData({ ...formData, unit: value })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MT">Metric Ton (MT)</SelectItem>
                                <SelectItem value="KG">Kilogram (KG)</SelectItem>
                                <SelectItem value="L">Liter (L)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetPrice" className="text-right">
                            Target Price
                        </Label>
                        <Input
                            id="targetPrice"
                            type="number"
                            placeholder="Optional"
                            value={formData.targetPrice}
                            onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="mode" className="text-right">
                            Mode
                        </Label>
                        <Select
                            value={formData.mode}
                            onValueChange={(value) => setFormData({ ...formData, mode: value })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="PRIVATE">Private (Invite Only)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline
                        </Label>
                        <Input
                            id="deadline"
                            type="datetime-local"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create RFX"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
