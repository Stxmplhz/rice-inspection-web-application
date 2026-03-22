import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { standardService } from "../services/standardServices";
import { historyService } from "../services/historyServices";
import { Calendar } from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

const CreateInspection = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [standards, setStandards] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        standardId: "",
        note: "",
        price: "",
        samplingPoints: [] as string[],
        samplingDate: "",
        rawData: null as any,
        imageURL: "" 
    });
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchStandards = async () => {
            const data = await standardService.getAll();
            setStandards(data);
        };
        fetchStandards();
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setErrors(prev => ({ ...prev, rawData: false })); 
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target?.result as string);
                    
                    if (json.grains && Array.isArray(json.grains)) {
                        setFormData(prev => ({ 
                            ...prev, 
                            rawData: json.grains,
                            imageURL: json.imageURL || "" 
                        }));
                    } else {
                        alert("Invalid format: 'grains' array not found");
                    }

                } catch (err) {
                    alert("Invalid JSON file");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleCheckbox = (point: string) => {
        setFormData(prev => ({
            ...prev,
            samplingPoints: prev.samplingPoints.includes(point)
                ? prev.samplingPoints.filter(p => p !== point)
                : [...prev.samplingPoints, point]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors: Record<string, boolean> = {
            name: !formData.name.trim(),
            standardId: !formData.standardId,
            rawData: !formData.rawData
        };

        const priceNum = parseFloat(formData.price);
        if (formData.price && (priceNum < 0 || priceNum > 100000)) {
            alert("Price must be between 0 and 100,000");
            return;
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some(err => err)) return; 

        try {
            const finalData = {
                ...formData,
                price: formData.price ? parseFloat(formData.price).toFixed(2) : "0.00"
            };
            const result = await historyService.create(finalData);
            navigate(`/result/${result[0].id}`);
        } catch (err) {
            alert("Create failed. Please try again.");
        }
    };

    const getInputClass = (isError: boolean) => 
        `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 bg-transparent placeholder:text-[#909090] placeholder:font-semibold text-gray-600 transition-colors ${
            isError ? "border-red-600 focus:ring-red-600" : "border-[#909090] focus:ring-green-500"
        }`;

    return (
        <div className="min-h-screen bg-[#fbfbfb] py-3 px-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-[40px] font-bold text-center mb-5 text-gray-900">Create Inspection</h1>

                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl space-y-2 border border-gray-100">
                    
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Name*</label>
                        <input
                            type="text"
                            placeholder="Please Holder"
                            className={getInputClass(errors.name)}
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({...errors, name: false});
                            }}
                        />
                        {errors.name && <p className="text-red-600 text-xs">Required</p>}
                    </div>

                    {/* Standard Dropdown */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Standard*</label>
                        <div className="relative">
                            <select
                                className={`${getInputClass(errors.standardId)} appearance-none`}
                                style={{ 
                                    color: formData.standardId ? '#4b5563' : '#909090', // 
                                    fontWeight: formData.standardId ? '400' : '600'
                                }}
                                value={formData.standardId}
                                onChange={(e) => {
                                    setFormData({ ...formData, standardId: e.target.value });
                                    if (errors.standardId) setErrors({...errors, standardId: false});
                                }}
                            >
                                <option value="" disabled hidden>
                                    Please Select Standard
                                </option>
                                
                                {standards.map((std) => (
                                    <option key={std.id} value={std.id} style={{ color: '#4b5563', fontWeight: 'normal' }}>
                                        {std.name}
                                    </option>
                                ))}
                            </select>
                            
                            <TriangleDownIcon 
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#909090] pointer-events-none" 
                                width={20} 
                                height={20}
                            />
                        </div>
                        {errors.standardId && <p className="text-red-600 text-xs">Required</p>}
                    </div>

                    {/* Upload File */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Upload File*</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={getInputClass(errors.rawData) + " cursor-pointer flex justify-between items-center group"}
                        >
                            <span className={fileName ? "text-gray-900" : "text-[#909090] font-semibold"}>
                                {fileName || "raw1.json"}
                            </span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".json"
                                onChange={handleFileUpload}
                            />
                        </div>
                        {errors.rawData && <p className="text-red-600 text-xs">Required</p>}
                    </div>

                    {/* Note */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Note</label>
                        <input 
                            type="text"
                            placeholder="Please Holder"
                            className="w-full px-3 py-2 border border-[#909090] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent placeholder:text-[#909090] placeholder:font-semibold text-gray-600"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Price</label>
                        <input
                            type="number"
                            placeholder="10,000"
                            className="w-full px-3 py-2 border border-[#909090] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent placeholder:text-[#909090] placeholder:font-semibold text-gray-600"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    {/* Sampling Point */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-900">Sampling Point</label>
                        <div className="flex justify-center gap-10 mt-5">
                            {['Front End', 'Back End', 'Other'].map((point) => (
                                <label key={point} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-2 border-[#909090] text-green-600 focus:ring-green-500 accent-[#1f7b44] cursor-pointer"
                                        checked={formData.samplingPoints.includes(point)}
                                        onChange={() => handleCheckbox(point)}
                                    />
                                    <span className="text-xs font-medium text-gray-700">{point}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date/Time of Sampling */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-900">Date/Time of Sampling</label>
                        <div className="relative flex items-center group">
                            <input 
                                type="datetime-local" 
                                step="1"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                value={formData.samplingDate}
                                onChange={(e) => setFormData({ ...formData, samplingDate: e.target.value })}
                            />

                            <div className={`w-full px-3 py-2 border rounded-md bg-transparent flex justify-between items-center transition-colors ${
                                formData.samplingDate ? "border-[#909090]" : "border-[#909090]"
                            }`}>
                                <span className={`text-sm font-semibold ${formData.samplingDate ? "text-gray-600" : "text-[#909090]"}`}>
                                    {formData.samplingDate ? (
                                        new Date(formData.samplingDate).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false
                                        }).replace(',', '')
                                    ) : (
                                        "12/08/2023 18:00:00"
                                    )}
                                </span>
                                <Calendar size={18} className="text-[#909090]" />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/history')}
                            className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-bold text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#1f7b44] text-white rounded-lg hover:bg-[#1a4d2e] transition-colors font-bold shadow-md text-xs"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInspection;