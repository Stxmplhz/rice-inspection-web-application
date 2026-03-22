import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { inspections } from '../db/schema.js';
import { calculateRiceInspection } from '../services/calculator.js';
import { and, desc, ilike, SQL, eq, inArray, sql } from 'drizzle-orm';
import axios from 'axios';

export const createHistory = async (req: Request, res: Response) => {
    try {
        const { name, standardId, note, price, samplingPoints, samplingDate, rawData, imageURL } = req.body;
        
        const stdResponse = await axios.get('https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/standards.json');
        const selectedStandard = stdResponse.data.find((s: any) => s.id === standardId);

        if (!selectedStandard) {
            return res.status(400).json({ message: "Standard not found" });
        }

        const { composition, defects, totalSample } = calculateRiceInspection(rawData, selectedStandard);

        const savedHistory = await db.insert(inspections).values({
            name,
            standardName: selectedStandard.name,
            standardId: selectedStandard.id,
            note,
            price: price ? parseFloat(parseFloat(price).toFixed(2)) : null, 
            samplingPoints: samplingPoints || [],
            samplingDate: samplingDate ? new Date(samplingDate) : null,
            totalSample,
            compositionResult: composition, 
            defectResult: defects,
            imageURL: imageURL || null, 
        }).returning(); 

        res.status(201).json(savedHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllHistory = async (req: Request, res: Response) => {
    try {
        const idQuery = req.query.id as string | undefined;

        const filters: SQL[] = [];
        
        if (idQuery && idQuery.trim() !== "") {
            // 2. แก้ไขตรงนี้ให้แปลง UUID เป็น Text ก่อนค้นหา
            filters.push(sql`CAST(${inspections.id} AS TEXT) ILIKE ${`%${idQuery}%`}`);
        }

        const histories = await db
            .select()
            .from(inspections)
            .where(filters.length > 0 ? and(...filters) : undefined)
            .orderBy(desc(inspections.createdAt));

        res.json(histories);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Cannot fetch history list" });
    }
};

export const getHistoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await db.select().from(inspections).where(eq(inspections.id, id));
        
        if (result.length === 0) {
            return res.status(404).json({ message: "History not found" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ message: "Cannot fetch history detail" });
    }
};

export const updateHistory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { note, price, samplingPoints, samplingDate } = req.body;

        const updated = await db.update(inspections)
            .set({
                note,
                price: price ? parseFloat(parseFloat(price).toFixed(2)) : null,
                samplingPoints: samplingPoints || [],
                samplingDate: samplingDate ? new Date(samplingDate) : null,
                updatedAt: new Date(),
            })
            .where(eq(inspections.id, id))
            .returning();

        res.status(200).json(updated[0]);
    } catch (error) {
        res.status(500).json({ message: "Cannot update history" });
    }
};

export const deleteHistory = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body; 
        
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "IDs must be an array" });
        }

        await db.delete(inspections).where(inArray(inspections.id, ids));

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Cannot delete selected history" });
    }
};