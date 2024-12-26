type HeadingProps = {
    tag?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
};

const Heading: React.FC<HeadingProps> = ({tag: Tag = "h1", children, className}) => {
    const baseClasses = {
        h1: "text-3xl font-bold",
        h2: "text-2xl font-semibold",
        h3: "text-xl font-medium",
        p: "text-base",
    };

    return <Tag className={`${baseClasses[Tag] || ""} ${className}`}>{children}</Tag>;
};

export default Heading;
