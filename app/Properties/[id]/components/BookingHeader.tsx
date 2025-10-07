import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const BookingHeader = ({
    currentUser,
    isAutoFilled,
}: {
    currentUser: any;
    isAutoFilled: boolean;
}) => (
    <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
            <DialogHeader className="text-left">
                <DialogTitle className="flex items-center gap-3 text-white text-xl">
                    <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
                        <Home className="h-5 w-5" />
                    </div>
                    <div>
                        <div>Schedule Visit</div>
                        <div className="text-sm font-normal text-green-100">
                            Book your property viewing
                        </div>
                    </div>
                </DialogTitle>
            </DialogHeader>

            {isAutoFilled && currentUser && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 text-green-200 text-xs bg-white/10 p-2 rounded-lg"
                >
                    <span>Form auto-filled with your profile</span>
                </motion.div>
            )}
        </div>
    </div>
);

export default BookingHeader;
