import { Router, Request, Response } from "express";
import { supabase } from "../config/supabase";
import { postCache } from "../middleware/post-cache";

const router = Router();

router.get("/", postCache, async (req: Request, res: Response) => {
  try {
    
    const { data, error } = await supabase
      .from("students")
      .select("*");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;