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
        <div className="flex ml-auto items-center space-x-4">
          <Submit
            userCode={userCode}
            processing={processing}
            handleCompile={handleCompile}
          />
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
