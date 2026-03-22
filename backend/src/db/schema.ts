import { pgTable, text, uuid, timestamp, doublePrecision, integer, jsonb } from 'drizzle-orm/pg-core';

export const inspections = pgTable('inspections', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    standardName: text('standard_name').notNull(),
    standardId: text('standard_id').notNull(),
    note: text('note'),
    price: doublePrecision('price'),
    samplingPoints: text('sampling_points').array(), 
    samplingDate: timestamp('sampling_date'),
    totalSample: integer('total_sample').notNull(),
    compositionResult: jsonb('composition_result').notNull(),
    defectResult: jsonb('defect_result').notNull(),
    imageURL: text('image_url'), 
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});