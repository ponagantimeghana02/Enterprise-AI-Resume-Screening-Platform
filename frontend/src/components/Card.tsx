interface CardProps {
    title: string;
    value: string | number;
}

const Card = ({ title, value }: CardProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-gray-500">
                {title}
            </h2>

            <h1 className="text-3xl font-bold mt-2">
                {value}
            </h1>

        </div>
    );
};

export default Card;