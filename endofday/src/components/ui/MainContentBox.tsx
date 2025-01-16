import Heading from "@/components/ui/Heading";
interface MainContentBoxProps {
    title: string;
    data: string;
    description: string;
}

const MainContentBox: React.FC<MainContentBoxProps> = ({title, data, description}) => {
    return (
        <div className="bg-sand rounded-lg shadow-md px-[3rem] py-[2rem] flex flex-col gap-8 w-96">
            <Heading
                tag="h3"
                className="text-center "
            >
                {title}
            </Heading>
            <Heading
                tag="h1"
                className="text-center text-[2rem]"
            >
                {data}
            </Heading>
            <Heading
                tag="h3"
                className="text-center"
            >
                {description}
            </Heading>
        </div>
    );
};

export default MainContentBox;
