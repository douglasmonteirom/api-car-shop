import { NextFunction, Request, Response } from 'express';

const errorExa = 'Id must have 24 hexadecimal characters';

const validId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (typeof id !== 'string' || id.length < 24) {
      return res.status(400).json({ error: errorExa });
    }
    return next();
  } catch (e) {
    console.log(e);
  }
};

export default validId;