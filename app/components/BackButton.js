import { useRouter } from "next/navigation";

function BackButton({ path = "/", className = "" }) {
    const router = useRouter();
    return (
        <button
            className={`absolute top-6 left-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ${className}`}
            onClick={() => router.push(path)}
        >
            Back to Home
        </button>
    );
}

export default BackButton;
