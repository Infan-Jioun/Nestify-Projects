import DetailsDistrictProperty from '@/app/components/DetailsDistrictProperty/DetailsDistrictProperty'

interface DetailsDistrictPageProps {
    params: Promise<{ districtName: string }>
}

export default async function DetailsDistrictPage({ params }: DetailsDistrictPageProps) {
    const { districtName } = await params;

    return (
        <div>
            <DetailsDistrictProperty district={districtName} />
        </div>
    )
}
