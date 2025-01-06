import DiaryRemoveTable from "@/components/ui/DiaryRemoveTable";
import Heading from "@/components/ui/Heading";

const remove = () => {
  return (
    <div className="flex flex-col items-center gap-10  justify-center h-full overflow-hidden">
      <Heading tag="h1">휴지통</Heading>
      <div>
        <DiaryRemoveTable />
      </div>
    </div>
  );
};

export default remove;
