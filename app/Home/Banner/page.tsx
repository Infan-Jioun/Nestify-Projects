
"use client";

import Image from "next/image";

export default function BannerPage() {
    return (
        <div className="px-4 mx-auto drop-shadow-2xl lg:px-15">

          <Image width={1500} height={1500} className="  rounded-xl lg:rounded-3xl shadow " src="https://i.ibb.co/dv68RMc/White-Classy-and-Refined-Real-Estate-Banner-1.png" alt="bannerImage" />
        </div>
    )
}
