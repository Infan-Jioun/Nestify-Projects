import {

    SidebarProvider,
} from "@/components/ui/sidebar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FilterXIcon } from "lucide-react"
import { IoFilterOutline } from "react-icons/io5";
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
export function FilterSidebar() {
    return (
        <div className="flex justify-end items-end text-right">

            <Sheet>
                <SheetTrigger className="flex justify-center items-center gap-3 ">      <div className="">
                    <motion.button
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
                    >
                        <IoFilterOutline /> Filter
                    </motion.button>
                </div></SheetTrigger>
                <SheetContent>
                    <SheetHeader className="">
                        <SheetTitle>Filter</SheetTitle>
                        <SheetContent className="">
                            <SheetHeader>Filter Your Fovarite</SheetHeader>
                            {/* Search compnenets */}
                            <SheetDescription className="px-5">
                                <div >
                                    <p className="text-xs font-bold text-black">Find your Home</p>
                                    <Input className="mt-3 pl-9 pr-3 py-2 w-full border-black  hover:border-black rounded-4xl text-black" type="search" />
                                    <div className="relative left-2.5 -top-6 bode" >
                                        <p className="text-black border-black"> <FaSearch /></p>
                                    </div>
                                </div>
                                {/* Listing Status  */}
                                <div className="mt-5">
                                    <div className="mb-3">
                                        <p className="  text-xs font-bold text-black">Listing Status</p>
                                    </div>
                                    <div className="flex gap-3 items-center  ">
                                        <RadioGroup defaultValue="All">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="All" id="All" />
                                                <Label htmlFor="All">All</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Buy" id="Buy" />
                                                <Label htmlFor="Buy">Buy</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Rent" id="Rent" />
                                                <Label htmlFor="Rent">Rent</Label>
                                            </div>
                                        </RadioGroup>

                                    </div>
                                </div>
                                {/* Property Type */}
                                <div className="mt-5">
                                    <div className="mb-3">
                                        <p className="text-xs font-bold text-black">Property Type</p>
                                        <div className="mt-2">
                                         <div className="flex gap-3 items-center  ">
                                            <Checkbox className="mt-1 " id="All"/>
                                            <Label htmlFor="All">All</Label>
                                         </div>
                                         <div className="flex gap-3 items-center  ">
                                         <Checkbox className="mt-1 " id="Houses"/>
                                            <Label htmlFor="Houses">Houses</Label>
                                         </div>
                                         <div className="flex gap-3 items-center  ">
                                         <Checkbox className="mt-1 " id="Apartsments"/>
                                            <Label htmlFor="Apartsments">Apartments</Label>
                                         </div>
                                         <div className="flex gap-3 items-center  ">
                                         <Checkbox className="mt-1 " id="Office"/>
                                            <Label htmlFor="Office">Office</Label>
                                         </div>
                                         <div className="flex gap-3 items-center  ">
                                         <Checkbox className="mt-1 " id="Vila"/>
                                            <Label htmlFor="Vila">Vila</Label>
                                         </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Price Range */}
                                <div className="mt-5">
                                    <p className="text-xs font-bold text-black">Price Range</p>
                                </div>
                                <div className="mt-3">
                                <Slider defaultValue={[33]} max={100} step={1} />
                                </div>
                            </SheetDescription>
                        </SheetContent>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </div>
    )
}