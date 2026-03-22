import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { historyService } from "../services/historyServices";
import { standardService } from "../services/standardServices"; 
import { formatDateTime, formatThaiDateTime } from "../utils/formatDateTime";

const ResultInspection = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 
    
    const [data, setData] = useState<any>(null);
    const [standards, setStandards] = useState<any[]>([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const result = await historyService.getById(id);
                setData(result);

                const stdData = await standardService.getAll();
                setStandards(stdData);

            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("The data could not be loaded or could not be found.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-red-500">{error}</p>
                <button onClick={() => navigate('/history')} className="px-6 py-2 bg-gray-200 rounded-md">
                    Go back to History page
                </button>
            </div>
        );
    }

    const totalDefectActual = data.defectResult?.reduce((sum: number, item: any) => sum + (item.actual || 0), 0) || 0;

    // ฟังก์ชันดึงและคำนวณค่า Length จาก Standard อิงตามข้อมูลจริงจาก Backend
    const getStandardLength = (riceName: string) => {
        if (!data || standards.length === 0) return "-";

        const selectedStandard = standards.find(s => s.id === data.standardId);
        if (!selectedStandard) return "-";

        const subStandard = selectedStandard.standardData.find((sub: any) => sub.name === riceName);
        if (!subStandard) return "-";

        const { minLength, maxLength, conditionMax } = subStandard;

        if (maxLength >= 99) {
            return `>= ${minLength}`; 
        } else {
            const maxDisplay = conditionMax === 'LT' ? (maxLength - 0.01).toFixed(2) : maxLength;
            return `${minLength} - ${Number(maxDisplay)}`; 
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbfb] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900">Inspection</h1>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-10">
                        
                        {/*Left: Image & Buttons */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="w-full max-w-sm">                                 
                                <div className="bg-gray-900 overflow-hidden border-2 border-gray-900 w-full flex items-center justify-center relative">
                                    {data.imageURL ? (
                                        <img 
                                            src={data.imageURL} 
                                            alt="Rice Grains Raw" 
                                            className="w-full h-auto block"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <span className="text-gray-500 py-10">No Image Available</span>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 mt-4 w-full">
                                    <button 
                                        onClick={() => navigate('/history')}
                                        className="px-6 py-2 border border-[#1f7b44] text-[#1f7b44] rounded-md hover:bg-green-50 transition-colors font-bold text-sm flex items-center justify-center"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/edit/${data.id}`)}
                                        className="px-8 py-2 bg-[#1f7b44] text-white rounded-md hover:bg-[#1a4d2e] transition-colors font-bold text-sm flex items-center justify-center shadow-sm"
                                    >
                                        Edit
                                    </button>
                                </div>    
                            </div>
                        </div>

                        {/* Right: Data */}
                        <div className="w-full md:w-2/3 flex flex-col gap-6 rounded-xl bg-[#ececec] p-4">
                            
                            {/* General Info Card */}
                            <div className="bg-[#fbfbfb] p-4 rounded-xl border border-gray-100 grid grid-cols-2 gap-x-6 gap-y-3">
                                <InfoItem label="Create Date - Time" value={formatDateTime(data.createdAt)} />
                                <InfoItem label="Inspection ID" value={data.id} />
                                <InfoItem label="Standard" value={data.standardName} />
                                <InfoItem label="Total Sample" value={data.totalSample ? `${data.totalSample} kernal` : "-"} />
                                <InfoItem label="Update Date - Time" value={formatDateTime(data.updatedAt)} />
                            </div>

                            {/* Options Card */}
                            <div className="bg-[#fbfbfb] p-4 rounded-xl border border-gray-100 grid grid-cols-2 gap-x-6 gap-y-3">
                                <InfoItem label="Note" value={data.note || "-"} />
                                <InfoItem label="Price" value={data.price ? data.price.toLocaleString('en-US') : "-"} />
                                <InfoItem label="Date/Time of Sampling" value={formatThaiDateTime(data.samplingDate)} />
                                <InfoItem label="Sampling Point" value={data.samplingPoints?.length > 0 ? data.samplingPoints.join(", ") : "-"} />
                            </div>

                            {/* Composition Table Card */}
                            <div className="bg-[#fbfbfb] p-4 rounded-xl border border-gray-100">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900">Composition</h2>
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-[#f1f1f1]">
                                            <th className="py-1 px-4 font-semibold text-md rounded-l-lg w-[50%]">Name</th>
                                            <th className="py-1 px-4 font-semibold text-md text-right pr-10 w-[25%]">Length</th>
                                            <th className="py-1 px-4 font-semibold text-md text-right pr-20 rounded-r-lg w-[25%]">Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody className="before:block before:h-2">
                                        {data.compositionResult?.map((item: any, index: number) => (
                                            <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                                <td className="py-2 px-4 text-sm">{item.name}</td>
                                                <td className="py-2 px-4 text-sm text-right pr-10 text-gray-500 font-semibold">
                                                    {getStandardLength(item.name)}
                                                </td>
                                                <td className="py-2 px-4 text-sm font-semibold text-[#1f7b44] text-right pr-20">
                                                    {(item.actual || 0).toFixed(2)} %
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Defect Rice Table Card */}
                            <div className="bg-[#fbfbfb] p-4 rounded-xl border border-gray-100">
                                <h2 className="text-xl font-semibold mb-4">Defect Rice</h2>
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-[#f1f1f1]">
                                            <th className="py-1 px-4 font-semibold text-md rounded-l-lg w-[75%]">Name</th>
                                            <th className="py-1 px-4 font-semibold text-md text-right pr-20 rounded-r-lg w-[25%]">Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody className="before:block before:h-2">
                                        {data.defectResult?.map((item: any, index: number) => (
                                            <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                                <td className="py-2 px-4 text-sm capitalize">{item.name}</td>
                                                <td className="py-2 px-4 text-sm font-semibold text-[#1f7b44] text-right pr-20">
                                                    {(item.actual || 0).toFixed(2)} %
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Total Row */}
                                        <tr className="border-t border-gray-200 font-semibold bg-white">
                                            <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                                            <td className="py-3 px-4 text-sm font-semibold text-[#1f7b44] text-right pr-20">
                                                {totalDefectActual.toFixed(2)} %
                                            </td>
                                        </tr>   
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

interface InfoItemProps {
    label: string;
    value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
    <div className="space-y-0.5">
        <p className="text-md text-[#707070] font-medium">{label}:</p>
        <p className="text-md font-medium wrap-break-word">{value}</p>
    </div>
);

export default ResultInspection;