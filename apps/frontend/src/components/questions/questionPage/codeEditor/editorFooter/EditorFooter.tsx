import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import Run from "./Run";
import Submit from "./Submit";
import { Question } from "@/database/question/entities/question.entity";

type EditorFooterProps = {
  userCode: string;
  processing: boolean;
  question: Question;
  handleCompile: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({
  userCode,
  processing,
  handleCompile,
}) => {
  return (
    <div className="flex bg-slate-50 dark:bg-neutral-800 absolute bottom-0 z-0 w-full">
      <div className="flex mx-5 my-[10px] justify-between w-full">
        <div className="flex flex-1 flex-nowrap items-center space-x-4 mr-2">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex text-sm dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 rounded-lg pl-3 pr-2">
            Console
            <div className="flex ml-1 transform transition items-center">
              <ChevronDoubleUpIcon height={20} width={20} />
            </div>
          </button>
        </div>

        <div className="flex ml-auto items-center space-x-4">
          <Run
            userCode={userCode}
            processing={processing}
            handleCompile={handleCompile}
          />
          <Submit userCode={userCode} processing={processing} />
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
