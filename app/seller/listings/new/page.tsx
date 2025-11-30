'use client';

import { createProduct } from '@/actions/seller';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea'; // We might need to create this or use standard textarea
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function NewListingPage() {
    const { toast } = useToast();
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        try {
            await createProduct(formData);
            toast({
                title: "Success",
                description: "Product listed successfully",
            });
            router.push('/seller/dashboard');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create listing",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6 text-green-800">Add New Product</h1>
            <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-slate-200">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <Label htmlFor="iupac_name">Product Name (IUPAC)</Label>
                        <Input id="iupac_name" name="iupac_name" required placeholder="e.g. Methanol" />
                    </div>

                    <div>
                        <Label htmlFor="cas_number">CAS Number</Label>
                        <Input id="cas_number" name="cas_number" required placeholder="e.g. 67-56-1" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                            placeholder="Product details..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="purity_percentage">Purity (%)</Label>
                            <Input id="purity_percentage" name="purity_percentage" type="number" step="0.1" min="0" max="100" required placeholder="99.8" />
                        </div>
                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Select name="grade" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select grade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TECHNICAL">Technical</SelectItem>
                                    <SelectItem value="PHARMA">Pharma</SelectItem>
                                    <SelectItem value="FOOD">Food</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="moq">MOQ (Tons)</Label>
                            <Input id="moq" name="moq" type="number" step="0.1" required placeholder="10" />
                        </div>
                        <div>
                            <Label htmlFor="priceHint">Price Hint (USD/Ton)</Label>
                            <Input id="priceHint" name="priceHint" type="number" step="0.01" required placeholder="500" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">List Product</Button>
                </div>
            </form>
        </div>
    );
}
