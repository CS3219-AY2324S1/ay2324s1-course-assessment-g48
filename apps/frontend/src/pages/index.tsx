import QuestionTable from "../components/QuestionTable";

export default function HomePage() {
  return (
    <>
      <div className="container-xxl">
        <div className="grid place-content-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl text-center text-white mb-4">
              It&apos;s grinding time!
            </h1>
            <QuestionTable />
          </div>
        </div>
      </div>
    </>
  );
}
