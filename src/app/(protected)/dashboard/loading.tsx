import { Loader } from "@/components/global/loaders"

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Loader state>...loading</Loader>
        </div>
    )
}

export default Loading
