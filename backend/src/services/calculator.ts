const checkCondition = (val: number, target: number, condition: string): boolean => {
    switch (condition) {
        case "GT": return val > target;
        case "LT": return val < target;
        case "GE": return val >= target;
        case "LE": return val <= target;
        default: return false;
    }
};

export const calculateRiceInspection = (rawData: any[], selectedStandard: any) => {
    
    const totalWeight = rawData.reduce((sum, grain) => sum + grain.weight, 0);
  
    if (totalWeight === 0) {
        return { 
            composition: [], 
            defects: [], 
            totalSample: 0 
        };
    }
     
    // ------------ Calculate Composition ------------
    const composition = selectedStandard.standardData.map((sub: any) => {
        const matchedGrains = rawData.filter((grain) => {
        const isLengthMatch = checkCondition(grain.length, sub.minLength, sub.conditionMin) && checkCondition(grain.length, sub.maxLength, sub.conditionMax);
        const isShapeMatch = sub.shape.includes(grain.shape);     
        return isLengthMatch && isShapeMatch;
        });
        const groupWeight = matchedGrains.reduce((sum, g) => sum + g.weight, 0);
        const actualPercentage = (groupWeight / totalWeight) * 100;
        return {
        name: sub.name,
        actual: parseFloat(actualPercentage.toFixed(2)), 
        };
    });

    // ------------ Calculate Defect ------------
    const defectMap = [
        { key: "yellow", name: "ข้าวเหลือง" },
        { key: "chalky", name: "ข้าวท้องไข่" },
        { key: "paddy", name: "ข้าวเปลือก" },
        { key: "red", name: "ข้าวแดง" },
        { key: "damage", name: "ข้าวเสีย" },
        { key: "glutinous", name: "ข้าวเหนียว" },
    ];

    const defects = defectMap.map((d) => {
        const matchedGrains = rawData.filter((grain) => grain.type === d.key);
        const weight = matchedGrains.reduce((sum, g) => sum + g.weight, 0);
        return {
            name: d.name,
            actual: parseFloat(((weight / totalWeight) * 100).toFixed(2)),
        };
    });

    // ------------ Calculate Foreign Matters ------------
    // Remark: “total” calculated by summing all foreign matters (all types except white)
    const foreignGrains = rawData.filter((grain) => grain.type !== "white");
    const foreignWeight = foreignGrains.reduce((sum, g) => sum + g.weight, 0);
    
    defects.push({
        name: "ข้าวปลอมปนทั้งหมด",
        actual: parseFloat(((foreignWeight / totalWeight) * 100).toFixed(2)),
    });

    return {
        composition,
        defects,
        totalSample: rawData.length,
    };
};