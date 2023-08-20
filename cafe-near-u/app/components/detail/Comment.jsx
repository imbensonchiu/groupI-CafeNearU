import { Rating, Card } from "@material-tailwind/react";

function RatedIcon({ width, height }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            viewBox="0 -960 960 960"
            width={width}
            fill="#DFD3C3"
        >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z" />
        </svg>
    );
}

function UnratedIcon({ width, height }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={height}
            viewBox="0 -960 960 960"
            width={width}
            fill="#DFD3C3"
        >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
        </svg>
    );
}

export default function Comment({ comment }) {
    const { rating, created_at, content, user } = comment;
    return (
        <Card className="rounded-md h-auto">
            <div className="flex flex-row items-start p-4 gap-2">
                <div className="rounded-full w-12 h-12 bg-gray-200"></div>
                <div className="text-base flex flex-col items-start">
                    <div className="text-lg text-gray-800">{user.name}</div>
                    <div className="text-gray-600 text-sm">{created_at}</div>
                </div>
                <Rating
                    value={Math.round(rating)}
                    ratedIcon={<RatedIcon width={20} height={20} />}
                    unratedIcon={<UnratedIcon width={20} height={20} />}
                    className="ml-2 self-center"
                    readonly
                />
            </div>
            <div className="px-6 py-2 pb-6">{content}</div>
        </Card>
    );
}
