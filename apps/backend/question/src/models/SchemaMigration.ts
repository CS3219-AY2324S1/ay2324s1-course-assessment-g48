import QuestionModel from "./Question";

async function addToExistingDoc() {
  try {
    const updatedDocuments = await QuestionModel.updateMany(
      {},
      {
        $set: {
          "testcases.$[].number": 1,
          "testcases.$[].input": "This is a sample input",
          "testcases.$[].output": "This is a sample output",
        },
      }
    );

    console.log(`Updated ${updatedDocuments.modifiedCount} documents.`);
  } catch (error) {
    console.error("Error updating documents:", error);
  }
}

addToExistingDoc();
