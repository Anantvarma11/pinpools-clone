"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface OfferModalProps {
    rfxId: string
    trigger?: React.ReactNode
}

export function OfferModal({ rfxId, trigger }: OfferModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const [formData, setFormData] = useState({
        amount: "",
        terms: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/bids/${rfxId}/offer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    amount: Number(formData.amount),
                    termsJson: { text: formData.terms }, // Simple wrapper for now
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Failed to submit offer")
            }

            toast({
                title: "Offer Submitted",
                description: "Offer Submitted and Hashed to Blockchain!",
                className: "bg-green-50 border-green-200 text-green-800",
            })
            setOpen(false)
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
                {trigger || <Button>Make Offer</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Offer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Price (USD)
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="terms" className="text-right">
                            Terms
                        </Label>
                        <Textarea
                            id="terms"
                            value={formData.terms}
                            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                            className="col-span-3"
                            placeholder="Delivery terms, payment terms, etc."
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
                        {loading ? "Submitting..." : "Submit Offer"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
