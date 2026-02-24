import z from 'zod';
import {Gender, HealthCheckRating} from './types';

export const PatientSchema = z.object({
    name: z.string(),
    ssn: z.string().optional(),
    dateOfBirth: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(), // Validates YYYY-MM-DD
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckSchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareSchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
    }).optional(),
});

const HospitalSchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string(),
    }),
});

export const EntrySchema = z.discriminatedUnion("type", [
    HealthCheckSchema,
    OccupationalHealthcareSchema,
    HospitalSchema,
]);