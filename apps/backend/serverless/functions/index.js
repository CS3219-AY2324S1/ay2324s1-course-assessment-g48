/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import {info, error as _error} from "firebase-functions/logger";
import {get} from "axios";

export const leetcodeQuestionsFetch = onRequest({region: "asia-southeast1"},
    async (request, response) => {
      info("Hello logs!", {structuredData: true});

      try {
        const leetCodeQuestions = await getLeetCodeQuestions();
        response.json(leetCodeQuestions);
      } catch (error) {
        _error("Error fetching LeetCode questions:", error);
        response.status(500).send("Internal Server Error");
      }
    });

/**
 * @return {Array<Object>} a list of LeetCode questions
 * with the following fields:
 *   - question_id: the ID of the question
 *   - question_title: the title of the question
 *   - difficulty: the difficulty of the question
 *     (1: Easy, 2: Medium, 3: Hard)
 */
async function getLeetCodeQuestions() {
  const leetCodeApiUrl = "https://leetcode.com/api/problems/all/";

  // Make a GET request to the LeetCode API
  const response = await get(leetCodeApiUrl);

  // Extract the list of questions from the API response
  const questions = response.data.stat_status_pairs.map((question) => {
    return {
      question_id: question.stat.question_id,
      question_title: question.stat.question__title,
      question__title_slug: question.stat.question__title_slug,
      difficulty: question.difficulty.level,
    };
  });

  return questions;
}
