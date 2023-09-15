import QuestionTable from "@/components/questions/QuestionTable";

export default function HomePage() {
  return (
    <>
      <div className="container-xxl dark:bg-gray-900">
        <div className="grid place-content-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-white mb-4 pt-3">
              It&apos;s grinding time!
            </h1>
            <QuestionTable />
          </div>
        </div>
      </div>
    </>
  );
}
