import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { FaSearch } from "react-icons/fa"

const frameworks: Option[] = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "angular",
        label: "Angular",
    },
    {
        value: "vue",
        label: "Vue.js",
    },
    {
        value: "react",
        label: "React",
    },
    {
        value: "ember",
        label: "Ember.js",
    },
    {
        value: "gatsby",
        label: "Gatsby",
    },
    {
        value: "eleventy",
        label: "Eleventy",
    },
    {
        value: "solid",
        label: "SolidJS",
    },
    {
        value: "preact",
        label: "Preact",
    },
    {
        value: "qwik",
        label: "Qwik",
    },
    {
        value: "alpine",
        label: "Alpine.js",
    },
    {
        value: "lit",
        label: "Lit",
    },
]

export default function MultiSeclectService() {
    return (
        <div className="*:not-first:mt-2 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <Label className="mb-2 block text-gray-700 text-xs">Find your Service</Label>
         <div className="relative">
         <MultipleSelector className="px-7  w-full rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400"
                // commandProps={{
                //     label: "Select frameworks",
                // }}
                defaultOptions={frameworks}
                placeholder="Select frameworks"
                emptyIndicator={<p className="text-center text-sm">No results found</p>}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
         </div>
        </div>
    )
}
