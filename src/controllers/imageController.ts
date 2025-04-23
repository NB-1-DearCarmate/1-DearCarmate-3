import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "이미지 파일이 없습니다." });
    return;
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
};
