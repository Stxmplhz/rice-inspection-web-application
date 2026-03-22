import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { historyService } from "../services/historyServices";
import { Calendar } from "lucide-react";

const EditInspection = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [formData, setFormData] = useState({
        note: "",
        price: "",
        samplingPoints: [] as string[],
        samplingDate: "",
    });

    useEffect(() => {
        const loadExistingData = async () => {
            if (!id) return;
            try {
                const data = await historyService.getById(id);
                
                let formattedDate = "";
                if (data.samplingDate) {
                    const dateObj = new Date(data.samplingDate);
                    dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
                    formattedDate = dateObj.toISOString().slice(0, 16);
                }

                setFormData({
                    note: data.note || "",
                    price: data.price ? data.price.toString() : "",
                    samplingPoints: data.samplingPoints || [],
                    samplingDate: formattedDate,
                });
            } catch (err) {
                alert("Failed to load inspection data.");
                navigate('/history');
            }
        };
        loadExistingData();
    }, [id, navigate]);


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

        const priceNum = parseFloat(formData.price);
        if (formData.price && (priceNum < 0 || priceNum > 100000)) {
            alert("Price must be between 0 and 100,000");
            return;
        }

        try {
            const finalData = {
                note: formData.note,
                price: formData.price ? parseFloat(formData.price).toFixed(2) : null,
                samplingPoints: formData.samplingPoints,
                samplingDate: formData.samplingDate || null
            };

            await historyService.update(id!, finalData);
            navigate(`/result/${id}`); 
        } catch (err) {
            alert("Update failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbfb] py-3 px-4">
            <h1 className="text-xl font-bold text-center mt-5 mb-5 text-gray-900">Edit Inspection ID: {id}</h1>

            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl space-y-2 border border-gray-100">
                    
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
                    <div className="flex justify-end gap-4 mt-5">
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

export default EditInspection;