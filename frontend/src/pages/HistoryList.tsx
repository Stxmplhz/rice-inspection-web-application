import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { historyService } from "../services/historyServices";
import { Search, Plus, Trash2, Calendar } from "lucide-react";

const HistoryList = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<any[]>([]); 
    const [filteredHistory, setFilteredHistory] = useState<any[]>([]); 
    
    const [searchId, setSearchId] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const loadData = async () => {
        try {
            let data = [];

            if (searchId.trim() !== '') {
                data = await historyService.getAll(searchId); 
            } else {
                data = await historyService.getAll();
            }

            if (fromDate || toDate) {
                data = data.filter((item: any) => {
                    const itemDate = new Date(item.createdAt);
                    itemDate.setHours(0, 0, 0, 0); 

                    let isAfterFrom = true;
                    let isBeforeTo = true;

                    if (fromDate) {
                        const fDate = new Date(fromDate);
                        fDate.setHours(0, 0, 0, 0);
                        isAfterFrom = itemDate >= fDate;
                    }

                    if (toDate) {
                        const tDate = new Date(toDate);
                        tDate.setHours(0, 0, 0, 0);
                        isBeforeTo = itemDate <= tDate;
                    }

                    return isAfterFrom && isBeforeTo;
                });
            }

            setHistory(data);
            setFilteredHistory(data);
            setCurrentPage(1); 

        } catch (err) {
            console.error("Fetch Error:", err);
            setFilteredHistory([]);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async () => {
        if (selectedIds.length == 0) return;
        
        if (confirm(`Are you sure to Delete ${selectedIds.length} items?`)) {
            try {
                await historyService.delete(selectedIds);
                setSelectedIds([]);
                loadData(); 
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const totalItems = filteredHistory.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredHistory.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-[#fbfbfb] p-8"> 
            <div className="max-w-7xl mx-auto">
                {/* Create Inspection Button */}
                <div className="flex justify-end mb-6">
                    <button 
                        onClick={() => navigate('/create')}
                        className="bg-[#1f7b44] hover:bg-[#1a4d2e] text-white px-5 py-2 rounded-md flex items-center gap-2 transition-all shadow-sm font-medium text-sm"
                    >
                        <Plus size={18} />
                        <span>Create Inspection</span>
                    </button>
                </div>

                {/* Filter Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">ID</label>
                            <input 
                                type="text" 
                                placeholder="Search with ID"
                                className="w-full px-3 py-2 border border-[#909090] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#909090] placeholder:font-semibold"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                        </div>

                        {/* Form Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">From Date</label>
                            <div className="relative flex items-center">
                                <input 
                                    type={fromDate ? "date" : "text"} 
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => {
                                        if (!e.target.value) {
                                            e.target.type = "text";
                                        }
                                    }}
                                    placeholder="Please select From Date"
                                    className="w-full px-3 py-2 border border-[#909090] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent placeholder:text-[#909090] placeholder:font-semibold text-gray-600"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                                <Calendar size={18} className="absolute right-3 text-[#909090] pointer-events-none" />
                            </div>
                        </div>

                        {/* To Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">To Date</label>
                            <div className="relative flex items-center">
                                <input 
                                    type="text"
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => !e.target.value && (e.target.type = "text")}
                                    placeholder="Please select To Date"
                                    className="w-full px-3 py-2 border border-[#909090] rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-transparent placeholder:text-[#909090] placeholder:font-semibold text-gray-600"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                                <Calendar size={18} className="absolute right-3 text-[#909090] pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Filter & Delete Section */}
                    <div className="flex justify-between items-center mt-6">
                        <button 
                            onClick={() => { setSearchId(''); setFromDate(''); setToDate(''); loadData(); }}
                            className="text-[#d91212] hover:text-red-400 text-sm font-medium underline underline-offset-4 decoration-red-300 hover:decoration-red-200 transition-all duration-200 px-2"
                        >
                            Clear Filter
                        </button>
                        <div className="flex gap-3">
                            <button 
                                onClick={loadData}
                                className="bg-[#1f7b44] hover:bg-[#1a4d2e] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all font-medium text-sm"
                            >
                                <Search size={18} />
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6"> 
                    {selectedIds.length > 0 && (
                        <> 
                            <button 
                                onClick={handleDelete}
                                className="text-[#1f7b44] border border-[#1f7b44] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-100 transition-all text-sm font-semibold"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                            <p className="text-sm font-medium">
                                Selected items: {selectedIds.length} item
                            </p>
                        </> 
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-[#1f7b44] text-white">
                                <th className="pl-6 py-4 px-2 font-semibold text-sm">Create Date - Time</th>
                                <th className="py-4 px-2 font-semibold text-sm">Inspection ID</th>
                                <th className="py-4 px-2 font-semibold text-sm">Name</th>
                                <th className="py-4 px-2 font-semibold text-sm">Standard</th>
                                <th className="py-4 px-2 font-semibold text-sm w-1/4">Note</th> 
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.map((item: any) => (
                                <tr 
                                    key={item.id} 
                                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                                    onClick={() => navigate(`/result/${item.id}`)}
                                >
                                    <td className="py-4 px-6 text-sm font-medium text-gray-800 flex items-center gap-6">
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 accent-[#1f7b44] cursor-pointer border-gray-300 rounded"
                                                checked={selectedIds.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </div>
                                        <span>
                                            {new Date(item.createdAt).toLocaleString('th-TH', {
                                                year: 'numeric', month: '2-digit', day: '2-digit',
                                                hour: '2-digit', minute: '2-digit', second: '2-digit'
                                            }).replace(',', '')}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium">{item.id}</td>
                                    <td className="py-4 px-6 text-sm font-medium">{item.name}</td>
                                    <td className="py-4 px-6 text-sm font-medium">{item.standardName}</td>
                                    <td className="py-4 px-6 text-sm pr-8">
                                        {item.note ? (
                                            <span className="inline-block border-b pb-1 truncate max-w-37.5 xl:max-w-62.5">
                                                {item.note}
                                            </span>
                                        ) : (
                                            <span className="inline-block border-b w-25 h-5"></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {history.length === 0 && (
                        <div className="p-16 text-center text-gray-400 italic">
                            No history records found.
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
                {totalItems > 0 && (
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
                        <span>
                            {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
                        </span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-bold text-lg"
                            >
                                {'<'}
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-500 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors font-bold text-lg"
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HistoryList;