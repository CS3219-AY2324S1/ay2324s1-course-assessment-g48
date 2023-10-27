import axios from "axios";
import { Role } from "@/utils/enums/Role";
import Router from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_QUESTION_SERVICE + "/api/history";
