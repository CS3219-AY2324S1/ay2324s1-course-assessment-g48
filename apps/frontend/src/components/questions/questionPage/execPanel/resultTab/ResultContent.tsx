import OutputMetrics from "./OutputMetrics";
import OutputWindow from "./OutputWindow";

type ResultContentProps = {
  outputDetails: any;
};

const ResultCaseContent: React.FC<ResultContentProps> = ({ outputDetails }) => {
  return (
    <>
      <div className="text-sm font-medium leading-5 dark:text-white">
        <div className="font-semibold mb-12">
          <OutputWindow outputDetails={outputDetails} />
          <OutputMetrics outputDetails={outputDetails} />
        </div>
      </div>
    </>
  );
};

export default ResultCaseContent;
