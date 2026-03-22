import axios from 'axios';
import type { Request, Response } from 'express';

export const getStandards = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get('https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/standards.json');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot fetch standards" });
  }
};